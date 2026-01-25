// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ← Link added
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/auth/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161b22] rounded-lg shadow-xl border border-[#30363d] p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">Create your account</h1>
          <p className="text-gray-400 mt-2">Join NearByAid today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition duration-200 
              ${loading 
                ? 'bg-blue-700/50 cursor-not-allowed' 
                : 'bg-[#1f6feb] hover:bg-[#388bfd]'}`}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {message && (
          <p className={`mt-6 text-center text-sm ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#1f6feb] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}