"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import { getOrCreateClientId } from '@/lib/utils';
import { ChatWindowContent } from './chat-window-content';
import { toast } from 'sonner';

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
    // O componente LiveKitRoom se desconecta automaticamente quando é desmontado (unmount)
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
      // onDisconnected removido para evitar conflito com o ciclo de vida do React
    >
      {/* O conteúdo real da janela de chat, que usará os hooks do LiveKit */}
      <ChatWindowContent onClose={onClose} />
    </LiveKitRoom>
  );
};