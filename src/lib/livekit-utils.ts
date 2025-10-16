import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ReceivedChatMessage } from '@livekit/components-react';
import type { TextStreamData } from '@/components/voice-session'; // Usaremos um tipo local para evitar dependência circular
import type { Participant } from 'livekit-client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converte um objeto de transcrição de voz do LiveKit para o formato de uma mensagem de chat.
 * Isso é crucial para unificar e ordenar cronologicamente as mensagens de texto e de voz.
 * @param transcription O objeto de dados da transcrição.
 * @param localIdentity A identidade do usuário local, usada para garantir que a mensagem seja marcada corretamente.
 * @returns Um objeto no formato ReceivedChatMessage.
 */
export function transcriptionToChatMessage(transcription: TextStreamData, localIdentity: string): ReceivedChatMessage {
  // O objeto Participant da transcrição pode estar incompleto.
  // Se a identidade do participante da transcrição for igual à identidade local,
  // criamos um objeto 'from' que garante que a identidade local esteja presente.
  
  const isLocal = transcription.participant.identity === localIdentity;

  // Criamos um objeto 'from' que simula um Participant completo o suficiente para a comparação de identidade.
  const fromParticipant: Partial<Participant> = {
    identity: transcription.participant.identity || localIdentity,
    isLocal: isLocal,
    // Adicionamos outras propriedades necessárias para evitar erros de tipagem, se houver.
    // Como ReceivedChatMessage espera um Participant, vamos garantir que o objeto tenha o mínimo necessário.
  };

  return {
    id: Math.random().toString(), // ID temporário para renderização
    timestamp: transcription.streamInfo.timestamp,
    message: transcription.text,
    // Usamos o objeto fromParticipant corrigido.
    from: fromParticipant as Participant, 
  };
}