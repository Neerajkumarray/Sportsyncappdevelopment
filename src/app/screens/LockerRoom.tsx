import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockChatMessages, mockEvents } from '../data/mockData';
import { ChatMessage } from '../types';
import { ArrowLeft, Send, Smile, Paperclip } from 'lucide-react';
import { format } from 'date-fns';

export function LockerRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const event = mockEvents.find((e) => e.id === id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: ChatMessage = {
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: 'https://i.pravatar.cc/150?img=7',
      content: newMessage,
      timestamp: new Date(),
    };

    // Simulate WebSocket message via STOMP
    setMessages([...messages, message]);
    setNewMessage('');
    
    // In production: stompClient.send('/app/chat/' + eventId, {}, JSON.stringify(message));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg">{event?.title || 'Event Chat'}</h2>
          <p className="text-xs text-gray-500">
            {event?.currentPlayers} participants
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
            {format(new Date(), 'MMMM d, yyyy')}
          </div>
        </div>

        {/* Messages */}
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === 'current-user';
          const showAvatar =
            index === 0 ||
            messages[index - 1].senderId !== message.senderId;

          return (
            <div
              key={index}
              className={`flex gap-2 ${
                isCurrentUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 flex-shrink-0">
                {showAvatar && !isCurrentUser && (
                  <img
                    src={message.senderAvatar}
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] ${
                  isCurrentUser ? 'items-end' : 'items-start'
                } flex flex-col`}
              >
                {showAvatar && !isCurrentUser && (
                  <span className="text-xs text-gray-500 mb-1 px-3">
                    {message.senderName}
                  </span>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-blue-900 text-white rounded-br-md'
                      : 'bg-gray-200 text-blue-900 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-3">
                  {format(message.timestamp, 'h:mm a')}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none"
            />
            <button className="text-gray-500">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              newMessage.trim() === ''
                ? 'bg-gray-200 text-gray-400'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
