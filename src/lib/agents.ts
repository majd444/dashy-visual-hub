
export interface Agent {
  id: string;
  name: string;
  prompt: string;
  model: string;
  temperature: number;
  createdAt: Date;
}

// For demo purposes, we'll use localStorage to store agents
export const saveAgent = (agent: Agent): void => {
  const agents = getAgents();
  agents.push(agent);
  localStorage.setItem('agents', JSON.stringify(agents));
};

export const getAgents = (): Agent[] => {
  const agentsJson = localStorage.getItem('agents');
  if (!agentsJson) return [];
  
  // Parse and ensure createdAt is a Date object
  const agents = JSON.parse(agentsJson);
  return agents.map((agent: any) => ({
    ...agent,
    createdAt: new Date(agent.createdAt)
  }));
};

export const updateAgent = (updatedAgent: Agent): void => {
  const agents = getAgents();
  const index = agents.findIndex(agent => agent.id === updatedAgent.id);
  
  if (index !== -1) {
    agents[index] = updatedAgent;
    localStorage.setItem('agents', JSON.stringify(agents));
  }
};

export const getAgentById = (id: string): Agent | undefined => {
  const agents = getAgents();
  return agents.find(agent => agent.id === id);
};

export const deleteAgent = (id: string): void => {
  const agents = getAgents();
  const filteredAgents = agents.filter(agent => agent.id !== id);
  localStorage.setItem('agents', JSON.stringify(filteredAgents));
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event('agentsUpdated'));
};
