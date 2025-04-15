
import React, { useState } from 'react';
import { Bot, Calendar, Mail, Phone, Upload, Globe, FileText, Palette, Layout } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AgentCreationSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AgentCreationSheet: React.FC<AgentCreationSheetProps> = ({ isOpen, onOpenChange }) => {
  const [botName, setBotName] = useState('AI Assistant');
  const [selectedLLM, setSelectedLLM] = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);
  const [promptText, setPromptText] = useState('You are a helpful AI assistant.');
  
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen max-h-[100dvh] p-0">
        <div className="flex h-full flex-col">
          <DrawerHeader className="border-b p-6">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <DrawerTitle className="text-xl">Bot Builder Studio</DrawerTitle>
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="configuration" className="w-full">
              <div className="border-b px-6">
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
                    value="workflow" 
                    className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                  >
                    Workflow
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Bot Configuration Tab */}
              <TabsContent value="configuration" className="p-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 max-w-3xl">
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
              </TabsContent>
              
              {/* Tools Tab */}
              <TabsContent value="tools" className="p-6">
                <h2 className="text-3xl font-bold mb-4">Tools</h2>
                <p className="text-gray-600 mb-6">Enable external tools and integrations for your bot</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-purple-500">
                        <Phone size={24} />
                      </div>
                      <h3 className="text-lg font-semibold">SMS</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Send text messages through your bot</p>
                    <div className="flex gap-2">
                      <Button className="w-full">Connect</Button>
                      <Button variant="outline" className="px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.93c-2.76-.65-5.24-2.08-7-4.05-1.95-2.15-3-4.8-3-7.38C2 5.7 4.7 3 7.5 3c1.62 0 3.1.78 4.5 2a6.09 6.09 0 0 1 4.5-2c2.8 0 5.5 2.7 5.5 6.5 0 2.58-1.05 5.23-3 7.38-1.76 1.97-4.24 3.4-7 4.05z"/></svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Fine Tuning Tab */}
              <TabsContent value="finetuning" className="p-6">
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
                  
                  <div className="bg-gray-50 border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText size={24} className="text-green-600" />
                      <h3 className="text-lg font-semibold">Extract Content from File</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Upload documents to train your bot</p>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-500 mb-4">Drag & drop files or click to browse</p>
                      <p className="text-xs text-gray-400">Supported formats: PDF, DOC, DOCX, TXT (Max 50MB)</p>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">Upload Files</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Style Tab */}
              <TabsContent value="style" className="p-6">
                <h2 className="text-3xl font-bold mb-4">Style</h2>
                <p className="text-gray-600 mb-6">Customize your bot's appearance</p>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Avatar & Name</h3>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center text-white mb-4">
                          <Bot size={64} />
                        </div>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-xs flex flex-col items-center">
                          <Upload className="text-gray-400 mb-2" size={24} />
                          <p className="text-gray-500 text-sm mb-4">Upload avatar image</p>
                          <Button variant="outline" size="sm">Select Image</Button>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-6">
                        <div>
                          <Label htmlFor="chat-name" className="text-base font-medium block mb-2">Bot Name (displayed in chat)</Label>
                          <Input id="chat-name" placeholder="AI Assistant" defaultValue="AI Assistant" className="max-w-md" />
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Colors</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="primary-color" className="text-sm block mb-2">Primary Color</Label>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                                <Input id="primary-color" type="text" defaultValue="#3B82F6" className="w-32" />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="bg-color" className="text-sm block mb-2">Background Color</Label>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                                <Input id="bg-color" type="text" defaultValue="#F3F4F6" className="w-32" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">External Elements</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="outside-image" className="text-sm block mb-2">Outside Image URL</Label>
                              <Input id="outside-image" type="text" placeholder="https://example.com/image.jpg" />
                            </div>
                            
                            <div>
                              <Label htmlFor="outside-text" className="text-sm block mb-2">Outside Text</Label>
                              <Input id="outside-text" type="text" placeholder="Chat with our AI assistant!" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Workflow Tab */}
              <TabsContent value="workflow" className="p-6">
                <h2 className="text-3xl font-bold mb-4">Bot Workflow & Deployment</h2>
                
                <div className="mb-10">
                  <h3 className="text-xl font-semibold mb-2">Deploy Your Bot</h3>
                  <p className="text-gray-600 mb-4">Integrate your bot with your website or application</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <code>&lt;/&gt;</code> Embed Code
                        </span>
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" className="w-full justify-between text-left">
                        <span className="flex items-center gap-2">
                          Chat Settings
                        </span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border my-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">HTML</span>
                      <Button variant="ghost" size="sm" className="h-6 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      </Button>
                    </div>
                    <code className="text-xs sm:text-sm block text-gray-800">
                      &lt;script src="https://bot-builder-studio.com/embed.js" data-bot-id="your-bot-id"&gt;&lt;/script&gt;
                    </code>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      Download Config
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Share
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Chat Workflow</h3>
                  <p className="text-gray-600 mb-4">Define how your bot handles conversations</p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Initial Greeting</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p>Hi there! 👋 How can I assist you today?</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Conversation Flow</h4>
                    <div className="bg-gray-50 p-6 rounded-lg border flex items-center justify-center">
                      <Layout className="mr-2 text-gray-500" />
                      <span className="text-gray-500">Conversation flow builder coming soon</span>
                    </div>
                  </div>
                  
                  <Button>
                    Edit Conversation Flow
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="border-t p-4 flex justify-end">
            <Button variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button>
              Create Bot
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
