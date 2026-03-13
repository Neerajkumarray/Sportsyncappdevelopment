/**
 * Mock API Service
 * 
 * This simulates REST API calls to a Spring Boot backend.
 * In production, replace these with actual fetch/axios calls to your backend.
 * 
 * Example endpoints:
 * - GET /api/v1/events?lat={lat}&lng={lng}&radius=5000
 * - GET /api/v1/events/{id}
 * - POST /api/v1/events
 * - POST /api/v1/events/{id}/join
 * - GET /api/v1/events/{id}/participants
 */

import { SportEvent } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  /**
   * Get events within 5km radius using PostGIS ST_DWithin
   * Query: SELECT * FROM events WHERE ST_DWithin(location, ST_MakePoint(lng, lat)::geography, 5000)
   */
  async getEventsNearby(lat: number, lng: number): Promise<SportEvent[]> {
    await delay(300);
    // In production: return fetch(`/api/v1/events?lat=${lat}&lng=${lng}&radius=5000`)
    return Promise.resolve([]);
  },

  /**
   * Get single event by ID
   */
  async getEvent(id: string): Promise<SportEvent | null> {
    await delay(200);
    // In production: return fetch(`/api/v1/events/${id}`)
    return Promise.resolve(null);
  },

  /**
   * Create new event with PostGIS Point geometry
   */
  async createEvent(eventData: any): Promise<{ id: string }> {
    await delay(500);
    console.log('Creating event with PostGIS Point:', eventData);
    // In production: 
    // return fetch('/api/v1/events', {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${jwtToken}`
    //   },
    //   body: JSON.stringify(eventData)
    // })
    return Promise.resolve({ id: 'new-event-id' });
  },

  /**
   * Join an event
   * JWT token should be included in Authorization header
   */
  async joinEvent(eventId: string): Promise<{ success: boolean }> {
    await delay(400);
    console.log(`Joining event ${eventId}`);
    // In production:
    // return fetch(`/api/v1/events/${eventId}/join`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${jwtToken}` }
    // })
    return Promise.resolve({ success: true });
  },

  /**
   * Leave an event
   */
  async leaveEvent(eventId: string): Promise<{ success: boolean }> {
    await delay(400);
    // In production: return fetch(`/api/v1/events/${eventId}/leave`, { method: 'POST' })
    return Promise.resolve({ success: true });
  },
};
