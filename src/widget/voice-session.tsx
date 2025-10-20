"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { LiveKitRoom, useTracks, useTranscriptions, RoomAudioRenderer, useRoomContext, ReceivedChatMessage, useDataChannel } from '@livekit/components-react';
import { Track } from 'livekit-client';
import type { Participant } from 'livekit-client';
import Image from 'next/image';
import { cn } from './lib/utils';
import { Mic, Volume2, Phone, ArrowUp } from 'lucide-react';
import { usePersistentUserId } from './hooks/use-persistent-user-id';
import { transcriptionToChatMessage } from './lib/livekit-utils';
import { scrollToSection } from './lib/navigation';

// --- Tipos e Interfaces ---
export interface TextStreamData {
  text: string;
  streamInfo: {
    timestamp: number;
  };
  participantInfo: {
    identity: string;
  };
  participant?: Participant;
}

// NOVO: Tipo para unificar mensagens de texto e transcrições
type UnifiedMessage = ReceivedChatMessage & { type: 'chat' | 'transcription' };

export interface VoiceSessionProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
  tokenApiUrl: string;
  solution: string;
  clientId: string;
}

// --- Componentes de UI Internos ---

const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Action Buttons Component ---
interface ActionButtonsProps {
  isVoiceEnabled: boolean;
  onToggleVoice: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isVoiceEnabled, onToggleVoice }) => {
  return (
    <div className="av-action-buttons-container fixed bottom-[77px] right-4 z-[1001] flex flex-col gap-2 flex-shrink-0 w-12">
      <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Volume">
        <Volume2 className="h-5 w-5" />
      </button>
      <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Encerrar chamada">
        <Phone className="h-5 w-5" />
      </button>
      <button
        onClick={onToggleVoice}
        className={cn(
          'av-microphone-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center',
          isVoiceEnabled
            ? 'bg-accent hover:bg-accent/90 text-black border-black'
            : 'bg-black border-gray-700 text-white hover:bg-gray-800'
        )}
        aria-label={isVoiceEnabled ? 'Desativar voz' : 'Ativar voz'}
      >
        <Mic className="h-5 w-5" />
      </button>
    </div>
  );
};

