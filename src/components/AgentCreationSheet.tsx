
import React, { useState, useEffect } from 'react';
import { Bot, Calendar, Mail, Phone, Upload, Globe, FileText, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveAgent, Agent, updateAgent, getAgentWelcomeMessage } from '@/lib/agents';
import { toast } from '@/hooks/use-toast';
import { ChatbotWidget } from './ChatbotWidget';

interface AgentCreationSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  existingAgent?: Agent | null;
}

export const AgentCreationSheet: React.FC<AgentCreationSheetProps> = ({ 
  isOpen, 
  onOpenChange,
  existingAgent = null
}) => {
  const [botName, setBotName] = useState('AI Assistant');
  const [selectedLLM, setSelectedLLM] = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);
  const [promptText, setPromptText] = useState('You are a helpful AI assistant.');
  const [isEditing, setIsEditing] = useState(false);
  const [agentId, setAgentId] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const [showChatbot, setShowChatbot] = useState(false);
  const [activeTab, setActiveTab] = useState('configuration');
  
  useEffect(() => {
    if (existingAgent) {
      setBotName(existingAgent.name);
      setSelectedLLM(existingAgent.model);
      setTemperature(existingAgent.temperature);
      setPromptText(existingAgent.prompt);
      setAgentId(existingAgent.id);
      setCreatedAt(new Date(existingAgent.createdAt));
      setIsEditing(true);
    } else {
      setBotName('AI Assistant');
      setSelectedLLM('gpt-4o');
      setTemperature(0.7);
      setPromptText('You are a helpful AI assistant.');
      setAgentId('');
      setCreatedAt(new Date());
      setIsEditing(false);
    }
    setShowChatbot(true); // Always show chatbot by default
    setActiveTab('configuration');
  }, [existingAgent, isOpen]);
  
  const handleSaveBot = () => {
    if (isEditing) {
      const updatedAgent: Agent = {
        id: agentId,
        name: botName,
        prompt: promptText,
        model: selectedLLM,
        temperature: temperature,
        createdAt: createdAt,
      };
      
      updateAgent(updatedAgent);
      toast({
        title: "Agent Updated",
        description: `${botName} has been successfully updated.`,
      });
    } else {
      const newAgent: Agent = {
        id: crypto.randomUUID(),
        name: botName,
        prompt: promptText,
        model: selectedLLM,
        temperature: temperature,
        createdAt: new Date(),
      };
      
      saveAgent(newAgent);
      toast({
        title: "Agent Created",
        description: `${botName} has been successfully created.`,
      });
    }
    
    window.dispatchEvent(new Event('agentsUpdated'));
    onOpenChange(false);
  };

  const getCurrentAgent = (): Agent | null => {
    if (isEditing) {
      return {
        id: agentId,
        name: botName,
        prompt: promptText,
        model: selectedLLM,
        temperature: temperature,
        createdAt: createdAt
      };
    } else if (botName && promptText) {
      return {
        id: crypto.randomUUID(),
        name: botName,
        prompt: promptText,
        model: selectedLLM,
        temperature: temperature,
        createdAt: new Date()
      };
    }
    return null;
  };

  const handleTestChatbot = () => {
    setShowChatbot(true);
  };

  const handleBackToConfig = () => {
    setShowChatbot(false);
    setActiveTab('configuration');
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen max-h-[100dvh] p-0">
        <div className="flex h-full flex-col">
          <DrawerHeader className="border-b p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <DrawerTitle className="text-xl">
                  {isEditing ? `Edit ${botName}` : "Bot Builder Studio"}
                </DrawerTitle>
              </div>
              <Button 
                onClick={handleTestChatbot}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Test Chatbot
              </Button>
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto">
            <div className="border-b px-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent p-0 h-auto gap-6">
                  <TabsTrigger 
                    value="configuration" 
                    className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                  >
                    Configuration
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tools" 
                    className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                  >
                    Tools
                  </TabsTrigger>
                  <TabsTrigger 
                    value="finetuning" 
                    className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                  >
                    Fine Tuning
                  </TabsTrigger>
                  <TabsTrigger 
                    value="style" 
                    className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                  >
                    Style
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                  >
                    History
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-row h-full">
              {/* Left side: Configuration content */}
              <div className="w-1/2 overflow-y-auto border-r p-6">
                {activeTab === 'configuration' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Bot Configuration</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="bot-name" className="text-lg font-medium block mb-2">Bot Name</Label>
                        <Input 
                          id="bot-name" 
                          value={botName} 
                          onChange={(e) => setBotName(e.target.value)}
                          className="max-w-md"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="prompt" className="text-lg font-medium block mb-2">Prompt</Label>
                        <Textarea 
                          id="prompt" 
                          value={promptText} 
                          onChange={(e) => setPromptText(e.target.value)}
                          rows={4}
                          className="max-w-xl"
                          placeholder="Describe what your bot should do..."
                        />
                      </div>
                      
                      <div>
                        <Label className="text-lg font-medium block mb-2">Choose LLM</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 max-w-md">
                          {['gpt-4o', 'gpt-4o-mini', 'gpt-4.5-preview'].map((model) => (
                            <Button
                              key={model}
                              variant={selectedLLM === model ? "default" : "outline"}
                              className={`justify-start h-auto py-3 px-4 ${selectedLLM === model ? 'border-blue-500 bg-blue-50 text-blue-700' : ''}`}
                              onClick={() => setSelectedLLM(model)}
                            >
                              <div className="text-left">
                                <div className="font-medium">{model}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {model === 'gpt-4o' ? 'Balanced performance and cost' : 
                                  model === 'gpt-4o-mini' ? 'Faster and cheaper' : 
                                  'Most powerful model'}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="temperature" className="text-lg font-medium block mb-2">
                          Temperature: {temperature}
                        </Label>
                        <div className="flex items-center gap-4 max-w-md">
                          <span className="text-sm">Precise</span>
                          <input
                            id="temperature"
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            className="w-full"
                          />
                          <span className="text-sm">Creative</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tools' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Tools</h2>
                    <p className="text-gray-600 mb-6">Enable external tools and integrations for your bot</p>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-blue-500">
                            <Calendar size={24} />
                          </div>
                          <h3 className="text-lg font-semibold">Google Calendar</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Check calendar and manage appointments</p>
                        <div className="flex gap-2">
                          <Button className="w-full">Connect</Button>
                          <Button variant="outline" className="px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.93c-2.76-.65-5.24-2.08-7-4.05-1.95-2.15-3-4.8-3-7.38C2 5.7 4.7 3 7.5 3c1.62 0 3.1.78 4.5 2a6.09 6.09 0 0 1 4.5-2c2.8 0 5.5 2.7 5.5 6.5 0 2.58-1.05 5.23-3 7.38-1.76 1.97-4.24 3.4-7 4.05z"/></svg>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-green-500">
                            <Mail size={24} />
                          </div>
                          <h3 className="text-lg font-semibold">Email</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Send emails through your bot</p>
                        <div className="flex gap-2">
                          <Button className="w-full">Connect</Button>
                          <Button variant="outline" className="px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.93c-2.76-.65-5.24-2.08-7-4.05-1.95-2.15-3-4.8-3-7.38C2 5.7 4.7 3 7.5 3c1.62 0 3.1.78 4.5 2a6.09 6.09 0 0 1 4.5-2c2.8 0 5.5 2.7 5.5 6.5 0 2.58-1.05 5.23-3 7.38-1.76 1.97-4.24 3.4-7 4.05z"/></svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'finetuning' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Fine Tuning</h2>
                    <p className="text-gray-600 mb-6">Train your bot on custom data</p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 border rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe size={24} className="text-blue-600" />
                          <h3 className="text-lg font-semibold">Extract Content from URL</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Import knowledge from websites for your bot</p>
                        
                        <div className="max-w-xl">
                          <div className="flex items-center gap-2">
                            <Input placeholder="https://example.com/page" className="flex-1" />
                            <Button>Extract</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'style' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Style</h2>
                    <p className="text-gray-600 mb-6">Customize your bot's appearance</p>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Avatar & Name</h3>
                        
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-center">
                            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-white mb-4">
                              <Bot size={48} />
                            </div>
                          </div>
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center">
                            <Upload className="text-gray-400 mb-2" size={24} />
                            <p className="text-gray-500 text-sm mb-4">Upload avatar image</p>
                            <Button variant="outline" size="sm">Select Image</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Conversation History</h2>
                    <p className="text-gray-600 mb-6">View and analyze past conversations with your bot</p>
                    
                    <div className="bg-gray-50 border rounded-lg p-8 text-center">
                      <Clock className="mx-auto text-gray-400 mb-4" size={48} />
                      <h4 className="text-lg font-medium mb-2">No conversation history yet</h4>
                      <p className="text-gray-500 mb-4">Your bot conversation history will appear here once users start interacting with it.</p>
                      <Button variant="outline">Learn about analytics</Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right side: Chatbot preview */}
              <div className="w-1/2 flex flex-col">
                <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Preview: {botName}</h3>
                  <div className="text-sm text-gray-500">
                    {selectedLLM} · Temperature: {temperature}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
                  {showChatbot && getCurrentAgent() && (
                    <div className="h-[500px] w-full max-w-md border rounded-lg overflow-hidden shadow-md bg-white">
                      <div className="h-full flex flex-col">
                        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-white">
                              <Bot size={20} className="h-full w-full p-1" />
                            </div>
                            <span className="font-medium">{botName}</span>
                          </div>
                        </div>
                        <div className="flex-1 relative">
                          <div className="absolute inset-0">
                            <ChatbotWidget 
                              agent={getCurrentAgent()} 
                              onClose={() => {}}
                              isEmbedded={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t p-4 flex justify-end">
            <Button variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBot}>
              {isEditing ? "Save Changes" : "Create Bot"}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
