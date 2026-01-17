// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Fixed Glassy Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Help is always <span className="text-white">nearby</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            NearByAid instantly connects you to nearby hospitals, mechanics, food shelters, petrol stations, and emergency services — right where you are.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-full overflow-hidden shadow-2xl shadow-blue-900/30">
              <input
                type="text"
                placeholder="Search for help (hospital, food, mechanic...)"
                className="w-full px-8 py-6 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-all">
                Search
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Or <button className="text-blue-400 hover:underline font-medium">use my current location</button>
            </p>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/map"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-10 py-5 rounded-xl shadow-2xl shadow-blue-900/40 transition-all transform hover:scale-105"
            >
              Find Help Near Me →
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-gray-600 hover:border-gray-400 text-gray-200 font-semibold px-10 py-5 rounded-xl transition-all hover:bg-white/5"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            NearByAid in Action
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15K+', label: 'People Helped' },
              { number: '2.4K', label: 'Active Help Points' },
              { number: '87%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Always Available' },
            ].map((stat, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 transition-all hover:scale-105 hover:bg-white/10 shadow-lg shadow-black/30"
              >
                <div className="text-5xl font-extrabold text-blue-400 mb-3">{stat.number}</div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '📍', title: 'Auto Detect', desc: 'Your location is found instantly' },
              { icon: '🗺️', title: 'Nearby Help', desc: 'See services around you on map' },
              { icon: '🔍', title: 'Filter Easily', desc: 'Choose food, medical, fuel, police' },
              { icon: '📞', title: 'One-Tap Contact', desc: 'Call or message directly' },
            ].map((item, i) => (
              <div
                key={i}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-center transition-all hover:bg-white/10 hover:scale-105"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Help or Be Helped?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands already using NearByAid to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-6 rounded-xl shadow-2xl shadow-blue-900/50 transition-all transform hover:scale-105 text-lg"
            >
              Create Free Account
            </Link>
            <Link
              to="/map"
              className="bg-transparent border-2 border-blue-600 hover:bg-blue-600/20 text-blue-400 hover:text-white font-bold px-12 py-6 rounded-xl transition-all text-lg"
            >
              Explore Map Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - now seamless continuation */}
      <footer className="py-12 text-center text-gray-500 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <p>© {new Date().getFullYear()} NearByAid · Built with ❤️ in Telangana</p>
        <p className="mt-2 text-sm">
          Helping communities, one location at a time.
        </p>
      </footer>
    </div>
  );
}