import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { ArrowLeft, Crosshair, MapPin, Check } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

function MapEventHandler({ onLocationChange }: { onLocationChange: (coords: LatLng) => void }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      onLocationChange(center);
    },
  });
  return null;
}

export function CreateEvent() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'location' | 'details'>('location');
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    date: '',
    time: '',
    maxPlayers: '',
    skillLevel: '',
    description: '',
  });

  const handleSetLocation = () => {
    if (selectedLocation) {
      setStep('details');
    }
  };

  const handleCreateEvent = async () => {
    // Simulate API call with PostGIS Point geometry
    const payload = {
      ...formData,
      location: {
        name: locationName,
        geometry: {
          type: 'Point',
          coordinates: [selectedLocation?.lng, selectedLocation?.lat], // [longitude, latitude]
        },
      },
    };

    console.log('Creating event with payload:', payload);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    navigate('/');
  };

  if (step === 'location') {
    return (
      <div className="h-full relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2>Choose Location</h2>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Map with Crosshair */}
        <div className="h-full pt-14">
          <MapContainer
            center={[37.7749, -122.4194]}
            zoom={13}
            className="h-full w-full"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEventHandler onLocationChange={setSelectedLocation} />
          </MapContainer>

          {/* Fixed Crosshair in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none">
            <Crosshair className="w-12 h-12 text-orange-500 drop-shadow-lg" />
          </div>

          {/* Location Info Card */}
          <div className="absolute bottom-24 left-4 right-4 z-[1000]">
            <div className="bg-white rounded-3xl shadow-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-blue-900 mt-1" />
                <div className="flex-1">
                  <Input
                    placeholder="Enter location name..."
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="border-none p-0 h-auto focus-visible:ring-0 mb-1"
                  />
                  {selectedLocation && (
                    <p className="text-xs text-gray-500">
                      {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleSetLocation}
                disabled={!selectedLocation || !locationName}
                className="w-full bg-orange-500 text-white py-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
              >
                Set Location Here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Details Step
  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setStep('location')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2>Event Details</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Event Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            placeholder="e.g., Sunset Soccer Match"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="rounded-2xl"
          />
        </div>

        {/* Sport */}
        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, sport: value })}>
            <SelectTrigger className="rounded-2xl">
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Soccer">Soccer</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Tennis">Tennis</SelectItem>
              <SelectItem value="Volleyball">Volleyball</SelectItem>
              <SelectItem value="Running">Running</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="rounded-2xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* Max Players */}
        <div className="space-y-2">
          <Label htmlFor="maxPlayers">Max Players</Label>
          <Input
            id="maxPlayers"
            type="number"
            placeholder="e.g., 12"
            value={formData.maxPlayers}
            onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
            className="rounded-2xl"
          />
        </div>

        {/* Skill Level */}
        <div className="space-y-2">
          <Label htmlFor="skillLevel">Skill Level</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, skillLevel: value })}>
            <SelectTrigger className="rounded-2xl">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Levels">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell players about the game..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-2xl min-h-24"
          />
        </div>

        {/* Location Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <span className="text-sm text-blue-900">Location</span>
          </div>
          <p className="text-sm">{locationName}</p>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-gray-100">
          <button
            onClick={handleCreateEvent}
            disabled={
              !formData.title ||
              !formData.sport ||
              !formData.date ||
              !formData.time ||
              !formData.maxPlayers ||
              !formData.skillLevel
            }
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            <Check className="w-5 h-5" />
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
