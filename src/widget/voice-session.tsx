"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { LiveKitRoom, useChat, useTracks, useTranscriptions, RoomAudioRenderer, useRoomContext, ReceivedChatMessage, useDataChannel, useLocalParticipant, useRemoteParticipants } from '@livekit/components-react';
import { Track } from 'livekit-client';
import type { Participant, TrackPublication } from 'livekit-client';
import Image from 'next/image';
import { cn } from './lib/utils';
import { Volume2, MessageSquare, ArrowUp, Minus, Monitor, Video, Power, Mic } from 'lucide-react';
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

export interface VoiceSessionProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
  onEndSession: () => void; // Nova prop para encerrar a sessão
  tokenApiUrl: string;
  solution: string;
  clientId: string;
}

// --- Componentes de UI Internos ---

const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Action Buttons Component ---
interface ActionButtonsProps {
  isChatWindowOpen: boolean;
  onToggleChatWindow: () => void;
  isSessionActive: boolean; // Indica se a sessão está conectada/ativa
  onEndSession: () => void; // Função para encerrar a sessão
  // Novas props para controle de áudio
  isVoiceChatEnabled: boolean;
  onToggleVoiceChat: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  isChatWindowOpen, 
  onToggleChatWindow, 
  isSessionActive, 
  onEndSession,
  isVoiceChatEnabled,
  onToggleVoiceChat
}) => {

  return (
    <div className="av-action-buttons-container fixed bottom-[77px] right-4 z-[1001] flex flex-col gap-2 flex-shrink-0 w-12">
      
      {/* 1. Screen-Share (Desativado) */}
      <button 
        className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-gray-600 cursor-not-allowed flex items-center justify-center" 
        aria-label="Compartilhar tela (Indisponível)"
        disabled
      >
        <Monitor className="h-5 w-5" />
      </button>

      {/* 2. Chat por Vídeo (Desativado) */}
      <button 
        className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-gray-600 cursor-not-allowed flex items-center justify-center" 
        aria-label="Chat por vídeo (Indisponível)"
        disabled
      >
        <Video className="h-5 w-5" />
      </button>

      {/* 3. Chat de Voz (Volume2) */}
      <button 
        onClick={onToggleVoiceChat} 
        className={cn(
          'av-microphone-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center', 
          isVoiceChatEnabled 
            ? 'bg-accent hover:bg-accent/90 text-black border-black' 
            : 'bg-black border-gray-700 text-white hover:bg-gray-800'
        )} 
        aria-label={isVoiceChatEnabled ? 'Desativar Chat de Voz' : 'Ativar Chat de Voz'}
      >
        <Volume2 className="h-5 w-5" /> {/* Ícone Volume2 para representar voz/fala */}
      </button>

      {/* 4. Chat de Texto (Toggle da Janela) */}
      <button 
        onClick={onToggleChatWindow} 
        className={cn(
          'av-action-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center', 
          isChatWindowOpen 
            ? 'bg-accent hover:bg-accent/90 text-black border-black' 
            : 'bg-black border-gray-700 text-white hover:bg-gray-800'
        )} 
        aria-label={isChatWindowOpen ? 'Fechar Chat de Texto' : 'Abrir Chat de Texto'}
      >
        <MessageSquare className="h-5 w-5" />
      </button>

      {/* 5. Liga/Desliga (Encerrar Sessão) */}
      <button 
        onClick={onEndSession} 
        className={cn(
          'av-end-session-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center',
          isSessionActive
            ? 'bg-red-600 border-red-600 text-white hover:bg-red-700' // Ativo: Vermelho para desligar
            : 'bg-black border-gray-700 text-white hover:bg-gray-800' // Inativo/Desligando: Preto
        )} 
        aria-label={isSessionActive ? 'Encerrar Sessão' : 'Sessão Encerrada'}
      >
        <Power className="h-5 w-5 -ml-px" /> {/* Adicionado -ml-px para ajuste visual */}
      </button>
    </div>
  );
};

