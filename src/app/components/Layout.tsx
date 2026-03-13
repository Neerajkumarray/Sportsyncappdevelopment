import { Outlet, useLocation, useNavigate } from 'react-router';
import { Map, Plus, MessageCircle, User } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto relative">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          >
            <Map
              className={`w-6 h-6 ${
                isActive('/') && !location.pathname.includes('event') && !location.pathname.includes('create') && !location.pathname.includes('locker-room')
                  ? 'text-blue-900 fill-blue-900'
                  : 'text-gray-400'
              }`}
            />
            <span
              className={`text-xs mt-1 ${
                isActive('/') && !location.pathname.includes('event') && !location.pathname.includes('create') && !location.pathname.includes('locker-room')
                  ? 'text-blue-900'
                  : 'text-gray-400'
              }`}
            >
              Discover
            </span>
          </button>

          <button
            onClick={() => navigate('/create')}
            className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-lg ${
                isActive('/create') ? 'bg-orange-500' : 'bg-blue-900'
              }`}
            >
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-xs mt-1 ${
                isActive('/create') ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              Create
            </span>
          </button>

          <button
            onClick={() => navigate('/locker-room/1')}
            className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          >
            <MessageCircle
              className={`w-6 h-6 ${
                isActive('/locker-room')
                  ? 'text-blue-900 fill-blue-900'
                  : 'text-gray-400'
              }`}
            />
            <span
              className={`text-xs mt-1 ${
                isActive('/locker-room') ? 'text-blue-900' : 'text-gray-400'
              }`}
            >
              Chats
            </span>
          </button>

          <button className="flex flex-col items-center justify-center flex-1 h-full transition-colors">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
