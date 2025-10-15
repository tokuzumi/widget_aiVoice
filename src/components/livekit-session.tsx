"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { LiveKitRoom, useLocalParticipant, useRoomContext } from '@livekit/components-react';
import { getOrCreateClientId } from '@/lib/utils';
import { ChatWindowContent } from './chat-window-content';
import { toast } from 'sonner';
import { ActionButtons } from './ai-voice'; // Importando ActionButtons do componente pai

interface LiveKitSessionProps {
  onClose: () => void;
}

// Define a estrutura de resposta esperada da API de token
interface TokenResponse {
  token: string;
  ws_url: string;
}

export const LiveKitSession: React.FC<LiveKitSessionProps> = ({ onClose }) => {
  const [connectionDetails, setConnectionDetails] = useState<{ token: string; wsUrl: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenApiUrl = process.env.NEXT_PUBLIC_TOKEN_API_URL;

  const fetchToken = useCallback(async () => {
    if (!tokenApiUrl) {
      setError("NEXT_PUBLIC_TOKEN_API_URL não está configurada.");
      setIsLoading(false);
      toast.error("Erro de configuração: URL da API de token não encontrada.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const userId = getOrCreateClientId();
    const roomName = "aiVoice-hostess-room"; // Nome fixo da sala

    try {
      const response = await fetch(tokenApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution: "hostess",
          clientId: "aiVoice",
          userId: userId,
          roomName: roomName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Falha ao obter token: ${response.status}`);
      }

      const data: TokenResponse = await response.json();
      setConnectionDetails({ token: data.token, wsUrl: data.ws_url });
      toast.success("Conexão de voz estabelecida com sucesso!");
    } catch (err) {
      console.error("LiveKit Token Fetch Error:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido ao conectar.");
      onClose(); // Fecha a janela em caso de erro de erro de token/conexão inicial
    } finally {
      setIsLoading(false);
    }
  }, [tokenApiUrl, onClose]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full text-white bg-black border border-gray-700 rounded-xl shadow-2xl">
            Conectando ao Agente de Voz...
        </div>
    );
  }

  if (error || !connectionDetails) {
    return null;
  }

  // Renderiza LiveKitRoom quando os detalhes de conexão estiverem prontos
  return (
    <LiveKitRoom
      token={connectionDetails.token}
      serverUrl={connectionDetails.wsUrl}
      connect={true}
      audio={true} // Habilita áudio por padrão
      video={false} // Desabilita vídeo
    >
      <LiveKitContent onClose={onClose} />
    </LiveKitRoom>
  );
};

// Componente interno para acessar os hooks do LiveKit
const LiveKitContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const localParticipant = useLocalParticipant();
  const room = useRoomContext();
  
  // Estado para o status do microfone local
  const [isMicEnabled, setIsMicEnabled] = useState(localParticipant?.isMicrophoneEnabled ?? false);

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

  return (
    <>
      {/* Janela de Chat (Ocupa 100% em mobile, 80% em desktop) */}
      <div className="flex-1 min-h-0 lg:w-[80%]">
        <ChatWindowContent onClose={onClose} isMicEnabled={isMicEnabled} />
      </div>
      
      {/* Botões de Ação (Ocultos em mobile, visíveis à direita em desktop) */}
      <div className="hidden lg:block lg:w-[20%]">
        <ActionButtons 
          isMicEnabled={isMicEnabled} 
          onMicToggle={handleMicToggle} 
          onClose={onClose} 
        />
      </div>
      
      {/* Botões de Ação (Visíveis em mobile, abaixo da janela de chat) */}
      <div className="lg:hidden w-full mt-4">
        <div className="flex justify-around p-2 border-t border-gray-800 bg-black rounded-xl">
          <ActionButtons 
            isMicEnabled={isMicEnabled} 
            onMicToggle={handleMicToggle} 
            onClose={onClose} 
          />
        </div>
      </div>
    </>
  );
};