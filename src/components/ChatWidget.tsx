import React, { useState } from 'react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <button onClick={toggleChat} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        Chat
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', bottom: '70px', right: '20px', border: '1px solid black', padding: '10px', backgroundColor: 'white' }}>
          <div style={{ height: '200px', overflowY: 'scroll' }}>
            {messages.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
            placeholder="Type a message..."
          />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
