"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from "next/image";
import { EvolutionTimeline } from "@/components/evolution-timeline";

const evolutionStages = [
  {
    timelineLabel: "Formulários",
    impactText: "Eles fizeram a parte deles... Agora é hora de descansar.",
    title: "A Era do Abandono",
    paragraph: "Os Formulários estáticos foram uma revolução para os sites de primeira geração. Em uma análise atual, cada campo é uma barreira. Cada clique, uma chance de perder o lead. A Taxa de Abandono chega a 82% dependendo do setor. Os hábitos e o nível de exigência dos seus visitantes evoluiu: o seu site, não."
  },
  {
    timelineLabel: "Smart Sites",
    impactText: "A ideia era perfeita, mas...",
    title: "Chatbots de Texto: Quase Lá",
    paragraph: "A evolução natural foram os chatbots, que marcaram o início de uma nova era: os Smart Sites. Conversas instantâneas, mas sem emoção. Respostas rápidas, mas sem conexão. O visitante ainda precisa digitar, esperar, interpretar texto frio. Resultado? Perda de momentum e 74% preferem ligar para um atendente humano."
  },
  {
    timelineLabel: "aiVoice",
    impactText: "Conexões para Conversão",
    title: "A Primeira Conversa Real no Seu Site",
    paragraph: "Voz não é apenas um recurso. É emoção em tempo real. Tom, Pausa, Empatia, Confiança! Estudamos vendedores de alta performance e descobrimos: conexão emocional é o pilar da conversão. Agora, essa mesma conexão está no seu site - sem contratar um único atendente, personalizando seu conteúdo e contribuindo com a sua inteligência de negócio."
  }
];

export const EvolutionSection = () => {
  const backgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1759818792/aiVoice_bg_rrluyi.png";
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentStage = evolutionStages[activeIndex];

  // Usando useCallback para a função de transição
  const changeStage = useCallback((newIndex: number) => {
    if (newIndex === activeIndex || !contentRef.current) return;

    const contentElements = Array.from(contentRef.current.children);
    
    // Animação de saída
    gsap.to(contentElements, {
      autoAlpha: 0,
      x: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex);
      }
    });
  }, [activeIndex]);

  // Animação de entrada (disparada pelo useEffect quando activeIndex muda)
  useEffect(() => {
    if (contentRef.current) {
      const contentElements = Array.from(contentRef.current.children);
      // Garante que os elementos estejam prontos para a animação de entrada
      gsap.set(contentElements, { autoAlpha: 0, x: 20 }); 
      
      gsap.to(contentElements, 
        { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);


  return (
    <section 
      id="evolution" 
      className="content-section bg-black text-white relative items-start justify-center"
    >
      <Image
        src={backgroundImage}
        alt="Background abstrato com partículas digitais"
        fill
        className="object-cover z-0"
        priority
      />
      
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">a evolução</p>
        <h2 className="section-title text-white">
          A Nova Geração de Sites
        </h2>
        <p className="section-paragraph text-brand-gray">
          A verdadeira questão não é mais SE você vai usar IA no seu site, mas COMO vai usá-la para criar uma vantagem real sobre seus concorrentes.
        </p>
      </div>

      {/* Container principal para o layout */}
      <div className="w-full mt-16 lg:mt-16 pb-16 lg:pb-24 relative z-10">
        
        {/* LINHA 1: TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-10">
          <div className="lg:col-start-4 lg:col-span-7">
            <EvolutionTimeline 
              stages={evolutionStages}
              activeIndex={activeIndex} 
              onStageChange={changeStage} 
            />
          </div>
        </div>

        {/* LINHA 2: CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-10 mt-10 lg:mt-16">
          {/* Coluna 1: 30% - Impact Text */}
          <div className="lg:col-span-3 px-8 lg:px-16 flex flex-col justify-center">
            <h3 className="impact-text text-white mb-8 text-center lg:text-left">
              {currentStage.impactText}
            </h3>
          </div>

          {/* Coluna 2: 70% - Conteúdo */}
          <div className="lg:col-span-7 px-8 lg:px-16">
            <div ref={contentRef} className="w-full lg:w-3/4 text-center lg:text-left">
              <h4 className="text-3xl md:text-4xl font-medium mb-4">
                {currentStage.title}
              </h4>
              <p className="section-paragraph text-brand-gray">
                {currentStage.paragraph}
              </p>
            </div>
          </div>
        </div>

        {/* LINHA 3: NAVEGAÇÃO POR PONTOS */}
        <div className="flex justify-center gap-2 mt-8">
          {evolutionStages.map((_, index) => (
            <button
              key={index}
              onClick={() => changeStage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white opacity-50 hover:opacity-100'
              }`}
              aria-label={`Ir para o estágio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};