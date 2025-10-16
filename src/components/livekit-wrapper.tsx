"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { VoiceSession, VoiceSessionProps } from './voice-session';

// Importa VoiceSession dinamicamente com SSR desativado
const DynamicVoiceSession = dynamic<VoiceSessionProps>(
  () => import('./voice-session').then((mod) => mod.VoiceSession),
  { ssr: false }
);

interface LiveKitWrapperProps extends VoiceSessionProps {}

export const LiveKitWrapper: React.FC<LiveKitWrapperProps> = (props) => {
  // Renderiza o componente LiveKitSession apenas no cliente
  return <DynamicVoiceSession {...props} />;
};