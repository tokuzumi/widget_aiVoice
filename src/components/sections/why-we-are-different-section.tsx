"use client";

import React from 'react';
import Image from 'next/image';

const PlaceholderItem = ({ title, subtitle, text, keywords }: { title: string, subtitle: string, text: string, keywords: string[] }) => {
  const half = Math.ceil(keywords.length / 2);
  const firstHalf = keywords.slice(0, half);
  const secondHalf = keywords.slice(half);

  return (
    <div className="w-full">
      {/* Título e Linha (Estrutura vertical) */}
      <h4 className="text-3xl md:text-4xl font-medium mb-4 text-white">{title}</h4>
      <div className="w-full h-px bg-white mb-4"></div>

      {/* Box de Conteúdo do Ítem (Estrutura de 3 colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-4 gap-y-4 lg:items-start">
        {/* Coluna 1: Subtítulo (25%) */}
        <div className="lg:col-span-3">
          <h5 className="text-2xl md:text-3xl font-medium text-gray-300">{subtitle}</h5>
        </div>

        {/* Coluna 2: Espaço Negativo (10%) */}
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* Coluna 3: Parágrafo e Keywords (65%) */}
        <div className="lg:col-span-6">
          <p className="section-paragraph text-brand-gray mb-12">{text}</p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex flex-col gap-y-2">
              {firstHalf.map((keyword, index) => (
                <span key={index} className="text-sm text-gray-400">
                  {keyword}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-y-2">
              {secondHalf.map((keyword, index) => (
                <span key={index} className="text-sm text-gray-400">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WhyWeAreDifferentSection = () => {
  const aiVoiceLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_225,c_limit,dpr_auto/v1757012939/aiVoice_white_h1iae6.png";
  
  const items = [
    {
      title: "Placeholder Title 1",
      subtitle: "Subtitle for Item 1",
      text: "This is a placeholder paragraph for the first item.",
      keywords: ["Keyword A", "Keyword B", "Keyword C", "Keyword D", "Keyword E", "Keyword F"]
    },
    {
      title: "Placeholder Title 2",
      subtitle: "Subtitle for Item 2",
      text: "This is a placeholder paragraph for the second item.",
      keywords: ["Keyword G", "Keyword H", "Keyword I", "Keyword J", "Keyword K", "Keyword L"]
    },
    {
      title: "Placeholder Title 3",
      subtitle: "Subtitle for Item 3",
      text: "This is a placeholder paragraph for the third item.",
      keywords: ["Keyword M", "Keyword N", "Keyword O", "Keyword P", "Keyword Q", "Keyword R"]
    },
    {
      title: "Placeholder Title 4",
      subtitle: "Subtitle for Item 4",
      text: "This is a placeholder paragraph for the fourth item.",
      keywords: ["Keyword S", "Keyword T", "Keyword U", "Keyword V", "Keyword W", "Keyword X"]
    },
    {
      title: "Placeholder Title 5",
      subtitle: "Subtitle for Item 5",
      text: "This is a placeholder paragraph for the fifth item.",
      keywords: ["Keyword Y", "Keyword Z", "Keyword AA", "Keyword BB", "Keyword CC", "Keyword DD"]
    },
    {
      title: "Placeholder Title 6",
      subtitle: "Subtitle for Item 6",
      text: "This is a placeholder paragraph for the sixth item.",
      keywords: ["Keyword EE", "Keyword FF", "Keyword GG", "Keyword HH", "Keyword II", "Keyword JJ"]
    },
  ];

  return (
    <section 
      id="why-we-are-different" 
      className="content-section bg-black text-white relative items-start justify-center"
    >
      {/* Introductory Text Block */}
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">por que somos diferentes</p>
        <h2 className="section-title text-white">
          Muito além de um chatbot
        </h2>
        <p className="section-paragraph text-brand-gray">
          Somos especializados em comunicação em tempo-real com inteligência artificial, focados em naturalidade humana pra conversas que realmente conectam com os seus visitantes.
        </p>
      </div>

      {/* Main content area with a 30/70 split */}
      <div className="w-full mt-16 lg:mt-16 pb-16 lg:pb-24 relative z-10 px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8">
          
          {/* 30% Left Column with Sticky Logo */}
          <div className="hidden lg:block lg:col-span-3 h-full">
            <div className="sticky top-32">
              <Image
                src={aiVoiceLogoSrc}
                alt="aiVoice Logo"
                width={360}
                height={84}
                className="w-[360px] h-auto"
              />
            </div>
          </div>

          {/* 70% Content Area */}
          <div className="lg:col-span-7 flex flex-col gap-y-24">
            {items.map((item, index) => (
              <PlaceholderItem 
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                text={item.text}
                keywords={item.keywords}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};