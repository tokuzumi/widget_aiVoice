"use client";

import React, { useCallback, useState, useEffect, useRef } from 'react';
import gsap from 'gsap'; // Importando GSAP
import { UserCog, History, BrainCircuit, Search } from 'lucide-react';

export const HowYouManageSection = () => {
  // Reordenando os itens: 0, 1, 3, 2
  const galleryItems = [
    {
      buttonLabel: "O Seu DNA",
      cardTitle: "Personalize seu aiVoice",
      cardDescription: "Treine seu aiVoice com as informações do seu site automaticamente ou através de PDFs. É rápido e prático",
      metricIcon: UserCog,
      metricLabel: "seu aiVoice, com o seu DNA",
    },
    {
      buttonLabel: "Histórico",
      cardTitle: "Acesse seus Atendimentos",
      cardDescription: "O Histórico de Atendimento fica armazenado e pronto para você acessar para entender como a Thais está trabalhando",
      metricIcon: History,
      metricLabel: "acompanhe os atendimentos",
    },
    {
      buttonLabel: "Processamento", // Alterado de "Pós-Atendimento" para "Processamento"
      cardTitle: "Análise Detalhada",
      cardDescription: "Realizamos uma análise de tudo o que foi dito, identificamos o sentimento, a intenção e extraímos informações estratégicas para planejamentos futuros.",
      metricIcon: Search,
      metricLabel: "informações estratégicas",
    },
    {
      buttonLabel: "Insights", // Item 2 (agora 3)
      cardTitle: "O Mapa da Mina",
      cardDescription: "Aqui você vai encontrar informações extraídas de cada atendimento, permitindo identificar tendências, gargalos de conteúdo e muito mais!",
      metricIcon: BrainCircuit,
      metricLabel: "otimize suas campanhas",
    },
  ];

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateActiveStatesOnScroll = useCallback(() => {
    if (!cardsContainerRef.current || cardRefs.current.length === 0) return;

    const scrollLeft = cardsContainerRef.current.scrollLeft;
    const firstCard = cardRefs.current[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth; // Largura do primeiro card
    const gap = 32; // Corresponde a 'gap-8' (8 * 4 = 32px)

    // Calcula o índice ativo com base na posição de rolagem
    // Considera a largura do card + o gap para cada "passo" de rolagem
    const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
    setSelectedIndex(Math.min(activeIndex, galleryItems.length - 1)); // Garante que não exceda o número de itens reais
  }, [galleryItems.length]);

  const scrollToCard = useCallback((index: number) => {
    if (!cardsContainerRef.current || !cardRefs.current[index]) return;

    const targetCard = cardRefs.current[index];
    if (targetCard) {
      const targetScrollLeft = targetCard.offsetLeft - cardsContainerRef.current.offsetLeft;
      gsap.to(cardsContainerRef.current, {
        scrollLeft: targetScrollLeft,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setSelectedIndex(index), // Atualiza o índice após a animação
      });
    }
  }, []);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateActiveStatesOnScroll);
      // Chama updateActiveStatesOnScroll uma vez para definir o estado inicial
      updateActiveStatesOnScroll();
      return () => {
        container.removeEventListener('scroll', updateActiveStatesOnScroll);
      };
    }
  }, [updateActiveStatesOnScroll]);

  return (
    <section id="dashboard" className="content-section bg-black text-brand-gray relative items-start justify-start">
      {/* Bloco de texto introdutório (Pré-título, Título, Parágrafo) */}
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">o Centro de Controle</p>
        <h2 className="section-title text-white">
          Conheça nosso Dashboard IA
        </h2>
        <p className="section-paragraph text-brand-gray">
          Enquanto a Thais está na linha de frente encantando e convertendo sua audiência, nosso Dashboard IA trabalha nos bastidores, revelando caminhos para o seu crescimento.
        </p>
      </div>

      {/* Conteúdo principal com layout de duas colunas e navegação por pontos */}
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 mt-4 pb-16 lg:pb-24 relative z-10">
        {/* Layout de duas colunas */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8">
          {/* Coluna Esquerda: Texto de Impacto e Botões de Navegação */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center text-center lg:text-left">
            <p className="impact-text text-brand-gray">
              Uma Inteligência Artificial especializada no gerenciamento dos seus atendimentos
            </p>

            {/* Botões de Navegação */}
            <div className="grid grid-cols-2 gap-3 mt-8 max-w-xs mx-auto lg:mx-0">
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`
                    px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-300
                    ${selectedIndex === index
                      ? 'bg-white border-white text-black'
                      : 'border-white text-white hover:border-accent hover:text-accent'
                    }
                  `}
                >
                  {item.buttonLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Carrossel de Cards */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center">
            <div
              ref={cardsContainerRef}
              className="flex gap-8 overflow-x-scroll scrollbar-hide"
            >
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className="flex-shrink-0 w-full min-w-0 lg:w-[calc(50%-1rem)]"
                >
                  <div className="card bg-white text-black rounded-3xl p-8 flex flex-col justify-between h-full">
                    <h3 className="text-2xl md:text-3xl font-medium text-gray-700 mb-4">{item.cardTitle}</h3>
                    <p className="section-paragraph !text-gray-500 mb-8">{item.cardDescription}</p>
                    <div className="metrics-grid">
                      <div className="metric">
                        {item.metricIcon ? (
                          <item.metricIcon className="h-10 w-10 text-gray-700 mb-2" />
                        ) : (
                          <div className="text-4xl font-bold text-gray-700 leading-none mb-2">{item.metricValue}</div>
                        )}
                        <div className="text-sm font-semibold text-gray-700 leading-tight">{item.metricLabel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Slide vazio para criar espaço de rolagem em telas grandes */}
              <div className="flex-shrink-0 hidden lg:block w-[calc(50%-1rem)] min-w-0">
                {/* Conteúdo vazio */}
              </div>
            </div>
          </div>
        </div>

        {/* Pontos de Navegação */}
        <div className="flex justify-center gap-2 mt-8">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all duration-300
                ${index === selectedIndex ? 'w-8 bg-white' : 'w-2 bg-white opacity-50 hover:opacity-100'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};