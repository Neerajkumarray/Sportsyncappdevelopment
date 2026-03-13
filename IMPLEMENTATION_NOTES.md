# SportSync - Implementation Notes

## Architecture Overview

**Mobile-first PWA** built with React 18+ and TypeScript, designed for sports event discovery and real-time coordination.

### Technology Stack

#### Frontend Core
- **React 18.3.1** (Strict Mode)
- **TypeScript** (Strict typing throughout)
- **React Router 7.13.0** (Data mode for navigation)
- **Tailwind CSS 4.1.12** (Utility-first styling)

#### Key Libraries
- **Leaflet.js + React-Leaflet** - Interactive maps with custom markers
- **Motion (Framer Motion)** - Smooth animations and gestures
- **Lucide React** - Icon system
- **date-fns** - Date formatting and manipulation
- **Radix UI** - Accessible component primitives

### Design System

#### Color Palette (Tailwind Classes)
- **Primary**: `bg-blue-900` (#1E3A8A) - Main brand color
- **Accent**: `bg-orange-500` (#F97316) - CTAs and highlights
- **Background**: `bg-gray-50` (#F9FAFB) - App background
- **Success**: `bg-green-400` (#4ADE80) - Positive states

#### Border Radius
- `rounded-2xl` (16px) - Cards, buttons, inputs
- `rounded-3xl` (24px) - Main containers
- `rounded-full` - Pills, badges, avatar

#### Shadows
- `shadow-lg` - Elevated cards and modals
- Glassmorphic effects: `backdrop-blur-md` + `bg-white/80`

## Application Structure

```
/src/app/
├── App.tsx                 # Root component with ErrorBoundary
├── routes.tsx             # React Router configuration
├── types.ts               # TypeScript interfaces
├── components/
│   ├── Layout.tsx         # Main layout with bottom nav
│   ├── ErrorBoundary.tsx  # Error handling
│   └── LoadingScreen.tsx  # Loading state
├── screens/
│   ├── DiscoveryHome.tsx  # Map-based event discovery
│   ├── EventDetails.tsx   # Event details with bottom sheet
│   ├── CreateEvent.tsx    # Two-step event creation
│   ├── LockerRoom.tsx     # Real-time chat
│   └── NotFound.tsx       # 404 page
├── data/
│   └── mockData.ts        # Mock events and messages
├── hooks/
│   └── useGeolocation.ts  # Geolocation custom hook
├── utils/
│   ├── api.ts             # API service (mock)
│   ├── websocket.ts       # WebSocket client (mock)
│   └── distance.ts        # Haversine distance calculation
└── config/
    ├── constants.ts       # App configuration
    └── pwa.ts             # PWA manifest config
```

## Screen Specifications

### Screen A: Discovery Home
**File**: `DiscoveryHome.tsx`

**Features**:
- Edge-to-edge Leaflet map
- User geolocation with `navigator.geolocation`
- Custom SVG markers showing player count
- Glassmorphic filter bar (`backdrop-blur-md`)
- Real-time search and sport filtering
- Event count badge

**Tech Details**:
- MapContainer centers on user location or defaults to SF
- Custom L.divIcon using base64-encoded SVG
- Filter chips with smooth transitions

### Screen B: Event Details
**File**: `EventDetails.tsx`

**Features**:
- Bottom sheet with Motion drag gestures
- Draggable card with `drag="y"`
- Animated progress bar for player count
- Distance calculation from user
- Join/Leave event actions

**Tech Details**:
- AnimatePresence for enter/exit animations
- Progress bar uses `transition-all duration-500`
- API call: `POST /api/v1/events/{id}/join`

### Screen C: Create Event
**File**: `CreateEvent.tsx`

**Features**:
- Two-step flow: Location → Details
- Fixed central crosshair on map
- Captures map center coordinates
- Form validation
- PostGIS Point geometry payload

**Tech Details**:
- `onMoveEnd` captures map center
- Sends `GEOMETRY(Point, 4326)` format
- Crosshair: `position: fixed` overlay

### Screen D: Live Locker Room
**File**: `LockerRoom.tsx`

**Features**:
- Real-time chat interface
- User bubbles on right, others on left
- Timestamp formatting with date-fns
- Auto-scroll to latest message

**Tech Details**:
- WebSocket/STOMP ready (mock implementation)
- Message bubbles: `bg-blue-900` (user) vs `bg-gray-200` (others)
- Enter to send, auto-focus input

## Backend Integration (Production)

### REST API Endpoints

```typescript
// Event Discovery (PostGIS ST_DWithin)
GET /api/v1/events?lat={lat}&lng={lng}&radius=5000

// Event Details
GET /api/v1/events/{id}

// Create Event
POST /api/v1/events
Body: {
  title, sport, date, time, maxPlayers, skillLevel, description,
  location: {
    name: string,
    geometry: { type: "Point", coordinates: [lng, lat] }
  }
}

// Join/Leave Event
POST /api/v1/events/{id}/join
POST /api/v1/events/{id}/leave
Headers: { Authorization: "Bearer {jwtToken}" }
```

### WebSocket/STOMP

```typescript
// Connect
const socket = new SockJS('http://backend/ws');
const stompClient = new Client({ webSocketFactory: () => socket });

// Subscribe to event chat
stompClient.subscribe('/topic/events/' + eventId, handleMessage);

// Send message
stompClient.publish({
  destination: '/app/chat/' + eventId,
  body: JSON.stringify(chatMessage)
});
```

### PostGIS Queries

```sql
-- Find events within 5km radius
SELECT * FROM events 
WHERE ST_DWithin(
  location, 
  ST_MakePoint({lng}, {lat})::geography, 
  5000
);
```

## Mobile-First Features

### Responsive Design
- Max-width container: `max-w-md mx-auto`
- Touch-optimized: 44px minimum touch targets
- Safe area insets: `safe-area-inset-bottom`

### PWA Enhancements
- Viewport meta: `viewport-fit=cover`
- Theme color: `#1E3A8A`
- Service worker ready
- App icons: 72x72 to 512x512
- Standalone display mode

### Performance
- Lazy loading with React Router
- Optimistic UI updates
- Local state management
- Mock API with realistic delays

## Development Notes

### Mock Data
All mock data uses San Francisco coordinates for consistency. Replace with real API calls in production.

### TypeScript Interfaces
Strict typing throughout. See `/src/app/types.ts` for all interfaces.

### Styling Approach
- Tailwind utility classes preferred
- Custom theme tokens in `theme.css`
- Component-specific styles avoided
- Mobile-first responsive breakpoints

### Testing Checklist
- [ ] Test geolocation permission flow
- [ ] Verify map marker clustering at zoom levels
- [ ] Test bottom sheet drag gestures on mobile
- [ ] Validate form inputs
- [ ] Check chat message ordering
- [ ] Test offline mode (with service worker)

## Future Enhancements

1. **User Authentication** - JWT token management
2. **Push Notifications** - Event reminders and chat
3. **Image Upload** - Event photos and user avatars
4. **Calendar Integration** - Add to Google/Apple Calendar
5. **Social Features** - Follow users, event ratings
6. **Analytics** - Event discovery metrics
7. **Payment Integration** - Paid events support

## Deployment

### Build Command
```bash
npm run build
```

### Environment Variables
```env
REACT_APP_API_URL=https://api.sportsync.com/api/v1
REACT_APP_WS_URL=wss://api.sportsync.com/ws
REACT_APP_GOOGLE_MAPS_KEY=your_key_here
```

### Performance Budget
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

---

**Built with ❤️ for the sports community**
