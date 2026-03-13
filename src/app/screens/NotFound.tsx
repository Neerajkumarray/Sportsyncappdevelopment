import { useNavigate } from 'react-router';
import { MapOff, Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <MapOff className="w-12 h-12 text-gray-400" />
      </div>
      <h1 className="text-3xl mb-3 text-blue-900">404</h1>
      <h2 className="text-xl mb-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 text-center mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. Let's get you back to discovering events!
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-2xl hover:bg-orange-600 transition-colors"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  );
}
