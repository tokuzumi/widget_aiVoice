import type { ReceivedChatMessage } from '@livekit/components-react';
import type { TextStreamData } from '@/components/voice-session'; // Usaremos um tipo local para evitar dependência circular

/**
 * Converte um objeto de transcrição de voz do LiveKit para o formato de uma mensagem de chat.
 * Isso é crucial para unificar e ordenar cronologicamente as mensagens de texto e de voz.
 * @param transcription O objeto de dados da transcrição.
 * @returns Um objeto no formato ReceivedChatMessage.
 */
export function transcriptionToChatMessage(transcription: TextStreamData): ReceivedChatMessage {
  return {
    id: Math.random().toString(), // ID temporário para renderização
    timestamp: transcription.streamInfo.timestamp,
    message: transcription.text,
    from: transcription.participant,
  };
}