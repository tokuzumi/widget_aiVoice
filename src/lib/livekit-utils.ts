import type { ReceivedChatMessage } from '@livekit/components-react';
import type { TextStreamData } from '@/components/voice-session';

/**
 * Converte um objeto de transcrição de voz do LiveKit para o formato de uma mensagem de chat.
 * Isso é crucial para unificar e ordenar cronologicamente as mensagens de texto e de voz.
 * @param transcription O objeto de dados da transcrição.
 * @returns Um objeto no formato ReceivedChatMessage.
 */
export function transcriptionToChatMessage(transcription: TextStreamData): ReceivedChatMessage {
  // Usamos 'as any' para acessar participantInfo, que foi confirmado nos logs brutos
  const participantIdentity = (transcription as any).participantInfo?.identity;

  return {
    id: Math.random().toString(), // ID temporário para renderização
    timestamp: transcription.streamInfo.timestamp,
    message: transcription.text,
    // Injetamos a identidade no campo 'from' para que a lógica de comparação funcione
    from: {
      identity: participantIdentity,
      isLocal: false, // A flag isLocal será resolvida na renderização comparando a identidade
    } as any,
  };
}