// --- Chat Window Component ---
interface ChatWindowProps {
  messages: UnifiedMessage[];
  onSendMessage: (message: string) => void;
  isVoiceEnabled: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isVoiceEnabled }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const room = useRoomContext();

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  }, [inputMessage, onSendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cn("av-full-chat-container fixed bottom-[77px] z-[1001] flex flex-row gap-2 items-end h-[70vh]", "left-4 right-[72px] h-[50vh]", "lg:w-[400px] lg:right-[72px] lg:left-auto lg:h-[70vh]")}>
      <div className="flex-1 flex flex-col overflow-hidden p-2 bg-black border border-gray-700 rounded-xl shadow-2xl h-full">
        <div className="flex justify-between items-center p-2 border-b border-gray-800 mb-2">
          <div className="flex items-center gap-2">
            <Image src={AI_VOICE_LOGO_SRC} alt="Logo Thais" width={24} height={24} className="w-6 h-6" />
            <span className="text-sm font-semibold text-white">Thais</span>
          </div>
        </div>
        <div className="av-chat-messages-area flex-1 overflow-y-auto flex flex-col gap-2 p-2 av-custom-scrollbar">
          
          {messages.map((msg, index) => {
            const isLocalUser = msg.from?.identity === room.localParticipant.identity;

            return (
              <div key={index} className={cn("w-full flex", isLocalUser ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  "av-message-bubble p-3 rounded-xl max-w-[85%] text-sm",
                  isLocalUser
                    ? 'bg-gray-800 text-white rounded-br-none'
                    : 'bg-accent text-black rounded-tl-none'
                )}>
                  {msg.message}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
        <div className="p-2 mt-auto">
          <form onSubmit={handleFormSubmit} className="flex gap-2 items-center">
            <input type="text" placeholder="Digite sua mensagem..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 min-w-0 px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-700" />
            <button type="submit" disabled={inputMessage.trim() === '' || isVoiceEnabled} className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", (inputMessage.trim() === '' || isVoiceEnabled) ? 'bg-transparent text-gray-500 cursor-not-allowed' : 'bg-transparent text-white hover:text-accent')} aria-label="Enviar mensagem">
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Componente de UI que usa os hooks do LiveKit ---
interface VoiceSessionUIProps {
  onConnectionStatusChange: (status: 'connected') => void;
}

const VoiceSessionUI: React.FC<VoiceSessionUIProps> = ({ onConnectionStatusChange }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [chatMessages, setChatMessages] = useState<UnifiedMessage[]>([]);
  const room = useRoomContext();
  const transcriptions = useTranscriptions() as TextStreamData[];

  // ALTERADO: Combina mensagens de chat (estado local) e transcrições de voz
  const allMessages = useMemo(() => {
    const formattedTranscriptions: UnifiedMessage[] = transcriptions.map(t => ({
      ...transcriptionToChatMessage(t),
      type: 'transcription',
    }));
    
    const combined = [...chatMessages, ...formattedTranscriptions];
    combined.sort((a, b) => a.timestamp - b.timestamp);
    return combined;
  }, [chatMessages, transcriptions]);

  // NOVO: Manipulador para receber texto do agente via RPC
  useDataChannel('client.receive_text', (msg) => {
    try {
      const data = JSON.parse(new TextDecoder().decode(msg.payload));
      if (data.text) {
        const agentMessage: UnifiedMessage = {
          id: Math.random().toString(),
          timestamp: Date.now(),
          message: data.text,
          from: { identity: msg.from?.identity ?? 'agent', isLocal: false } as any,
          type: 'chat',
        };
        setChatMessages(prev => [...prev, agentMessage]);
      }
    } catch (e) {
      console.error("Erro ao processar RPC client.receive_text:", e);
    }
  });

  useEffect(() => {
    room.localParticipant.setMicrophoneEnabled(false);
  }, [room]);

  const handleVoiceToggle = useCallback(async () => {
    const nextVoiceState = !isVoiceEnabled;
    setIsVoiceEnabled(nextVoiceState);
    await room.localParticipant.setMicrophoneEnabled(nextVoiceState);
    const rpcMethod = nextVoiceState ? "agent.activate_voice" : "agent.deactivate_voice";
    try {
      await room.localParticipant.perform_rpc(rpcMethod, "{}");
      console.log(`RPC ${rpcMethod} enviado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao enviar RPC ${rpcMethod}:`, error);
    }
  }, [isVoiceEnabled, room]);

  // NOVO: Manipulador para enviar texto do usuário via RPC
  const handleSendMessage = useCallback(async (message: string) => {
    if (isVoiceEnabled) return; // Não envia texto se a voz estiver ativa

    const userMessage: UnifiedMessage = {
      id: Math.random().toString(),
      timestamp: Date.now(),
      message: message,
      from: room.localParticipant,
      type: 'chat',
    };
    setChatMessages(prev => [...prev, userMessage]);

    try {
      await room.localParticipant.perform_rpc("agent.send_text", JSON.stringify({ text: message }));
    } catch (error) {
      console.error("Erro ao enviar RPC agent.send_text:", error);
    }
  }, [isVoiceEnabled, room]);

  useDataChannel('navigation_command', (msg) => {
    try {
      const data = JSON.parse(new TextDecoder().decode(msg.payload));
      if (data.navigateTo) {
        scrollToSection(data.navigateTo);
      }
    } catch (e) {}
  });

  const tracks = useTracks([Track.Source.Unknown]);
  useEffect(() => {
    const remoteAudioTrack = tracks.find(
      (trackRef) => trackRef.publication.kind === Track.Kind.Audio && !trackRef.participant.isLocal
    );
    const remoteTranscription = transcriptions.find(
      (t) => t.participantInfo?.identity !== room.localParticipant.identity
    );
    if (remoteAudioTrack || remoteTranscription) {
      onConnectionStatusChange('connected');
    }
  }, [tracks, transcriptions, room.localParticipant.identity, onConnectionStatusChange]);

  return (
    <>
      <RoomAudioRenderer />
      <ActionButtons isVoiceEnabled={isVoiceEnabled} onToggleVoice={handleVoiceToggle} />
      <ChatWindow messages={allMessages} onSendMessage={handleSendMessage} isVoiceEnabled={isVoiceEnabled} />
    </>
  );
};

// --- Componente Principal da Sessão ---
export const VoiceSession: React.FC<VoiceSessionProps> = ({ onConnectionStatusChange, tokenApiUrl, solution, clientId }) => {
  const [token, setToken] = useState<string | null>(null);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const userId = usePersistentUserId();

  useEffect(() => {
    if (!userId) return;

    const fetchToken = async () => {
      onConnectionStatusChange('connecting');
      try {
        const response = await fetch(tokenApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            solution: solution,
            clientId: clientId,
            userId: userId,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }
        const data = await response.json();
        setToken(data.token);
        setWsUrl(data.ws_url);
      } catch (error) {
        onConnectionStatusChange('error');
      }
    };

    fetchToken();
  }, [userId, onConnectionStatusChange, tokenApiUrl, solution, clientId]);

  if (!token || !wsUrl) {
    return null;
  }

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={true}
      audio={true}
      options={{ localTranscription: { language: 'pt-BR' } }}
    >
      <VoiceSessionUI onConnectionStatusChange={onConnectionStatusChange} />
    </LiveKitRoom>
  );
};

export default VoiceSession;