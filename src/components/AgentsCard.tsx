
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from 'lucide-react';

export const AgentsCard = () => {
  const handleCreateAgent = () => {
    window.open('https://github.com/majd444/bot-builder-studio-alpha.git', '_blank');
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <h2 className="text-xl font-semibold">Active agents</h2>
        </div>
        
        <div className="flex items-center justify-center py-16 flex-col text-center">
          <p className="text-gray-500 mb-6">
            There are no active scenarios in this organization.
          </p>
          
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
            onClick={handleCreateAgent}
          >
            Create a new agent
            <Plus size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
