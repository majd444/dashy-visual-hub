
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Minimize2, Send, User, X } from 'lucide-react';
import { Agent } from '@/lib/agents';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  agent: Agent | null;
  onClose: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ agent, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: agent ? `Hello! I'm ${agent.name}. How can I help you today?` : 'Hello! How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: messageInput,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setMessageInput('');
    
    // Simulate bot response (would connect to actual AI in production)
    setTimeout(() => {
      const botMessage: ChatMessage = {
        role: 'assistant',
        content: getBotResponse(messageInput),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  // Simple response generator for demo purposes
  const getBotResponse = (input: string): string => {
    if (agent) {
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
        return `Hi there! I'm ${agent.name}, running on the ${agent.model} model. How can I assist you?`;
      }
      
      if (lowercaseInput.includes('who are you') || lowercaseInput.includes('what are you')) {
        return `I'm ${agent.name}, an AI assistant configured with a temperature of ${agent.temperature}. I was designed to ${agent.prompt}`;
      }
      
      return `I'm processing your request about "${input}". As ${agent.name}, I'm here to assist you with your questions.`;
    }
    
    return "I'm a demo chatbot. In a real application, I would connect to an AI service to provide meaningful responses.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom when new messages are added
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="rounded-full h-16 w-16 bg-blue-600 hover:bg-blue-700 p-0 flex items-center justify-center"
          onClick={() => setIsMinimized(false)}
        >
          <Bot size={28} />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[380px] h-[500px] shadow-lg flex flex-col z-50 border rounded-xl overflow-hidden">
      <CardHeader className="bg-blue-600 text-white p-4 flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={24} />
          <div>
            <h3 className="font-medium">{agent ? agent.name : 'AI Assistant'}</h3>
            <p className="text-xs text-blue-100">{agent ? `Model: ${agent.model}` : 'Demo Bot'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="text-white hover:bg-blue-700 h-8 w-8 p-0">
            <Minimize2 size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-blue-700 h-8 w-8 p-0">
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-blue-600 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`py-2 px-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border rounded-tl-none'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className="text-[10px] mt-1 text-opacity-80">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-3 bg-white border-t">
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={messageInput.trim() === ''}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
