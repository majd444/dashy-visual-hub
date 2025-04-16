
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bot, ChevronLeft, Minimize2, Paperclip, Send, User, X } from 'lucide-react';
import { Agent } from '@/lib/agents';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  includeLink?: boolean;
  linkUrl?: string;
}

interface ChatbotWidgetProps {
  agent: Agent | null;
  onClose: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ agent, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi, How can we help you?',
      timestamp: new Date(),
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      const botResponse = getBotResponse(messageInput);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  // Generate bot response with optional links
  const getBotResponse = (input: string): ChatMessage => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('sms') || lowercaseInput.includes('inbox')) {
      return {
        role: 'assistant',
        content: `Hi Steve,\nYou can create an SMS shared inbox by using our guide:`,
        timestamp: new Date(),
        includeLink: true,
        linkUrl: 'https://helpwise.io/updates/sms-shared-inbox/'
      };
    }
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return {
        role: 'assistant',
        content: `Hi ${agent ? agent.name : 'there'}! How can I assist you today?`,
        timestamp: new Date()
      };
    }
    
    return {
      role: 'assistant',
      content: agent 
        ? `I'm ${agent.name}, an AI assistant. How can I help with your question about "${input}"?` 
        : "I'm here to help. Could you provide more details about your question?",
      timestamp: new Date()
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Chat bubble UI
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
    <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-lg flex flex-col z-50 border rounded-2xl overflow-hidden">
      <CardHeader className="bg-blue-600 text-white p-3 flex flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-white">
              <img 
                src="/lovable-uploads/0b003d09-3600-4e27-b6a4-b393867c28eb.png" 
                alt="Agent"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://github.com/shadcn.png"; // Fallback image
                }}
              />
            </div>
            <span className="font-medium">{agent ? agent.name : 'Jason'}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="text-white hover:bg-blue-700 h-7 w-7 p-0">
            <Minimize2 size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-blue-700 h-7 w-7 p-0">
            <X size={16} />
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
              {msg.role !== 'user' && (
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-white border">
                  <img 
                    src="/lovable-uploads/0b003d09-3600-4e27-b6a4-b393867c28eb.png" 
                    alt="Agent"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://github.com/shadcn.png"; // Fallback image
                    }}
                  />
                </div>
              )}
              <div className={`py-2 px-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border'
              }`}>
                <div className="text-sm whitespace-pre-line">{msg.content}</div>
                
                {msg.includeLink && msg.linkUrl && (
                  <a 
                    href={msg.linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline block mt-1"
                  >
                    {msg.linkUrl}
                  </a>
                )}
                
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  a few seconds ago
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
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-gray-600"
          >
            <Paperclip size={18} />
          </Button>
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
