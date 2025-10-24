"use client";

import React from 'react';
import { Zap, MessageSquareText, Brain, Volume2, Monitor, Video, Settings, Link, LayoutDashboard } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ title, description, Icon, index }) => {
  return (
    <div className="text-white rounded-xl p-0 flex flex-col h-full transition-shadow duration-300 border-t border-gray-800 pt-8">
      <h3 className="text-xl font-semibold mb-4">
        <span className="mr-2">{index + 1}.</span>
        {title}
      </h3>
      <p className="text-sm text-brand-gray leading-relaxed flex-grow mb-6">{description}</p>
      
      {/* Ícone reposicionado abaixo do parágrafo */}
      <div className="mt-auto flex items-center justify-start">
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
    </div>
  );
};

export const CustomSolutionsSection = () => {
  const solutions = [
    {
      title: "Conexões em Tempo-Real",
      description: "Utilizamos a infraestrutura LiveKit para garantir latência ultrabaixa e comunicação bidirecional instantânea, essencial para interações de voz naturais e fluidas.",
      Icon: Zap,
    },
    {
      title: "Fala para Texto",
      description: "Integração com modelos avançados de Speech-to-Text (STT) para transcrever a fala do usuário com alta precisão, mesmo em ambientes ruidosos ou com sotaques variados.",
      Icon: MessageSquareText,
    },
    {
      title: "Raciocínio Avançado",
      description: "Nossos agentes são equipados com LLMs de ponta, permitindo raciocínio complexo, manutenção de contexto e respostas contextuais que simulam a inteligência humana.",
      Icon: Brain,
    },
    {
      title: "Texto para Fala",
      description: "Implementação de Text-to-Speech (TTS) com vozes neurais que oferecem entonação e cadência naturais, eliminando a sonoridade robótica e aumentando o engajamento.",
      Icon: Volume2,
    },
    {
      title: "Compartilhamento de Tela",
      description: "Capacidade de o agente visualizar e interagir com a tela do usuário (com permissão), permitindo suporte visual e demonstrações guiadas em tempo real.",
      Icon: Monitor,
    },
    {
      title: "Compartilhamento de Vídeo",
      description: "Recursos para incorporar vídeo ao vivo na interação, seja para o agente mostrar um produto ou para o usuário compartilhar sua câmera (opcional).",
      Icon: Video,
    },
    {
      title: "Pós-Processamento",
      description: "Análise automática de cada interação para extrair insights, sentimentos, intenções e sumarizar o atendimento, alimentando o ciclo de aprendizado da IA.",
      Icon: Settings,
    },
    {
      title: "Integrações",
      description: "Conectamos o aiVoice aos seus sistemas existentes (CRM, ERP, bases de dados) via APIs, permitindo que a IA execute ações e acesse informações em tempo real.",
      Icon: Link,
    },
    {
      title: "Dashboard IA",
      description: "Um painel de controle completo para monitorar métricas de desempenho, gerenciar o conhecimento da IA e acessar o histórico detalhado de todas as conversas.",
      Icon: LayoutDashboard,
    },
  ];

  return (
    <section id="custom-solutions" className="content-section bg-black text-brand-gray relative items-start justify-start">
      {/* Wrapper para o título e parágrafo */}
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">customizações</p>
        <h2 className="section-title text-white">
          Soluções Customizadas
        </h2>
        <p className="section-paragraph text-brand-gray">
          Cada negócio tem desafios únicos. Por isso, construímos o aiVoice como uma plataforma modular, onde você escolhe exatamente quais recursos ativar. Nosso stack combina IA conversacional de última geração, análise preditiva de comportamento e integração nativa com suas ferramentas existentes. O resultado? Uma solução que se adapta ao seu fluxo de trabalho, não o contrário.
        </p>
      </div>

      {/* Grid de Cards 3x3 */}
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 mt-4 pb-16 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};