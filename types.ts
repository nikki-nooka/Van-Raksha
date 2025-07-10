export interface AnalysisResult {
  threatName: string;
  confidence: 'High' | 'Medium' | 'Low';
  description: string;
  causes: string;
  predictedImpact: string;
  precautions: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}
