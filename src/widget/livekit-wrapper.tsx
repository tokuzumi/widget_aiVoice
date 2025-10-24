"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Redefinindo o tipo de props localmente para evitar a importação direta do módulo 'voice-session'
interface VoiceSessionProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
  onEndSession: () => void;
  tokenApiUrl: string;
  solution: string;
  clientId: string;
  // Novas props
  isChatVisible: boolean;
  onToggleChatVisibility: (isVisible: boolean | ((prev: boolean) => boolean)) => void;
}

// Importa VoiceSession dinamicamente com SSR desativado
const DynamicVoiceSession = dynamic<VoiceSessionProps>(
  // Agora usamos mod.default para carregar a exportação padrão
  () => import('./voice-session').then((mod) => mod.default),
  { ssr: false }
);

interface LiveKitWrapperProps extends VoiceSessionProps {}

export const LiveKitWrapper: React.FC<LiveKitWrapperProps> = (props) => {
  // Renderiza o componente LiveKitSession apenas no cliente
  return <DynamicVoiceSession {...props} />;
};