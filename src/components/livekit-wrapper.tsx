"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Redefinindo o tipo de props localmente para evitar a importação direta do módulo 'voice-session'
interface VoiceSessionProps {
  onConnectionStatusChange: (status: 'connecting' | 'connected' | 'error') => void;
}

// Importa VoiceSession dinamicamente com SSR desativado
const DynamicVoiceSession = dynamic<VoiceSessionProps>(
  // Usamos o .then(mod => mod.VoiceSession) para acessar a exportação nomeada
  () => import('./voice-session').then((mod) => mod.VoiceSession),
  { ssr: false }
);

interface LiveKitWrapperProps extends VoiceSessionProps {}

export const LiveKitWrapper: React.FC<LiveKitWrapperProps> = (props) => {
  // Renderiza o componente LiveKitSession apenas no cliente
  return <DynamicVoiceSession {...props} />;
};