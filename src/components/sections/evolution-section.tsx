"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from "next/image";
import { EvolutionTimeline } from "@/components/evolution-timeline";
import { ArrowLeft, ArrowRight } from 'lucide-react';

const evolutionStages = [
  {
    timelineLabel: "Formulários",
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

export const EvolutionSection = () => {
  const backgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1759818792/aiVoice_bg_rrluyi.png";
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentStage = evolutionStages[activeIndex];

  useEffect(() => {
    if (contentRef.current) {
      const contentElements = Array.from(contentRef.current.children);
      gsap.fromTo(contentElements, 
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  const changeStage = (newIndex: number) => {
    if (newIndex === activeIndex || !contentRef.current) return;

    const contentElements = Array.from(contentRef.current.children);
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
      </div>

      {/* Container principal para o layout de duas colunas */}
      <div className="w-full mt-16 lg:mt-16 pb-16 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 lg:items-center">
          
          {/* Coluna 1: 30% - Impact Text e Navegação */}
          <div className="lg:col-span-3 px-8 lg:px-16 flex flex-col justify-center">
            <h3 className="impact-text text-white mb-8 text-center lg:text-left">
              {currentStage.impactText}
            </h3>
            <div className="flex items-center gap-4 mx-auto lg:mx-0">
              <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Coluna 2: 70% - Timeline e Conteúdo (sem padding aqui) */}
          <div className="lg:col-span-7 mt-12 lg:mt-0">
            <EvolutionTimeline 
              stages={evolutionStages}
              activeIndex={activeIndex} 
              onStageChange={changeStage} 
            />
            {/* Wrapper para o conteúdo com o padding necessário */}
            <div className="px-8 lg:px-16">
              <div ref={contentRef} className="w-full lg:w-3/4 text-center lg:text-left mt-16 lg:mt-24">
                <h4 className="text-3xl md:text-4xl font-medium mb-4">
                  {currentStage.title}
                </h4>
                <p className="section-paragraph text-brand-gray">
                  {currentStage.paragraph}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};