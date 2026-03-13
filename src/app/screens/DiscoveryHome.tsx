import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router';
import { Icon, LatLngExpression } from 'leaflet';
import { mockEvents } from '../data/mockData';
import { SportFilter } from '../types';
import { Search, SlidersHorizontal } from 'lucide-react';
import { calculateDistance, formatDistance } from '../utils/distance';

// Fix for default marker icons in Leaflet
const createCustomIcon = (avatar: string, count: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="48" height="60" viewBox="0 0 48 60" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#shadow)">
          <path d="M24 0C10.7 0 0 10.7 0 24c0 13.3 24 36 24 36s24-22.7 24-36C48 10.7 37.3 0 24 0z" fill="#1E3A8A"/>
          <circle cx="24" cy="22" r="14" fill="white"/>
          <text x="24" y="48" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${count}</text>
        </g>
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
          </filter>
        </defs>
      </svg>
    `)}`,
    iconSize: [48, 60],
    iconAnchor: [24, 60],
    popupAnchor: [0, -60],
  });
};

function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos: LatLngExpression = [latitude, longitude];
        setPosition(newPos);
        map.setView(newPos, 13);
      },
      () => {
        // Default to San Francisco if geolocation fails
        const defaultPos: LatLngExpression = [37.7749, -122.4194];
        setPosition(defaultPos);
        map.setView(defaultPos, 13);
      }
    );
  }, [map]);

  return position ? (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: `data:image/svg+xml;base64,${btoa(`
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="3"/>
            </svg>
          `)}`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
      }
    />
  ) : null;
}

export function DiscoveryHome() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<SportFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters: SportFilter[] = ['All', 'Soccer', 'Basketball', 'Tennis', 'Volleyball', 'Running'];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesFilter = selectedFilter === 'All' || event.sport === selectedFilter;
    const matchesSearch =
      searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative h-full">
      {/* Map */}
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {filteredEvents.map((event) => (
          <Marker
            key={event.id}
            position={event.location.coordinates}
            icon={createCustomIcon(
              event.organizer.avatar,
              `${event.currentPlayers}/${event.maxPlayers}`
            )}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{event.location.name}</p>
                <p className="text-sm mb-2">
                  {event.date} at {event.time}
                </p>
                <button
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="w-full bg-blue-900 text-white py-2 px-4 rounded-2xl hover:bg-blue-800 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Search and Filter Bar - Glassmorphic */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-4 border border-white/20">
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Event Count Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
          <span className="text-sm">
            <span className="text-blue-900">{filteredEvents.length}</span> events nearby
          </span>
        </div>
      </div>
    </div>
  );
}