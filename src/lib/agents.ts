
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
  return JSON.parse(agentsJson);
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
