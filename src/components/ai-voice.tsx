"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Mic, Volume2, Phone } from 'lucide-react';
import { LiveKitSession } from './livekit-session';
import { ChatWindowContent } from './chat-window-content'; // Importado para uso no layout

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

// --- Action Buttons Component (Recriado para o layout original) ---
interface ActionButtonsProps {
  isMicEnabled: boolean;
  onMicToggle: () => void;
  onClose: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isMicEnabled, onMicToggle, onClose }) => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-0 lg:ml-4">
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
        onClick={onMicToggle}
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

      {/* Botão de Fechar (Minimizar) - Adicionado para fechar a sessão */}
      <button 
        onClick={onClose}
        className="w-12 h-12 rounded-full bg-black border border-white text-white hover:bg-gray-900 transition-colors flex items-center justify-center mt-4"
        aria-label="Minimizar chat"
      >
        <ArrowUp className="h-6 w-6 rotate-90" /> {/* Usando ArrowUp rotacionado para simular o ícone de fechar/minimizar */}
      </button>
    </div>
  );
};


// --- Main Widget Component (Orchestrator) ---
export const AIVoice = () => {
  const [isJanelaAberta, setIsJanelaAberta] = useState(false);

  const handleToggleJanela = useCallback(() => {
    setIsJanelaAberta(prev => !prev);
  }, []);

  return (
    <>
      {/* 1. Floating Button (sempre visível) */}
      <div id="ai-voice-widget-button" className="fixed bottom-4 right-4 z-[1000] max-md:right-1/2 max-md:transform max-md:translate-x-1/2">
        <FloatingButton isOpen={isJanelaAberta} onToggle={handleToggleJanela} />
      </div>

      {/* 2. LiveKit Session (renderizado apenas se a janela estiver aberta) */}
      {isJanelaAberta && (
        <div 
          className={cn(
            "av-full-chat-container fixed bottom-[77px] z-[1001]",
            // Mobile: Ocupa a largura total, mas os botões de ação ficam abaixo da janela de chat
            "left-4 right-4 h-[70vh] flex flex-col",
            // Desktop (lg+): Layout de duas colunas (chat + botões)
            "lg:w-[500px] lg:right-4 lg:left-auto lg:h-[70vh] lg:flex-row lg:items-end"
          )}
        >
          {/* LiveKitSession encapsula a conexão e o conteúdo do chat */}
          <LiveKitSession onClose={handleToggleJanela} />
        </div>
      )}
    </>
  );
};