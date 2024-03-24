import React, { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';

const initialMessages = [
  { text: 'Hello!', timestamp: '10:00 AM', user: 'Alice', userType: 'Editor' },
  { text: 'How are you?', timestamp: '10:05 AM', user: 'Bob', userType: 'Admin' },
  { text: 'I\'m doing well, thanks! How about you?', timestamp: '10:10 AM', user: 'Charlie', userType: 'Client' },
  { text: 'I\'m good too, thanks for asking!', timestamp: '10:15 AM', user: 'Alice', userType: 'Editor' },
  { text: 'That\'s great!', timestamp: '10:20 AM', user: 'Bob', userType: 'Admin' },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
        user: 'You',
        userType: 'Editor',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const csvData = messages.map((message) => ({
    Time: message.timestamp,
    User: message.user,
    Message: message.text,
  }));

  const handleScroll = () => {
    if (chatEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatEndRef.current.parentElement;
      setShowScrollButton(scrollHeight - scrollTop !== clientHeight);
    }
  };

  const handleScrollDown = () => {
    scrollToBottom();
    setShowScrollButton(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative">
      <div className="bg-white p-4 flex justify-between items-center shadow-md fixed w-full top-0">
        <input
          type="text"
          placeholder="Search in chat..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-full px-4 py-2 w-1/3 focus:outline-none focus:ring focus:border-blue-300"
        />
        <CSVLink data={csvData} filename={'chat_messages.csv'} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Download CSV
        </CSVLink>
      </div>
      <div className="overflow-y-auto p-4 flex flex-col" onScroll={handleScroll}>
        {filteredMessages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.user === 'You' ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`rounded-lg ${message.user === 'You' ? 'bg-blue-300' : message.userType === 'Editor' ? 'bg-gray-300' : message.userType === 'Admin' ? 'bg-green-300' : 'bg-gray-300'} p-2 max-w-xs break-words`}>
              <p className="text-sm">{message.text}</p>
            </div>
            <span className={`text-gray-500 text-xs ${message.user === 'You' ? 'text-right' : 'text-left'}`}>{message.timestamp}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center p-4 fixed bottom-0 w-full bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleMessageChange}
          className="flex-1 rounded-full py-2 px-4 mr-4 focus:outline-none focus:ring focus:border-blue-300 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send
        </button>
      </form>
      {showScrollButton && (
        <button
          className="fixed bottom-10 right-4 bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-900 focus:outline-none focus:ring focus:border-gray-300"
          onClick={handleScrollDown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chat;
