import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { mockEvents } from '../data/mockData';
import { calculateDistance, formatDistance } from '../utils/distance';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Trophy,
  ArrowLeft,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { Progress } from '../components/ui/progress';

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  const [y, setY] = useState(0);
  const [userLocation] = useState<[number, number]>([37.7749, -122.4194]); // Mock user location

  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Event not found</p>
      </div>
    );
  }

  const progressPercentage = (event.currentPlayers / event.maxPlayers) * 100;
  
  // Calculate distance from user to event
  const distance = calculateDistance(
    userLocation[0],
    userLocation[1],
    event.location.coordinates[0],
    event.location.coordinates[1]
  );

  const handleJoin = async () => {
    // Simulate API call to POST /api/v1/events/{id}/join
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsJoined(true);
  };

  return (
    <div className="h-full bg-gray-50 relative overflow-hidden">
      {/* Header Image/Map Preview */}
      <div className="h-64 bg-gradient-to-br from-blue-900 to-blue-700 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <ArrowLeft className="w-5 h-5 text-blue-900" />
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10">
          <Share2 className="w-5 h-5 text-blue-900" />
        </button>
        
        {/* Map background placeholder - in production, show actual map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-white/30" />
        </div>
      </div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDrag={(_, info) => setY(info.offset.y)}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) {
              navigate('/');
            }
          }}
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          className="absolute top-56 left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-2xl"
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="px-6 pb-24 overflow-y-auto h-full">
            {/* Event Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs mb-2">
                    {event.sport}
                  </span>
                  <h1 className="text-2xl mb-2">{event.title}</h1>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-500">Organized by</p>
                  <p>{event.organizer.name}</p>
                </div>
              </div>

              {/* Players Progress */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-900" />
                    <span>
                      {event.currentPlayers} / {event.maxPlayers} Players
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {event.maxPlayers - event.currentPlayers} spots left
                  </span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-2"
                />
              </div>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <Calendar className="w-5 h-5 text-blue-900 mb-2" />
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <Clock className="w-5 h-5 text-blue-900 mb-2" />
                <p className="text-xs text-gray-500 mb-1">Time</p>
                <p className="text-sm">{event.time}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <Trophy className="w-5 h-5 text-blue-900 mb-2" />
                <p className="text-xs text-gray-500 mb-1">Skill Level</p>
                <p className="text-sm">{event.skillLevel}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-blue-900 mb-2" />
                <p className="text-xs text-gray-500 mb-1">Distance</p>
                <p className="text-sm">{formatDistance(distance)}</p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="mb-3">Location</h3>
              <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-900 mt-1" />
                <div className="flex-1">
                  <p>{event.location.name}</p>
                  <button className="text-sm text-blue-900 mt-1">
                    View on map →
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100">
              <div className="max-w-md mx-auto flex gap-3">
                <button
                  onClick={() => navigate(`/locker-room/${event.id}`)}
                  className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center"
                >
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={handleJoin}
                  disabled={isJoined}
                  className={`flex-1 h-14 rounded-2xl transition-all ${
                    isJoined
                      ? 'bg-green-400 text-white'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isJoined ? '✓ Joined' : 'Join Game'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}