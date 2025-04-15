
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
