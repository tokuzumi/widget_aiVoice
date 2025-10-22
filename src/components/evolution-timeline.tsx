"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const evolutionStages = [
  {
    timelineLabel: "Sites com Formulários",
    impactText: "O Ponto de Partida",
    title: "A Era da Fricção",
    paragraph: "A primeira geração de sites focava em apresentar informações. A interação era limitada a formulários estáticos, criando uma barreira entre a empresa e o cliente, resultando em altas taxas de abandono e uma experiência unilateral."
  },
  {
    timelineLabel: "Smart Sites",
    impactText: "A Primeira Evolução",
    title: "A Chegada da Interatividade",
    paragraph: "Com a ascensão dos chatbots de texto, os sites se tornaram mais inteligentes e proativos. A automação permitiu respostas instantâneas, quebrando a barreira inicial e provando que a interatividade era o caminho para o engajamento."
  },
  {
    timelineLabel: "aiVoice",
    impactText: "O Salto Quântico",
    title: "A Conexão Humana em Escala",
    paragraph: "A voz elimina a última barreira: o teclado. Ao permitir uma comunicação natural e emocional, a aiVoice transforma a experiência do visitante, criando uma conexão autêntica que acelera a confiança e maximiza a conversão."
  }
];

export const EvolutionTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentElements = contentRef.current.children;
      gsap.fromTo(contentElements, 
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  const changeStage = (newIndex: number) => {
    if (newIndex === activeIndex || !contentRef.current) return;

    const contentElements = contentRef.current.children;
    gsap.to(contentElements, {
      autoAlpha: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex);
      }
    });
  };

  const handleNext = () => {
    changeStage((activeIndex + 1) % evolutionStages.length);
  };

  const handlePrev = () => {
    changeStage((activeIndex - 1 + evolutionStages.length) % evolutionStages.length);
  };

  const currentStage = evolutionStages[activeIndex];

  return (
    <div className="w-full flex flex-col justify-center items-center text-white relative">
      
      {/* Timeline Component */}
      <div className="w-full max-w-7xl mx-auto mb-16 lg:mb-24">
        <div className="relative">
          {/* A linha contínua */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2"></div>
          
          {/* Container para os pontos e labels */}
          <div className="flex justify-between">
            {evolutionStages.map((stage, index) => (
              <div key={index} className="relative flex flex-col items-center">
                
                {/* Label que aparece apenas no item ativo */}
                {activeIndex === index && (
                  <div className="absolute bottom-full mb-3 text-center">
                    <p className="text-sm font-medium text-white whitespace-nowrap">{stage.timelineLabel}</p>
                  </div>
                )}

                {/* Botão do Ponto (dot) */}
                <button 
                  onClick={() => changeStage(index)} 
                  className="relative z-10 flex items-center justify-center w-6 h-6"
                  aria-label={`Ir para ${stage.timelineLabel}`}
                >
                  {activeIndex === index ? (
                    // Ponto Ativo: maior, com borda, centro transparente
                    <div className="w-4 h-4 bg-black rounded-full border-2 border-white"></div>
                  ) : (
                    // Ponto Inativo: menor, sólido
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Área de Conteúdo - Duas Colunas */}
      <div ref={contentRef} className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Coluna Esquerda: Impact Text e Navegação */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-none mb-8">
            {currentStage.impactText}
          </h3>
          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Coluna Direita: Título e Parágrafo */}
        <div className="text-center lg:text-left">
          <h4 className="text-3xl md:text-4xl font-medium mb-4">
            {currentStage.title}
          </h4>
          <p className="section-paragraph text-brand-gray">
            {currentStage.paragraph}
          </p>
        </div>
      </div>
    </div>
  );
};