// --- Chat Window Component (Mantido inalterado) ---
interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { chatMessages, send } = useChat();
  const transcriptions = useTranscriptions() as TextStreamData[];
  const room = useRoomContext();

  const allMessages = useMemo(() => {
    const formattedTranscriptions: ReceivedChatMessage[] = transcriptions.map(t =>
      transcriptionToChatMessage(t)
    );
    
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
      {/* Aplicando o efeito glassmorphism aqui */}
      <div className="flex-1 flex flex-col overflow-hidden p-2 bg-black/70 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl h-full">
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
          
          {allMessages.map((msg, index) => {
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
  onConnectionStatusChange: (status: 'connected') => void;
  onEndSession: () => void;
  isSessionActive: boolean;
}

const VoiceSessionUI: React.FC<VoiceSessionUIProps> = ({ onConnectionStatusChange, onEndSession, isSessionActive }) => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  // Estado para controlar se o chat de voz está ativo (microfone e som)
  const [isVoiceChatEnabled, setIsVoiceChatEnabled] = useState(true);

  const handleToggleChatWindow = useCallback(() => {
    setIsChatWindowOpen(prev => !prev);
  }, []);

  const handleToggleVoiceChat = useCallback(() => {
    const nextState = !isVoiceChatEnabled;
    setIsVoiceChatEnabled(nextState);

    // 1. Controlar o microfone local (Input)
    const micTrack = localParticipant.getTrackPublication(Track.Source.Microphone);
    if (micTrack) {
      micTrack.setMuted(!nextState);
    }

    // 2. Controlar a reprodução de áudio remoto (Output)
    // Silencia/Dessilencia todos os tracks de áudio dos participantes remotos (o agente)
    remoteParticipants.forEach(p => {
      p.audioTracks.forEach(trackPub => {
        // O LiveKit usa `track.setSubscribed(false)` para parar de receber dados
        // e `track.setMuted(true)` para silenciar localmente.
        // Usaremos `track.setSubscribed` para garantir que o áudio não seja reproduzido.
        if (trackPub.track) {
          trackPub.track.setSubscribed(nextState);
        }
      });
    });

  }, [isVoiceChatEnabled, localParticipant, remoteParticipants]);

  // Hook para receber comandos de navegação (sempre habilitado)
  useDataChannel('navigation_command', (msg) => {
    try {
      const data = JSON.parse(new TextDecoder().decode(msg.payload));
      if (data.navigateTo) {
        scrollToSection(data.navigateTo);
      }
    } catch (e) {
      // Silenciosamente ignora erros de parsing em produção
    }
  });

  const tracks = useTracks([Track.Source.Unknown]);
  const transcriptions = useTranscriptions() as TextStreamData[];
  const room = useRoomContext();

  useEffect(() => {
    // Verifica se há um track de áudio remoto ou transcrição remota (do agente)
    const remoteAudioTrack = tracks.find(
      (trackRef) => trackRef.publication.kind === Track.Kind.Audio && !trackRef.participant.isLocal
    );
    const remoteTranscription = transcriptions.find(
      (t) => t.participantInfo?.identity !== room.localParticipant.identity
    );
    
    // Se a sessão está ativa e detectamos o agente, confirmamos a conexão
    if (isSessionActive && (remoteAudioTrack || remoteTranscription)) {
      onConnectionStatusChange('connected');
    }
  }, [tracks, transcriptions, room.localParticipant.identity, onConnectionStatusChange, isSessionActive]);

  return (
    <>
      <RoomAudioRenderer />
      <ActionButtons 
        isChatWindowOpen={isChatWindowOpen} 
        onToggleChatWindow={handleToggleChatWindow} 
        isSessionActive={isSessionActive}
        onEndSession={onEndSession}
        isVoiceChatEnabled={isVoiceChatEnabled}
        onToggleVoiceChat={handleToggleVoiceChat}
      />
      {isChatWindowOpen && <ChatWindow onClose={handleToggleChatWindow} />}
    </>
  );
};

// --- Componente Principal da Sessão ---
export const VoiceSession: React.FC<VoiceSessionProps> = ({ onConnectionStatusChange, onEndSession, tokenApiUrl, solution, clientId }) => {
  const [token, setToken] = useState<string | null>(null);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const userId = usePersistentUserId();

  const isSessionActive = !!token; // A sessão está ativa se temos um token

  const fetchToken = useCallback(async () => {
    if (!userId) return;

    setIsConnecting(true);
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
      // O status 'connected' será disparado pelo VoiceSessionUI quando o agente for detectado
    } catch (error) {
      onConnectionStatusChange('error');
      setToken(null);
      setWsUrl(null);
    } finally {
      setIsConnecting(false);
    }
  }, [userId, onConnectionStatusChange, tokenApiUrl, solution, clientId]);

  useEffect(() => {
    if (userId && !token && !isConnecting) {
      fetchToken();
    }
  }, [userId, token, isConnecting, fetchToken]);

  // Função para encerrar a sessão LiveKit
  const handleEndSession = useCallback(() => {
    setToken(null);
    setWsUrl(null);
    onEndSession(); // Notifica o widget pai para fechar a janela
  }, [onEndSession]);

  if (!token || !wsUrl) {
    // Se a sessão não está ativa, mas o widget está aberto (o que é gerenciado pelo componente pai),
    // o componente pai deve estar mostrando o status 'idle' ou 'connecting'.
    return null;
  }

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={true}
      audio={true}
      options={{ localTranscription: { language: 'pt-BR' } }}
      onDisconnected={handleEndSession} // Garante que se a conexão cair, o estado local é resetado
    >
      <VoiceSessionUI 
        onConnectionStatusChange={onConnectionStatusChange} 
        onEndSession={handleEndSession}
        isSessionActive={isSessionActive}
      />
    </LiveKitRoom>
  );
};

export default VoiceSession;