import React from 'react';
const TypingIndicator = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <div className="typing">
        <div className="typing__dot"></div>
        <div className="typing__dot"></div>
        <div className="typing__dot"></div>
      </div>
    </div>
  );
};
export default TypingIndicator;
