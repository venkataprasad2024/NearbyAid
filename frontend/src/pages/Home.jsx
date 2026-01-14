import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Help When You Need It, Near You
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          NearByAid instantly connects you to nearby hospitals, mechanics,
          petrol stations and emergency services using real-time location.
        </p>

        <button
          onClick={() => navigate('/map')}
          className="bg-white text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold"
        >
          🚨 Find Help Near Me
        </button>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How NearByAid Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">📍 Detect Location</h3>
            <p>Your current location is detected automatically.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">🗺 Show Nearby Help</h3>
            <p>Nearby emergency and service points appear on the map.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">🎯 Filter by Need</h3>
            <p>Choose hospitals, mechanics, petrol or police.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">📞 Instant Contact</h3>
            <p>Call or WhatsApp the service with one click.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Services Available
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div className="bg-white p-6 rounded shadow">
            🏥
            <h3 className="font-semibold mt-2">Hospitals</h3>
          </div>

          <div className="bg-white p-6 rounded shadow">
            🛠
            <h3 className="font-semibold mt-2">Mechanics</h3>
          </div>

          <div className="bg-white p-6 rounded shadow">
            ⛽
            <h3 className="font-semibold mt-2">Petrol Stations</h3>
          </div>

          <div className="bg-white p-6 rounded shadow">
            🚓
            <h3 className="font-semibold mt-2">Police</h3>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-600 text-white text-center py-4">
        © 2026 NearByAid · Help is just a click away
      </footer>
    </div>
  );
}
