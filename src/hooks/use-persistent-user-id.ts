"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'ai-voice-user-id';

export function usePersistentUserId(): string {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Garante que o código só rode no cliente
    if (typeof window !== 'undefined') {
      let storedUserId = localStorage.getItem(USER_ID_KEY);
      if (!storedUserId) {
        storedUserId = uuidv4();
        localStorage.setItem(USER_ID_KEY, storedUserId);
      }
      setUserId(storedUserId);
    }
  }, []);

  return userId;
}