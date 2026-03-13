/**
 * WebSocket/STOMP Connection Utility (Mock Implementation)
 * 
 * In production, this would connect to Spring Boot backend via:
 * - SockJS for WebSocket fallback support
 * - STOMP protocol for messaging
 * 
 * Example production setup:
 * 
 * import SockJS from 'sockjs-client';
 * import { Client } from '@stomp/stompjs';
 * 
 * const socket = new SockJS('http://your-backend/ws');
 * const stompClient = new Client({
 *   webSocketFactory: () => socket,
 *   onConnect: () => {
 *     stompClient.subscribe('/topic/events/' + eventId, (message) => {
 *       const chatMessage = JSON.parse(message.body);
 *       // Update UI with new message
 *     });
 *   }
 * });
 * 
 * stompClient.activate();
 * 
 * // Send message
 * stompClient.publish({
 *   destination: '/app/chat/' + eventId,
 *   body: JSON.stringify(chatMessage)
 * });
 */

export class MockWebSocketClient {
  private eventId: string;
  private onMessage: (message: any) => void;

  constructor(eventId: string, onMessage: (message: any) => void) {
    this.eventId = eventId;
    this.onMessage = onMessage;
  }

  connect() {
    console.log(`Mock WebSocket connected to event ${this.eventId}`);
    // In production, establish STOMP connection
  }

  sendMessage(message: any) {
    console.log('Sending message:', message);
    // In production, use stompClient.publish()
    
    // Mock echo response after delay
    setTimeout(() => {
      this.onMessage(message);
    }, 100);
  }

  disconnect() {
    console.log('Mock WebSocket disconnected');
    // In production, call stompClient.deactivate()
  }
}
