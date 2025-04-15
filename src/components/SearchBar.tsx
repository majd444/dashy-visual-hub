
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Bot } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="flex justify-between items-center w-full mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Plus size={16} />
          Create a new agent
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto p-0">
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b p-6">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <SheetTitle>Bot Builder Studio</SheetTitle>
              </div>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="workflow" className="w-full">
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
                      value="plugins" 
                      className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                    >
                      Plugins
                    </TabsTrigger>
                    <TabsTrigger 
                      value="workflow" 
                      className="border-b-2 border-transparent px-0 py-4 rounded-none data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                    >
                      Workflow
                    </TabsTrigger>
                  </TabsList>
                </div>

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
                  </div>
                </TabsContent>
                
                <TabsContent value="plugins" className="p-6">
                  <h2 className="text-3xl font-bold mb-4">Plugins</h2>
                  <p className="text-gray-600 mb-8">Extend your bot's functionality with powerful plugins and integrations</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        </div>
                        <h3 className="text-lg font-semibold">API Connector</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Connect to external APIs and services</p>
                      <Button className="w-full">Install</Button>
                    </div>
                    
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><path d="M10 18H5c-1.7 0-3-1.3-3-3v-1"/><polyline points="7 21 10 18 7 15"/><rect width="8" height="8" x="14" y="14" rx="2"/></svg>
                        </div>
                        <h3 className="text-lg font-semibold">Data Formatter</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Transform and format data for your bot</p>
                      <Button className="w-full">Install</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="style" className="p-6">
                  <h2 className="text-3xl font-bold mb-4">Bot Styling</h2>
                  
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-2">Avatar & Name</h3>
                    <p className="text-gray-600 mb-6">Customize your bot's appearance</p>
                    
                    <div className="flex flex-col items-center mb-8">
                      <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-white mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-xs flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        <p className="text-gray-500 text-sm mb-4">Upload avatar image</p>
                        <Button variant="outline" size="sm">Select Image</Button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block font-medium mb-2">Bot Name</label>
                      <Input placeholder="AI Assistant" defaultValue="AI Assistant" className="max-w-sm" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
