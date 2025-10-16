"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { LiveKitRoom, useChat, useTracks, useTranscriptions, RoomAudioRenderer, useRemoteParticipants } from '@livekit/components-react';
import { Track } from 'livekit-client';
import type { Participant, TrackPublication } from 'livekit-client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Mic, Volume2, Phone, MessageSquare, ArrowUp, Minus } from 'lucide-react';
import { usePersistentUserId } from '@/hooks/use-persistent-user-id';
import { transcriptionToChatMessage } from '@/lib/livekit-utils';

// --- Tipos e Interfaces ---
export interface TextStreamData {
  text: string;
  streamInfo: {
    timestamp: number;
  };
  participant: Participant;
}

export interface VoiceSessionProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
}

// --- Componentes de UI Internos (movidos para cá para manter o escopo) ---

const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Action Buttons Component ---
interface ActionButtonsProps {
  isChatWindowOpen: boolean;
  onToggleChatWindow: () => void;
  onConnectionStatusChange: (status: 'connected' | 'disconnected') => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isChatWindowOpen, onToggleChatWindow }) => {
  const [isMicEnabled, setIsMicEnabled] = useState(true); // Microfone ativo por padrão

  const handleMicToggle = useCallback(() => {
    setIsMicEnabled(prev => !prev);
    // Lógica para mutar/desmutar o microfone via LiveKit context virá aqui
  }, []);

  return (
    <div className="av-action-buttons-container fixed bottom-[77px] right-4 z-[1001] flex flex-col gap-2 flex-shrink-0 w-12">
      <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Volume">
        <Volume2 className="h-5 w-5" />
      </button>
      <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Encerrar chamada">
        <Phone className="h-5 w-5" />
      </button>
      <button onClick={onToggleChatWindow} className={cn('av-action-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center', isChatWindowOpen ? 'bg-accent hover:bg-accent/90 text-black border-black' : 'bg-black border-gray-700 text-white hover:bg-gray-800')} aria-label={isChatWindowOpen ? 'Fechar chat' : 'Abrir chat'}>
        <MessageSquare className="h-5 w-5" />
      </button>
      <button onClick={handleMicToggle} className={cn('av-microphone-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center', isMicEnabled ? 'bg-accent hover:bg-accent/90 text-black border-black' : 'bg-black border-gray-700 text-white hover:bg-gray-800')} aria-label={isMicEnabled ? 'Desativar microfone' : 'Ativar microfone'}>
        <Mic className="h-5 w-5" />
      </button>
    </div>
  );
};

// --- Chat Window Component ---
interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { chatMessages, send } = useChat();
  const transcriptions = useTranscriptions() as TextStreamData[];

  const allMessages = useMemo(() => {
    const formattedTranscriptions = transcriptions.map(transcriptionToChatMessage);
    const combined = [...chatMessages, ...formattedTranscriptions];
    combined.sort((a, b) => a.timestamp - b.timestamp);
    return combined;
  }, [chatMessages, transcriptions]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '' && send) {
      send(inputMessage);
      setInputMessage('');
    }
  }, [inputMessage, send]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <div className={cn("av-full-chat-container fixed bottom-[77px] z-[1001] flex flex-row gap-2 items-end h-[70vh]", "left-4 right-[72px] h-[50vh]", "lg:w-[400px] lg:right-[72px] lg:left-auto lg:h-[70vh]")}>
      <div className="flex-1 flex flex-col overflow-hidden p-2 bg-black border border-gray-700 rounded-xl shadow-2xl h-full">
        <div className="flex justify-between items-center p-2 border-b border-gray-800 mb-2">
          <div className="flex items-center gap-2">
            <Image src={AI_VOICE_LOGO_SRC} alt="Logo Thais" width={24} height={24} className="w-6 h-6" />
            <span className="text-sm font-semibold text-white">Thais</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-full" aria-label="Minimizar chat">
            <Minus className="h-5 w-5" />
          </button>
        </div>
        <div className="av-chat-messages-area flex-1 overflow-y-auto flex flex-col gap-2 p-2 av-custom-scrollbar">
          {allMessages.map((msg, index) => (
            <div key={index} className={cn("av-message-bubble p-3 rounded-xl max-w-[85%] text-sm", msg.from?.isLocal ? 'bg-gray-800 text-white self-end rounded-br-none' : 'bg-accent text-black self-start rounded-tl-none')}>
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-2 mt-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
            <input type="text" placeholder="Digite sua mensagem..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 min-w-0 px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-700" />
            <button type="submit" disabled={inputMessage.trim() === ''} className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", inputMessage.trim() === '' ? 'bg-transparent text-gray-500 cursor-not-allowed' : 'bg-transparent text-white hover:text-accent')} aria-label="Enviar mensagem">
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
  onConnectionStatusChange: (status: 'connected' | 'disconnected') => void;
}

const VoiceSessionUI: React.FC<VoiceSessionUIProps> = ({ onConnectionStatusChange }) => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true); // Aberto por padrão
  // Não precisamos mais de useRemoteParticipants ou useTracks aqui, pois RoomAudioRenderer faz o trabalho.

  const handleToggleChatWindow = useCallback(() => {
    setIsChatWindowOpen(prev => !prev);
  }, []);

  // Hook para detectar o primeiro áudio do agente e mudar o status do widget
  // Mantemos o useTracks para o status de conexão, mas simplificamos a lógica.
  const tracks = useTracks([Track.Source.Unknown]);
  useEffect(() => {
    const remoteAudioTrack = tracks.find(
      (trackRef: { publication: TrackPublication; participant: { isLocal: any; }; }) =>
        trackRef.publication.kind === Track.Kind.Audio && !trackRef.participant.isLocal
    );
    if (remoteAudioTrack) {
      onConnectionStatusChange('connected');
    }
  }, [tracks, onConnectionStatusChange]);

  return (
    <>
      {/* Adicionando RoomAudioRenderer para gerenciar a reprodução de áudio remoto */}
      <RoomAudioRenderer />
      
      <ActionButtons isChatWindowOpen={isChatWindowOpen} onToggleChatWindow={handleToggleChatWindow} onConnectionStatusChange={onConnectionStatusChange} />
      {isChatWindowOpen && <ChatWindow onClose={handleToggleChatWindow} />}
    </>
  );
};


// --- Componente Principal da Sessão ---
export const VoiceSession: React.FC<VoiceSessionProps> = ({ onConnectionStatusChange }) => {
  const [token, setToken] = useState<string | null>(null);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const userId = usePersistentUserId();

  useEffect(() => {
    if (!userId) return;

    const fetchToken = async () => {
      onConnectionStatusChange('connecting');
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_TOKEN_API_URL!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            solution: process.env.NEXT_PUBLIC_SOLUTION,
            clientId: process.env.NEXT_PUBLIC_CLIENTID,
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
        console.error("Error getting LiveKit token:", error);
        onConnectionStatusChange('error');
      }
    };

    fetchToken();
  }, [userId, onConnectionStatusChange]);

  if (!token || !wsUrl) {
    return null; // O estado de "Conectando..." é gerenciado pelo orquestrador
  }

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={true}
      audio={true}
      // Ativa a transcrição para o participante local
      options={{ localTranscription: { language: 'pt-BR' } }}
    >
      <VoiceSessionUI onConnectionStatusChange={(status) => status === 'connected' && onConnectionStatusChange('connected')} />
    </LiveKitRoom>
  );
};

export default VoiceSession;