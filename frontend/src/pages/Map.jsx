// src/pages/Map.jsx
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import api from '../services/api';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map() {
  const [center, setCenter] = useState(null);
  const [aids, setAids] = useState([]);
  const [type, setType] = useState('all');
  const [emergency, setEmergency] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  const zoom = emergency ? 16 : 14;

  // Get user location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
      () => setCenter([25.3176, 82.9739]), // fallback to Varanasi
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch aids when center changes or emergency/type toggles
  useEffect(() => {
    if (!center) return;

    const fetchAids = async () => {
      setLoading(true);
      try {
        const res = await api.get('/aid/nearby', {
          params: {
            lat: center[0],
            lng: center[1],
            maxDistance: emergency ? 15000 : 10000,
          },
        });
        setAids(res.data.aids || []);
      } catch (err) {
        console.error('Failed to load aids:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAids();
  }, [center, emergency, type]);

  // Force map resize on mount (fixes blank map bug)
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => mapRef.current.invalidateSize(), 200);
    }
  }, []);

  // Filter aids
  const filteredAids = aids.filter((aid) => {
    if (emergency) return ['hospital', 'police'].includes(aid.type);
    if (type !== 'all') return aid.type === type;
    return true;
  });

  return (
    <div className="h-screen w-full flex flex-col bg-gray-950 text-white">
      {/* Emergency Banner */}
      {emergency && (
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-center py-3 font-semibold shadow-lg">
          🚨 EMERGENCY MODE • Showing nearest hospitals & police only
        </div>
      )}

      {/* Filter & SOS Controls */}
      <div className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 p-4 flex flex-wrap gap-3 items-center justify-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'hospital', 'mechanic', 'petrol', 'police'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setEmergency(false);
                setType(t);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                type === t && !emergency
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* SOS Button */}
        <button
          onClick={() => {
            setEmergency(true);
            setType('all');
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-red-900/50 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span className="text-lg">🚨</span> SOS
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading nearby help...</p>
            </div>
          </div>
        )}

        <MapContainer
          center={center || [25.3176, 82.9739]}
          zoom={zoom}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* User Location Marker */}
          {center && (
            <Marker position={center}>
              <Popup className="text-black">You are here</Popup>
            </Marker>
          )}

          {/* Help Point Markers */}
          {filteredAids.map((aid) => {
            const [lng, lat] = aid.location.coordinates;
            return (
              <Marker key={aid._id} position={[lat, lng]}>
                <Popup className="text-black min-w-[220px]">
                  <div className="font-semibold text-lg">{aid.title}</div>
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-bold">{aid.type.toUpperCase()}</span>
                  </div>
                  {aid.description && <p className="text-sm">{aid.description}</p>}
                  {aid.contact && (
                    <div className="mt-3 space-y-2 text-sm">
                      <a
                        href={`tel:${aid.contact}`}
                        className="block text-blue-600 hover:underline"
                      >
                        📞 Call {aid.contact}
                      </a>
                      <a
                        href={`https://wa.me/91${aid.contact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-green-600 hover:underline"
                      >
                        💬 WhatsApp
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-purple-600 hover:underline"
                      >
                        🧭 Navigate
                      </a>
                    </div>
                  )}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}