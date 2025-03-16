import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { CrowdFundingContext } from '../Context/CrowdFunding';

const Chatbot = () => {
  const { getCampaigns } = useContext(CrowdFundingContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your FundCrypt assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const messagesEndRef = useRef(null);
  const [isPulsing, setIsPulsing] = useState(true);

  // Fetch campaigns when component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaigns = await getCampaigns();
        setAllCampaigns(campaigns || []);
      } catch (error) {
        console.error("Error fetching campaigns for chatbot:", error);
      }
    };
    
    fetchCampaigns();
  }, [getCampaigns]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Stop pulsing animation after chat is opened once
  useEffect(() => {
    if (isOpen) {
      setIsPulsing(false);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Format campaigns data for the AI
      const campaignsContext = allCampaigns.length > 0 
        ? "Current campaigns in our system:\n" + 
          allCampaigns.map((campaign, index) => 
            `${index + 1}. Title: ${campaign.title}\n   Description: ${campaign.description}\n   Target: ${campaign.target} ETH\n   Raised: ${campaign.amountCollected} ETH\n   Deadline: ${new Date(campaign.deadline).toLocaleDateString()}\n   Owner: ${campaign.owner}\n`
          ).join("\n")
        : "There are currently no active campaigns in our system.";
      
      // Send message to AI agent API with campaigns context
      const response = await fetch('https://fundcrypt.us01.erebrus.io/0664f92c-5fc0-0b4e-85e6-943f158d597b/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `${campaignsContext}\n\nUser question: ${inputText}`,
          userId: "user1",
          userName: "Sha"
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("API response:", data);
        
        // Check if data is an array and contains at least one item
        if (Array.isArray(data) && data.length > 0) {
          // Add bot response to chat
          setMessages(prev => [...prev, { text: data[0].text || "I received your message!", sender: 'bot' }]);
        } else {
          // Handle unexpected response format
          setMessages(prev => [...prev, { text: data.text || "I received your message!", sender: 'bot' }]);
        }
      } else {
        // Handle error response
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: 'bot' }]);
      }
    } catch (error) {
      console.error("Error sending message to AI agent:", error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat button with attention-grabbing effects */}
      <div className="relative">
        {isPulsing && (
          <span className="absolute inset-0 rounded-full animate-ping bg-black opacity-30"></span>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`relative bg-black hover:bg-gray-800 text-white rounded-full p-3 shadow-lg flex items-center justify-center w-16 h-16 transition-transform duration-300 ${!isOpen && 'hover:scale-110'}`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {!isOpen && isPulsing && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  1
                </span>
              )}
            </>
          )}
        </button>
        {!isOpen && (
          <div className="absolute -top-10 right-0 bg-black text-white text-sm py-1 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Need help? Chat with me!
          </div>
        )}
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 md:w-[450px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-300 max-h-[80vh]">
          {/* Chat header */}
          <div className="bg-black text-white p-4">
            <h3 className="font-medium">FundCrypt Assistant</h3>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[60vh] bg-white">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[85%] break-words ${
                    msg.sender === 'user' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-3">
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-black">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-300 p-4 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-r-lg disabled:bg-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 