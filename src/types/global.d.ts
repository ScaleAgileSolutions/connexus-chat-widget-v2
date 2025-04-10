export {};

declare global {
  interface Window {
    connexVRepConfig?: {
      sourceId: string;
      agentId: string;
      agentName: string;
    };
  }
}