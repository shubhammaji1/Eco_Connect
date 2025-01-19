import React, { useState } from 'react';
import './Chatbot.css'; // Import CSS file for styling

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);  // State to toggle chatbot visibility
  const [messages, setMessages] = useState([]); // State to hold messages
  const [input, setInput] = useState('');       // State to hold user input

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle user input and chatbot response
  const handleSendMessage = () => {
    if (input.trim() === '') return; // Do nothing if input is empty

    // Add user's message to the messages array
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    // Clear the input field
    setInput('');

    // Simulate chatbot response after a delay
    setTimeout(() => {
      const botMessage = {
        sender: 'bot',
        text: generateResponse(userMessage.text), // Pass user message to generateResponse function
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 500); // 0.5 second delay for the chatbot's response
  };

  // Function to generate chatbot response (simple rule-based)
  const generateResponse = (userMessage) => {
    // Simple predefined responses based on user input
    if (userMessage.toLowerCase().includes('hi')) {
      return 'Hi there! How can I assist you today?';
    } else if (userMessage.toLowerCase().includes('help')) {
      return 'Sure! I am here to help. What do you need assistance with?';
    } else if (userMessage.toLowerCase().includes('bye')) {
      return 'Goodbye! Have a great day!';
    } else {
      return 'I\'m not sure how to respond to that. Our team will get back to you soon.';
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Function to send message when user presses Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="chatbot-header" onClick={toggleChatbot}>
        <img  src="images\roboticon.gif" alt="Chatbot" />
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </div>

      {isOpen && (
        <div className="chatbot-content">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type Hi"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}  // Send message on Enter key press
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;