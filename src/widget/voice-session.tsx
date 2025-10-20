"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { LiveKitRoom, useRoomContext, RoomAudioRenderer, useDataChannel } from '@livekit-components-react';
import { RoomEvent, Track } from 'livekit-client';
import Image from 'next/image';
import { cn } from './lib/utils';
import { Mic, Volume2, Phone, MessageSquare, ArrowUp, Minus } from 'lucide-react';
import { usePersistentUserId } from './hooks/use-persistent-user-id';
import { scrollToSection } from './lib/navigation';
import type { VoiceSessionProps } from './types';

// --- Tipos e Interfaces ---
interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
}

// --- Componentes de UI Internos ---

const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Action Buttons Component ---
interface ActionButtonsProps {
  isChatWindowOpen: boolean;
  isVoiceActive: boolean;
  onToggleChatWindow: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isChatWindowOpen, isVoiceActive, onToggleChatWindow }) => {
  const room = useRoomContext();
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  const handleMicToggle = useCallback(async () => {
    if (!isVoiceActive) return;
    const newMicState = !isMicEnabled;
    await room.localParticipant.setMicrophoneEnabled(newMicState);
    setIsMicEnabled(newMicState);
  }, [isVoiceActive, isMicEnabled, room]);

  useEffect(() => {
    // Sincroniza o estado do microfone quando a voz é ativada
    if (isVoiceActive) {
      setIsMicEnabled(true);
    }
  }, [isVoiceActive]);

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
      {isVoiceActive && (
        <button onClick={handleMicToggle} className={cn('av-microphone-button w-12 h-12 rounded-full border transition-colors flex items-center justify-center', isMicEnabled ? 'bg-accent hover:bg-accent/90 text-black border-black' : 'bg-black border-gray-700 text-white hover:bg-gray-800')} aria-label={isMicEnabled ? 'Desativar microfone' : 'Ativar microfone'}>
          <Mic className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

// --- Chat Window Component ---
interface ChatWindowProps {
  onClose: () => void;
  isVoiceActive: boolean;
  chatMessages: ChatMessage[];
  onSendTextMessage: (text: string) => void;
  onActivateVoice: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, isVoiceActive, chatMessages, onSendTextMessage, onActivateVoice }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      onSendTextMessage(inputMessage);
      setInputMessage('');
    }
  }, [inputMessage, onSendTextMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
          {chatMessages.map((msg, index) => (
            <div key={index} className={cn("w-full flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn(
                "av-message-bubble p-3 rounded-xl max-w-[85%] text-sm",
                msg.sender === 'user'
                  ? 'bg-gray-800 text-white rounded-br-none'
                  : 'bg-accent text-black rounded-tl-none'
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {!isVoiceActive && (
          <div className="p-2 mt-auto border-t border-gray-800">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
              <input type="text" placeholder="Digite sua mensagem..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className="flex-1 min-w-0 px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-700" />
              <button type="submit" disabled={inputMessage.trim() === ''} className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", inputMessage.trim() === '' ? 'bg-transparent text-gray-500 cursor-not-allowed' : 'bg-transparent text-white hover:text-accent')} aria-label="Enviar mensagem">
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" onClick={onActivateVoice} className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent text-white hover:text-accent transition-colors" aria-label="Ativar voz">
                <Mic className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Componente de UI que usa os hooks do LiveKit ---
interface VoiceSessionUIProps {
  onConnectionStatusChange: (status: 'connected') => void;
}

const VoiceSessionUI: React.FC<VoiceSessionUIProps> = ({ onConnectionStatusChange }) => {
  const room = useRoomContext();
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // --- RPC e Lógica de Comunicação ---

  useEffect(() => {
    const rpcHandler = (payload: Uint8Array) => {
      const data = JSON.parse(new TextDecoder().decode(payload));
      const agentMessage: ChatMessage = { sender: 'agent', text: data.text };
      setChatMessages((prev) => [...prev, agentMessage]);
    };

    const setupRpc = () => {
      room.localParticipant.registerRpcHandler('client.display_message', rpcHandler);
    };

    // Se já estiver conectado quando o componente montar, configure o RPC imediatamente.
    if (room.state === 'connected') {
      setupRpc();
    }

    // Ouça o evento de conexão para configurar o RPC assim que estiver pronto.
    room.on(RoomEvent.Connected, setupRpc);

    return () => {
      room.off(RoomEvent.Connected, setupRpc);
      // Garante que o handler seja removido se o participante local existir
      room.localParticipant?.unregisterRpcHandler('client.display_message');
    };
  }, [room, setChatMessages]);

  const handleSendTextMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = { sender: 'user', text };
    setChatMessages((prev) => [...prev, userMessage]);

    const payload = new TextEncoder().encode(JSON.stringify({ text }));
    await room.localParticipant.performRpc('agent.handle_text_message', payload);
  }, [room]);

  const handleActivateVoice = useCallback(async () => {
    await room.localParticipant.setMicrophoneEnabled(true);
    setIsVoiceActive(true);

    const payload = new TextEncoder().encode(JSON.stringify({}));
    await room.localParticipant.performRpc('agent.activate_voice', payload);
  }, [room]);

  // --- Hooks de Navegação e Conexão ---

  useDataChannel('navigation_command', (msg) => {
    try {
      const data = JSON.parse(new TextDecoder().decode(msg.payload));
      if (data.navigateTo) {
        scrollToSection(data.navigateTo);
      }
    } catch (e) { /* Ignora erros silenciosamente */ }
  });

  useEffect(() => {
    onConnectionStatusChange('connected');
  }, [onConnectionStatusChange]);

  const handleToggleChatWindow = useCallback(() => {
    setIsChatWindowOpen(prev => !prev);
  }, []);

  return (
    <>
      {isVoiceActive && <RoomAudioRenderer />}
      <ActionButtons isChatWindowOpen={isChatWindowOpen} isVoiceActive={isVoiceActive} onToggleChatWindow={handleToggleChatWindow} />
      {isChatWindowOpen && (
        <ChatWindow
          onClose={handleToggleChatWindow}
          isVoiceActive={isVoiceActive}
          chatMessages={chatMessages}
          onSendTextMessage={handleSendTextMessage}
          onActivateVoice={handleActivateVoice}
        />
      )}
    </>
  );
};

// --- Componente Principal da Sessão ---
const VoiceSession: React.FC<VoiceSessionProps> = ({ onConnectionStatusChange, tokenApiUrl, solution, clientId }) => {
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
          body: JSON.stringify({ solution, clientId, userId }),
        });
        if (!response.ok) throw new Error('Failed to fetch token');
        const data = await response.json();
        setToken(data.token);
        setWsUrl(data.ws_url);
      } catch (error) {
        onConnectionStatusChange('error');
      }
    };
    fetchToken();
  }, [userId, onConnectionStatusChange, tokenApiUrl, solution, clientId]);

  if (!token || !wsUrl) return null;

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={true}
      audio={true} // Conecta com a capacidade de áudio
      connectOptions={{
        // Mas não publica a faixa de áudio imediatamente
        publishOnly: 'none',
      }}
    >
      <VoiceSessionUI onConnectionStatusChange={onConnectionStatusChange} />
    </LiveKitRoom>
  );
};

export default VoiceSession;