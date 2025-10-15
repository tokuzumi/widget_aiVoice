"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowUp, Minus, Mic, Volume2, Phone } from 'lucide-react';
import { useChat, useTranscriptions, useLocalParticipant, useRoomContext } from '@livekit/components-react';
import { toast } from 'sonner';

// URL do logo para consistência com o projeto
const AI_VOICE_LOGO_SRC = "/widget_logo.png";

interface ChatWindowContentProps {
  onClose: () => void;
}

export const ChatWindowContent: React.FC<ChatWindowContentProps> = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // LiveKit Hooks
  const { chatMessages, send } = useChat();
  const transcriptions = useTranscriptions();
  const localParticipant = useLocalParticipant();
  const room = useRoomContext();

  // Estado para o status do microfone local, inicializado com o estado atual do participante
  const [isMicEnabled, setIsMicEnabled] = useState(localParticipant?.isMicrophoneEnabled ?? false);

  // Transcrição atual (o que o agente de IA está falando em tempo real)
  const latestTranscription = transcriptions.length > 0 ? transcriptions[transcriptions.length - 1] : null;
  let currentTranscriptionText = '';
  if (latestTranscription && !latestTranscription.isFinal) {
      currentTranscriptionText = latestTranscription.text;
  }
  
  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '' && send) {
      send(inputMessage.trim());
      setInputMessage('');
    }
  }, [inputMessage, send]);

  const handleMicToggle = useCallback(async () => {
    if (!room || !localParticipant) return;

    const newState = !isMicEnabled;
    try {
        await localParticipant.setMicrophoneEnabled(newState);
        setIsMicEnabled(newState);
        toast.info(newState ? "Microfone ativado." : "Microfone desativado.");
    } catch (e) {
        console.error("Falha ao controlar o microfone:", e);
        toast.error("Falha ao controlar o microfone.");
    }
  }, [isMicEnabled, room, localParticipant]);

  // Scroll para o final da conversa
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.length, currentTranscriptionText]);


  return (
    <div className="flex flex-col overflow-hidden p-4 bg-black border border-gray-700 rounded-xl shadow-2xl h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-800 mb-4">
          <div className="flex items-center gap-2">
              <Image src={AI_VOICE_LOGO_SRC} alt="Logo Thais" width={28} height={28} className="w-7 h-7" />
              <span className="text-base font-semibold text-white">Thais (Live)</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-full" aria-label="Minimizar chat">
              <Minus className="h-6 w-6" />
          </button>
      </div>

      {/* Messages Area */}
      <div className="av-chat-messages-area flex-1 overflow-y-auto flex flex-col gap-3 p-1 av-custom-scrollbar">
        {chatMessages.map((msg, index) => (
          <div 
            key={index} 
            className={cn(
              "av-message-bubble p-3 rounded-xl max-w-[85%] text-sm",
              msg.from.isLocal 
                ? 'bg-gray-800 text-white self-end rounded-br-lg'
                : 'bg-accent text-black self-start rounded-tl-lg'
            )}
          >
            {msg.message}
          </div>
        ))}
        
        {/* Exibe a transcrição em tempo real do agente de IA */}
        {currentTranscriptionText && (
            <div 
                className="av-message-bubble p-3 rounded-xl max-w-[85%] text-sm bg-accent text-black self-start rounded-tl-lg opacity-70 animate-pulse"
            >
                {currentTranscriptionText}
            </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="pt-4 mt-auto">
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 min-w-0 px-4 py-3 border border-gray-700 rounded-full bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-700"
          />
          <button 
            type="submit" 
            disabled={inputMessage.trim() === ''}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              inputMessage.trim() === '' 
                ? 'bg-transparent text-gray-500 cursor-not-allowed' 
                : 'bg-transparent text-white hover:text-accent'
            )}
            aria-label="Enviar mensagem"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </form>
      </div>
      
      {/* Action Buttons (Controles de Mídia) */}
      <div className="flex justify-around p-4 border-t border-gray-800 mt-4">
        {/* Botão de Volume (Placeholder) */}
        <button className="w-12 h-12 rounded-full bg-black border border-white text-white hover:bg-gray-900 transition-colors flex items-center justify-center" aria-label="Controle de volume">
          <Volume2 className="h-6 w-6" />
        </button>
        
        {/* Botão de Telefone (Placeholder) */}
        <button className="w-12 h-12 rounded-full bg-black border border-white text-white hover:bg-gray-900 transition-colors flex items-center justify-center" aria-label="Encerrar chamada">
          <Phone className="h-6 w-6" />
        </button>
        
        {/* Microphone Button (Accent quando ativo) */}
        <button 
          onClick={handleMicToggle}
          className={cn(
            "w-12 h-12 rounded-full border transition-colors flex items-center justify-center",
            isMicEnabled 
              ? 'bg-accent hover:bg-accent/90 text-black border-accent' // ATIVO: ACCENT + BORDER-ACCENT
              : 'bg-black border-white text-white hover:bg-gray-900' // Inativo: Padrão
          )}
          aria-label={isMicEnabled ? 'Desativar microfone' : 'Ativar microfone'}
        >
          <Mic className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};