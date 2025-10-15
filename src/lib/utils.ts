import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Obtém um ID de cliente persistente do localStorage ou gera um novo.
 * @returns O ID do cliente.
 */
export function getOrCreateClientId(): string {
  if (typeof window === 'undefined') {
    return 'server-side-client';
  }
  
  let clientId = localStorage.getItem('aiVoiceClientId');
  if (!clientId) {
    // Gera um ID único simples
    clientId = `client-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('aiVoiceClientId', clientId);
  }
  return clientId;
}