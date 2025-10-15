"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { LiveKitSession } from './livekit-session';

// URL do logo para consistência com o projeto
const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Floating Button Component ---
interface FloatingButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ isOpen, onToggle }) => {
  const marqueeText = isOpen ? 'em atendimento...' : 'aguardando você...';

  return (
    <button
      id="floating-button"
      onClick={onToggle}
      className={cn(
        "w-64 h-14 bg-black text-brand-gray rounded-full shadow-xl",
        "flex items-center cursor-pointer px-4 gap-3 border border-gray-700",
        "transition-colors duration-200 hover:bg-gray-900",
      )}
      aria-label={isOpen ? "Fechar widget de voz" : "Abrir widget de voz"}
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

// --- Main Widget Component (Orchestrator) ---
export const AIVoice = () => {
  // Estado para controlar se a janela de chat está aberta e a sessão LiveKit ativa
  const [isJanelaAberta, setIsJanelaAberta] = useState(false);

  const handleToggleJanela = useCallback(() => {
    setIsJanelaAberta(prev => !prev);
  }, []);

  return (
    <>
      {/* 1. Floating Button (sempre visível) */}
      <div id="ai-voice-widget" className="fixed bottom-4 right-4 z-[1000] max-md:right-1/2 max-md:transform max-md:translate-x-1/2">
        <FloatingButton isOpen={isJanelaAberta} onToggle={handleToggleJanela} />
      </div>

      {/* 2. LiveKit Session (renderizado apenas se a janela estiver aberta) */}
      {isJanelaAberta && (
        <div 
          className={cn(
            "av-full-chat-container fixed bottom-[77px] z-[1001]",
            // Mobile (Padrão): Largura calculada entre left-4 e right-4
            "left-4 right-4 h-[50vh]",
            // Desktop (lg+): Largura fixa e alinhamento à direita
            "lg:w-[400px] lg:right-4 lg:left-auto lg:h-[70vh]"
          )}
        >
          {/* LiveKitSession gerencia a conexão e renderiza o conteúdo do chat */}
          <LiveKitSession onClose={handleToggleJanela} />
        </div>
      )}
    </>
  );
};