
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tool, GitFork, ArrowRight, If } from 'lucide-react';

const WorkflowPage = () => {
  return (
    <div className="flex-1 p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Workflow Configuration</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Tools Configuration Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tool className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Tools Configuration</h2>
            </div>
            
            <div className="flex items-center gap-4 mb-4 overflow-x-auto p-4 bg-gray-50 rounded-lg">
              <Tool className="w-12 h-12 text-gray-400" />
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <Tool className="w-12 h-12 text-gray-400" />
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <Tool className="w-12 h-12 text-gray-400" />
            </div>
            
            <p className="text-gray-600 mb-4">Configure how your tools should interact in sequence</p>
            
            <Button className="w-full">
              Configure Tools
            </Button>
          </CardContent>
        </Card>

        {/* Conversation Flow Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitFork className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold">Conversation Flow</h2>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg min-h-[120px]">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <If className="w-8 h-8 text-gray-400" />
                </div>
                <span className="text-sm text-gray-500 mt-2">Condition</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">Design your conversation logic with conditions</p>
            
            <Button className="w-full" variant="outline">
              Design Flow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowPage;
