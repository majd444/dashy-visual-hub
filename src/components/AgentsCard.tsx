
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Bot } from 'lucide-react';
import { AgentCreationSheet } from './AgentCreationSheet';
import { getAgents, Agent } from '@/lib/agents';

export const AgentsCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  useEffect(() => {
    // Load agents when component mounts
    setAgents(getAgents());
    
    // Set up event listener for storage changes
    const handleStorageChange = () => {
      setAgents(getAgents());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for local updates
    window.addEventListener('agentsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('agentsUpdated', handleStorageChange);
    };
  }, []);
  
  // Refresh agents list when sheet closes
  const handleOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setSelectedAgent(null);
      setAgents(getAgents());
    }
  };

  const handleManageAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsSheetOpen(true);
  };
  
  return (
    <>
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="border-l-4 border-blue-500 pl-4 mb-6">
            <h2 className="text-xl font-semibold">Active agents</h2>
          </div>
          
          {agents.length > 0 ? (
            <div className="space-y-4">
              {agents.map(agent => (
                <div key={agent.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">{agent.name}</h3>
                      <p className="text-sm text-gray-500">Model: {agent.model}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleManageAgent(agent)}
                  >
                    Manage
                  </Button>
                </div>
              ))}
              
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 w-full justify-center mt-4"
                onClick={() => setIsSheetOpen(true)}
              >
                Create a new agent
                <Plus size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center py-16 flex-col text-center">
              <p className="text-gray-500 mb-6">
                There are no active scenarios in this organization.
              </p>
              
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                onClick={() => setIsSheetOpen(true)}
              >
                Create a new agent
                <Plus size={16} />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AgentCreationSheet 
        isOpen={isSheetOpen} 
        onOpenChange={handleOpenChange} 
        existingAgent={selectedAgent} 
      />
    </>
  );
};
