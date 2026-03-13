import { SportEvent, ChatMessage } from '../types';

// San Francisco area coordinates for mock events
export const mockEvents: SportEvent[] = [
  {
    id: '1',
    title: 'Sunset Soccer Match',
    sport: 'Soccer',
    date: '2026-03-15',
    time: '18:00',
    location: {
      name: 'Golden Gate Park Fields',
      coordinates: [37.7694, -122.4862],
    },
    organizer: {
      id: 'user1',
      name: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    currentPlayers: 8,
    maxPlayers: 12,
    skillLevel: 'Intermediate',
    description: 'Casual 6v6 soccer game. Bring your own water and cleats!',
  },
  {
    id: '2',
    title: 'Hoops at Dolores',
    sport: 'Basketball',
    date: '2026-03-14',
    time: '16:30',
    location: {
      name: 'Dolores Park Courts',
      coordinates: [37.7599, -122.4269],
    },
    organizer: {
      id: 'user2',
      name: 'Jordan Martinez',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    currentPlayers: 6,
    maxPlayers: 10,
    skillLevel: 'All Levels',
    description: 'Pickup basketball game. Everyone welcome!',
  },
  {
    id: '3',
    title: 'Morning Tennis Rally',
    sport: 'Tennis',
    date: '2026-03-14',
    time: '08:00',
    location: {
      name: 'Presidio Tennis Courts',
      coordinates: [37.7989, -122.4662],
    },
    organizer: {
      id: 'user3',
      name: 'Sarah Kim',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    currentPlayers: 3,
    maxPlayers: 4,
    skillLevel: 'Intermediate',
    description: 'Doubles tennis match. Looking for one more player!',
  },
  {
    id: '4',
    title: 'Beach Volleyball',
    sport: 'Volleyball',
    date: '2026-03-15',
    time: '14:00',
    location: {
      name: 'Baker Beach',
      coordinates: [37.7937, -122.4844],
    },
    organizer: {
      id: 'user4',
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    currentPlayers: 5,
    maxPlayers: 8,
    skillLevel: 'Beginner',
    description: 'Fun beach volleyball game. No experience required!',
  },
  {
    id: '5',
    title: 'Marina Run Club',
    sport: 'Running',
    date: '2026-03-14',
    time: '07:00',
    location: {
      name: 'Marina Green',
      coordinates: [37.8032, -122.4381],
    },
    organizer: {
      id: 'user5',
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    currentPlayers: 12,
    maxPlayers: 20,
    skillLevel: 'All Levels',
    description: '5K morning run along the bay. All paces welcome!',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    senderId: 'user1',
    senderName: 'Alex Chen',
    senderAvatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Hey everyone! Excited for the game tomorrow!',
    timestamp: new Date('2026-03-13T14:30:00'),
  },
  {
    senderId: 'user6',
    senderName: 'Chris Wilson',
    senderAvatar: 'https://i.pravatar.cc/150?img=6',
    content: 'Same here! Should I bring an extra ball?',
    timestamp: new Date('2026-03-13T14:32:00'),
  },
  {
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: 'https://i.pravatar.cc/150?img=7',
    content: 'That would be great! I can bring cones for goals.',
    timestamp: new Date('2026-03-13T14:35:00'),
  },
  {
    senderId: 'user1',
    senderName: 'Alex Chen',
    senderAvatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Perfect! See you all at 6 PM sharp.',
    timestamp: new Date('2026-03-13T14:40:00'),
  },
  {
    senderId: 'user7',
    senderName: 'Lisa Taylor',
    senderAvatar: 'https://i.pravatar.cc/150?img=8',
    content: "I'll bring water bottles for everyone!",
    timestamp: new Date('2026-03-13T15:00:00'),
  },
];
