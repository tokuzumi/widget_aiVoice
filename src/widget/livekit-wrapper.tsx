"use client";

import dynamic from 'next/dynamic';
import type { VoiceSessionProps } from './types';

// Importa dinamicamente o VoiceSession, garantindo que ele nunca seja incluído no build do servidor.
const VoiceSession = dynamic(
  () => import('./voice-session').then((mod) => mod.default),
  { ssr: false }
);

// Este wrapper atua como uma "barreira" segura para o componente principal do LiveKit.
export const LiveKitWrapper = (props: VoiceSessionProps) => {
  return <VoiceSession {...props} />;
};