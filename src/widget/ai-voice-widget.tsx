"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from './lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { LiveKitWrapper } from './livekit-wrapper';
import './widget.css';

const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Floating Button Component ---
interface FloatingButtonProps {
  connectionStatus: 'idle' | 'connecting' | 'connected' | 'error';
  onToggle: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ connectionStatus, onToggle }) => {
  const getMarqueeText = () => {
    switch (connectionStatus) {
      case 'connecting':
        return 'conectando...';
      case 'connected':
        return 'em atendimento...';
      case 'error':
        return 'erro de conexão...';
      case 'idle':
      default:
        return 'aguardando você...';
    }
  };

  const marqueeText = getMarqueeText();

  return (
    <button
      id="floating-button"
      onClick={onToggle}
      className={cn(
        "w-64 h-14 bg-black text-brand-gray rounded-full shadow-xl",
        "flex items-center cursor-pointer px-4 gap-3 border border-gray-700",
        "transition-colors duration-200 hover:bg-gray-900",
      )}
      aria-label={connectionStatus === 'idle' ? "Iniciar atendimento" : "Sessão ativa"}
    >
      <div className="flex-shrink-0 p-1">
        <Image src={AI_VOICE_LOGO_SRC} alt="Logo do Widget" width={32} height={32} className="w-8 h-8" />
      </div>
      
      <div className="flex-grow overflow-hidden whitespace-nowrap">
        <div className="flex">
          <span className="av-animate-marquee text-xs font-normal tracking-wider text-white">
            {marqueeText}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{marqueeText}&nbsp;&nbsp;&bull;&nbsp;&nbsp;
          </span>
          <span className="av-animate-marquee text-xs font-normal tracking-wider text-white" aria-hidden="true">
            {marqueeText}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{marqueeText}&nbsp;&nbsp;&bull;&nbsp;&nbsp;
          </span>
        </div>
      </div>
      
      <div className="flex-shrink-0 text-white">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </button>
  );
};

// --- Main Widget Orchestrator ---
interface AiVoiceWidgetProps {
  tokenApiUrl: string;
  solution: string;
  clientId: string;
}

export const AiVoiceWidget: React.FC<AiVoiceWidgetProps> = ({ tokenApiUrl, solution, clientId }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado da sessão LiveKit (Ativa/Inativa)
  const [isChatVisible, setIsChatVisible] = useState(false); // Estado da visibilidade da janela de chat
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  const handleEndSession = useCallback(() => {
    setIsOpen(false);
    setIsChatVisible(false);
    setConnectionStatus('idle');
  }, []);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      // Se a sessão está inativa, inicia a sessão e abre o chat
      setIsOpen(true);
      setIsChatVisible(true);
    } else {
      // Se a sessão está ativa, o clique no botão flutuante não faz nada.
      // O encerramento é feito apenas pelo botão Power.
      return;
    }
  }, [isOpen]);

  const handleConnectionStatusChange = useCallback((status: 'connecting' | 'connected' | 'error') => {
    setConnectionStatus(status);
  }, []);

  return (
    <>
      <div id="ai-voice-widget" className="fixed bottom-4 right-4 z-[1000] max-md:right-1/2 max-md:transform max-md:translate-x-1/2">
        <FloatingButton connectionStatus={isOpen ? connectionStatus : 'idle'} onToggle={handleToggle} />
      </div>

      {isOpen && (
        <LiveKitWrapper
          onConnectionStatusChange={handleConnectionStatusChange}
          onEndSession={handleEndSession} // Passa a função de encerramento
          tokenApiUrl={tokenApiUrl}
          solution={solution}
          clientId={clientId}
          
          // Props para controle de visibilidade
          isChatVisible={isChatVisible}
          onToggleChatVisibility={setIsChatVisible}
        />
      )}
    </>
  );
};