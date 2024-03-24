import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <Link to="AddProject">
    <div className="fixed bottom-4 right-4">
      <button onClick={toggleExpansion} className="bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full px-3 py-3 flex items-center shadow-lg text-white">
        <span className="text-xxl text-strong">+</span>
      </button>
    </div>
    </Link>
  );
};

export default FloatingButton;
