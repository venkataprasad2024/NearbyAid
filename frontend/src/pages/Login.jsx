// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ← Link added here
import api from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/map'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161b22] rounded-lg shadow-xl border border-[#30363d] p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">NearByAid</h1>
          <p className="text-gray-400 mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
              loading ? 'bg-blue-700/50 cursor-not-allowed' : 'bg-[#1f6feb] hover:bg-[#388bfd]'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {message && (
          <p className={`mt-6 text-center text-sm ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="mt-8 text-center text-sm text-gray-400">
          New here?{' '}
          <Link to="/register" className="text-[#1f6feb] hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}