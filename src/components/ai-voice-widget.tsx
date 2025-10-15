"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Mic, Send, X, Volume2, Phone, MessageSquare, ArrowUp, Minus } from 'lucide-react';

// URL do logo para consistência com o projeto
const AI_VOICE_LOGO_SRC = "/widget_logo.png";

// --- Floating Button Component ---
interface FloatingButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ isOpen, onToggle }) => {
  // Texto em minúsculas conforme solicitado
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
      aria-label={isOpen ? "Fechar assistente de voz" : "Abrir assistente de voz"}
    >
      <div className="flex-shrink-0 p-1">
        <Image src={AI_VOICE_LOGO_SRC} alt="Logo do Widget" width={32} height={32} className="w-8 h-8" />
      </div>
      
      <div className="flex-grow overflow-hidden whitespace-nowrap">
        <div className="flex">
          {/* Alterado de font-medium para font-normal */}
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

// --- Chat Window Component ---
interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      // Placeholder for sending logic
      console.log('Mensagem enviada:', inputMessage);
      setInputMessage('');
    }
  }, [inputMessage]);

  const handleMicToggle = useCallback(() => {
    setIsMicEnabled(prev => !prev);
  }, []);

  // Dummy messages for display
  const messages = [
    { id: 1, text: "Olá! Sou a Thais, sua agente de voz. Como posso ajudar você hoje?", type: 'remote' },
    { id: 2, text: "Gostaria de saber mais sobre os planos de preços.", type: 'local' },
    { id: 3, text: "Claro! Temos três planos: Basic, Growth e Custom. Qual deles chamou mais sua atenção?", type: 'remote' },
    { id: 4, text: "O plano Growth parece interessante. Ele inclui integração com Google Agenda?", type: 'local' },
  ];

  useEffect(() => {
    // Scroll to bottom on initial load or message update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div 
      className={cn(
        // Ajustado de bottom-[77px] para bottom-[72px] para 0px de espaçamento
        "av-full-chat-container fixed bottom-[72px] right-4 z-[1001]",
        "flex flex-row gap-2 items-end w-[400px] h-[70vh]",
        // Mobile responsiveness
        "max-md:w-[calc(100vw-2rem)] max-md:h-[50vh] max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:right-auto"
      )}
    >
      {/* Chat Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden p-2 bg-black border border-gray-700 rounded-xl shadow-2xl h-full">
        
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b border-gray-800 mb-2">
            <div className="flex items-center gap-2">
                <Image src={AI_VOICE_LOGO_SRC} alt="Logo Thais" width={24} height={24} className="w-6 h-6" />
                <span className="text-sm font-semibold text-white">Thais</span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-full" aria-label="Minimizar chat">
                {/* Substituído X por Minus */}
                <Minus className="h-5 w-5" />
            </button>
        </div>

        {/* Messages Area */}
        <div className="av-chat-messages-area flex-1 overflow-y-auto flex flex-col gap-2 p-2 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "av-message-bubble p-3 rounded-xl max-w-[85%] text-sm",
                // Invertendo as cores das mensagens
                msg.type === 'remote' 
                  ? 'bg-accent text-black self-start rounded-tl-none' // Assistente: accent
                  : 'bg-gray-800 text-white self-end rounded-br-none' // Usuário: cinza escuro
              )}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-2 mt-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-gray-700"
            />
            <button 
              type="submit" 
              disabled={inputMessage.trim() === ''}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                inputMessage.trim() === '' 
                  ? 'bg-transparent text-gray-500 cursor-not-allowed' 
                  : 'bg-transparent text-white hover:text-accent'
              )}
              aria-label="Enviar mensagem"
            >
              {/* Ícone reduzido para h-4 w-4 */}
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Action Buttons Container */}
      <div className="av-action-buttons-container flex flex-col gap-2 flex-shrink-0 w-12">
        <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Ação 1">
          <Volume2 className="h-5 w-5" />
        </button>
        <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Ação 2">
          <Phone className="h-5 w-5" />
        </button>
        <button className="av-action-button w-12 h-12 rounded-full bg-black border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center" aria-label="Ação 3">
          <MessageSquare className="h-5 w-5" />
        </button>
        
        {/* Microphone Button */}
        <button 
          onClick={handleMicToggle}
          className={cn(
            "av-microphone-button w-12 h-12 rounded-full border border-gray-700 transition-colors flex items-center justify-center",
            isMicEnabled 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          )}
          aria-label={isMicEnabled ? 'Desativar microfone' : 'Ativar microfone'}
        >
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// --- Main Widget Component ---
export const AiVoiceWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div id="ai-voice-widget" className="fixed bottom-4 right-4 z-[1000] max-md:right-1/2 max-md:transform max-md:translate-x-1/2">
      {isOpen && <ChatWindow onClose={handleToggle} />}
      <FloatingButton isOpen={isOpen} onToggle={handleToggle} />
    </div>
  );
};