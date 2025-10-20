export interface VoiceSessionProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
  tokenApiUrl: string;
  solution: string;
  clientId: string;
}