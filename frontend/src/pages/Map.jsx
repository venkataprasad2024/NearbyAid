import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import api from '../services/api';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icons
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
  const zoom = emergency ? 16 : 14;

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setCenter([25.3176, 82.9739]); // fallback
      }
    );
  }, []);

  // Fetch nearby aids
  useEffect(() => {
    if (!center) return;

    const fetchAids = async () => {
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
        console.error(err);
      }
    };

    fetchAids();
  }, [center, emergency]);

  if (!center) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Detecting your location...
      </div>
    );
  }

  // Emergency filter logic
  let filteredAids = aids;
  if (emergency) {
    filteredAids = aids.filter(
      (a) => a.type === 'hospital' || a.type === 'police'
    );
  } else if (type !== 'all') {
    filteredAids = aids.filter((a) => a.type === type);
  }

  return (
    <div className="h-screen w-full flex flex-col">

      {/* 🔥 EMERGENCY BAR */}
      {emergency && (
        <div className="bg-red-600 text-white text-center py-2 font-semibold">
          🚨 EMERGENCY MODE ACTIVE – Showing nearest hospitals & police
        </div>
      )}

      {/* FILTER BAR */}
      <div className="bg-white shadow p-3 flex gap-2 justify-center flex-wrap">
        {['all', 'hospital', 'mechanic', 'petrol', 'police'].map((t) => (
          <button
            key={t}
            onClick={() => {
              setEmergency(false);
              setType(t);
            }}
            className={`px-4 py-2 rounded ${
              type === t && !emergency
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}

        {/* 🚨 SOS BUTTON */}
        <button
          onClick={() => setEmergency(true)}
          className="px-6 py-2 bg-red-600 text-white rounded font-bold"
        >
          🚨 SOS
        </button>
      </div>

      {/* MAP */}
      <div className="flex-1">
        <MapContainer center={center} zoom={zoom} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* USER LOCATION MARKER */}
          <Marker position={center}>
            <Popup>You are here</Popup>
          </Marker>

          {/* AID MARKERS */}
          {filteredAids.map((aid) => {
            const [lng, lat] = aid.location.coordinates;
            return (
              <Marker key={aid._id} position={[lat, lng]}>
                <Popup>
                  <strong>{aid.title}</strong>
                  <br />
                  {aid.type.toUpperCase()}
                  <br />
                  {aid.description}
                  <br />

                  {aid.contact && (
                    <div className="mt-2 space-y-1">
                      <a href={`tel:${aid.contact}`} className="block text-blue-600">
                        📞 Call
                      </a>
                      <a
                        href={`https://wa.me/91${aid.contact}`}
                        target="_blank"
                        className="block text-green-600"
                      >
                        💬 WhatsApp
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                        target="_blank"
                        className="block text-purple-600"
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
