"use client";

import { useState, useEffect } from 'react';

const USER_ID_KEY = 'ai-voice-user-id';

export function usePersistentUserId(): string {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Garante que o código só rode no cliente e que a API crypto está disponível
    if (typeof window !== 'undefined' && typeof crypto !== 'undefined') {
      let storedUserId = localStorage.getItem(USER_ID_KEY);
      if (!storedUserId) {
        // Usa a API nativa para gerar um UUID
        storedUserId = crypto.randomUUID();
        localStorage.setItem(USER_ID_KEY, storedUserId);
      }
      setUserId(storedUserId);
    }
  }, []);

  return userId;
}