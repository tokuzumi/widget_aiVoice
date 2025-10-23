"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from "next/image";
import { EvolutionTimeline } from "@/components/evolution-timeline";

const evolutionStages = [
  {
    timelineLabel: "Formulários",
    impactText: "Eles fizeram a parte deles... Agora é hora de descansar.",
    title: "A Ferramenta dos anos 90",
    paragraph: "Os Formulários estáticos foram uma revolução para os sites de primeira geração, sendo a principal forma de interação para conectar a audiência on-line ao seu negócio. Contudo, essa tecnologia, implementada há duas décadas, não acompanhou a evolução do comportamento do usuário. Com o avanço tecnológico, os visitantes se tornaram mais exigentes e altamente suscetíveis à menor fricção. O que antes era uma solução, hoje se tornou um problema silencioso, que poucas pessoas perceberam: os formulários funcionam como um monólogo frio e unilateral, barreiras passivas que forçam o visitante a fazer todo o trabalho. Cada campo a ser preenchido aumenta o atrito, resultando no caminho inevitável do abandono. Tudo isso sem contar a perda do momentum, que somados, elevam absurdamente o seu custo de aquisição de clientes."
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
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  const changeStage = (newIndex: number) => {
    if (newIndex === activeIndex || !contentRef.current) return;

    const contentElements = Array.from(contentRef.current.children);
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