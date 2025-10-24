"use client";

import React from 'react';
import { Zap, MessageSquareText, Brain, Volume2, Monitor, Video, Settings, Link, Smartphone, PhoneCall } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ title, description, Icon, index }) => {
  return (
    <div className="text-white rounded-xl p-0 flex flex-col h-full transition-shadow duration-300 border-t border-gray-800 pt-8">
      <h3 className="text-xl font-medium mb-4">
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
  // Importando PhoneCall para o novo item
  const solutions = [
    {
      title: "Fala para Texto",
      description: "Converter fala para texto é um processo complexo se considerarmos sotaques e o reconhecimento dinâmico de diferentes idiomas. Multiplique por 20 a complexidade: quando se trata de conversão em tempo-real.",
      Icon: MessageSquareText,
    },
    {
      title: "Raciocínio Avançado",
      description: "O acesso facilitado a modelos avançados é uma realidade inegável. O problema é a possibilidade de altos volumes de conhecimento específico sem aumentar a chance de alucinações, além da latência.",
      Icon: Brain,
    },
    {
      title: "Texto para Fala",
      description: "Existem centenas de ferramentas de conversão disponíveis, mas poucas oferecem a geração em tempo-real com latência ultra-baixa, com naturalidade e nuances humanas, por um custo viável.",
      Icon: Volume2,
    },
    {
      title: "Compartilhamento de Tela",
      description: "Oferecemos dois módulos de captura da tela do usuário em tempo-real. o primeiro módulo captura uma imagem da tela e o segundo, extrai o código da tela, permitindo interações mais precisas.",
      Icon: Monitor,
    },
    {
      title: "Compartilhamento de Vídeo",
      description: "Soluções que exigem a ingestão de vídeo, capturados através da cãmera do usuário em tempo-real, processados de acordo com a sua demanda.",
      Icon: Video,
    },
    {
      title: "Integrações",
      description: "Integramos com os principais CRM´s do mercado, além de serviços de agendamento, e-mail sistemas customizados, serviços de consulta e navegação na web. Um oceano de possibilidades.",
      Icon: Link,
    },
    {
      title: "UI Generativa",
      description: "A inovação da interface de usuário gerada por inteligência artificial, para aplicações que exigem alta flexibilidade de adaptação ao contexto, baseado nas particularidades do seu negócio.",
      Icon: Zap,
    },
    {
      title: "APPs Mobile",
      description: "Embarcamos nossa tecnologia em APPs Mobile para que seus usuários recebam o que existe de melhor em serviços cognitivos em tempo-real.",
      Icon: Smartphone,
    },
    {
      title: "Ligações por Whatsapp",
      description: "No Brasil, 77% das ligações acontecem via Whatsapp. Por isso, criamos a integração para democratizar o acesso aos seus serviços com a menor fricção possível.",
      Icon: PhoneCall,
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
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 mt-16 pb-16 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};