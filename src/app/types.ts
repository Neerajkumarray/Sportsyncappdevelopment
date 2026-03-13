/**
 * SportSync Type Definitions
 * 
 * Mobile-first PWA for sports event discovery and coordination
 * 
 * Architecture:
 * - Frontend: React 18+ with TypeScript (Strict Mode)
 * - Styling: Tailwind CSS v4 with custom theme (#1E3A8A blue, #F97316 orange)
 * - Routing: React Router v7 (Data mode)
 * - Maps: Leaflet.js with custom markers
 * - Animation: Motion (formerly Framer Motion)
 * 
 * Backend Integration (Production):
 * - Java Spring Boot REST API
 * - JWT-based authentication
 * - PostgreSQL + PostGIS for geospatial queries (ST_DWithin for 5km radius)
 * - WebSocket/STOMP for real-time chat
 */

export interface SportEvent {
  id: string;
  title: string;
  sport: string;
  date: string;
  time: string;
  location: {
    name: string;
    coordinates: [number, number]; // [lat, lng]
  };
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  currentPlayers: number;
  maxPlayers: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  description: string;
}

export interface ChatMessage {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
}

export type SportFilter = 'All' | 'Soccer' | 'Basketball' | 'Tennis' | 'Volleyball' | 'Running';