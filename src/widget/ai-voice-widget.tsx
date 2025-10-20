"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from './lib/utils';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
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
      aria-label={connectionStatus === 'idle' ? "Iniciar atendimento" : "Encerrar atendimento"}
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

// Redefine props for dynamic import
interface VoiceSessionProps extends AiVoiceWidgetProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
}

// Dynamically import VoiceSession to ensure it's client-side only
const DynamicVoiceSession = dynamic<VoiceSessionProps>(
  () => import('./voice-session').then((mod) => mod.default),
  { ssr: false }
);

export const AiVoiceWidget: React.FC<AiVoiceWidgetProps> = ({ tokenApiUrl, solution, clientId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  const handleToggle = useCallback(() => {
    setIsOpen(prev => {
      const nextState = !prev;
      if (!nextState) {
        // Se está fechando, reseta o status
        setConnectionStatus('idle');
      }
      return nextState;
    });
  }, []);

  const handleConnectionStatusChange = useCallback((status: 'connecting' | 'connected' | 'error') => {
    setConnectionStatus(status);
  }, []);

  return (
    <>
      <div id="ai-voice-widget" className="fixed bottom-4 right-4 z-[1000] max-md:right-1/2 max-md:transform max-md:translate-x-1/2">
        <FloatingButton connectionStatus={isOpen ? connectionStatus : 'idle'} onToggle={handleToggle} />
      </div>

      {isOpen && (
        <DynamicVoiceSession
          onConnectionStatusChange={handleConnectionStatusChange}
          tokenApiUrl={tokenApiUrl}
          solution={solution}
          clientId={clientId}
        />
      )}
    </>
  );
};