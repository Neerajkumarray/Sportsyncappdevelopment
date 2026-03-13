import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50">
      <div className="w-16 h-16 mb-4 bg-blue-900 rounded-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
      <h2 className="text-xl text-blue-900 mb-2">SportSync</h2>
      <p className="text-sm text-gray-500">Loading your sports community...</p>
    </div>
  );
}
