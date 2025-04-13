
import React from 'react';
import { SearchBar } from './SearchBar';
import { PlanCard } from './PlanCard';
import { OperationsCard } from './OperationsCard';
import { AgentsCard } from './AgentsCard';

export const Dashboard = () => {
  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      <SearchBar />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PlanCard />
          <AgentsCard />
        </div>
        <div>
          <OperationsCard />
        </div>
      </div>
    </div>
  );
};
