import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">NearByAid</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/map" className="hover:underline">Find Help</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
