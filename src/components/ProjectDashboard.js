import React from "react";
import { useState } from "react";

function ProjectDashboard() {


    const [messages, setMessages] = useState([
        "Hello!",
        "How are you?",
        "I'm good, thank you!",
        "What about you?",
        "I'm doing well too!",
        "That's great!"
      ]);
      const [inputValue, setInputValue] = useState('');
    
      const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        setMessages([...messages, inputValue]);
        setInputValue('');
      };

      

  return (
    <div className="flex flex-row pt-10 justify-between mx-10">
      <div className="w-[50%]">
      <video className="w-[100%]" width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
</video>
      </div>
    <div className="chat-box w-full max-w-md mx-auto">
      <div className="messages border rounded-lg p-4 mb-4">
        {messages.map((message, index) => (
          <div key={index} className="message bg-gray-200 rounded p-2 mb-2">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Send</button>
      </form>
    </div>
    </div>
  );
}

export default ProjectDashboard;
