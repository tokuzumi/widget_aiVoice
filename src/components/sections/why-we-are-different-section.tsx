"use client";

import React from 'react';

const PlaceholderItem = ({ title, text, keywords }: { title: string, text: string, keywords: string[] }) => {
  const half = Math.ceil(keywords.length / 2);
  const firstHalf = keywords.slice(0, half);
  const secondHalf = keywords.slice(half);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4 items-start">
      {/* Left Column: Title */}
      <div className="lg:col-span-1">
        <h4 className="text-4xl md:text-5xl font-medium text-white leading-tight">{title}</h4>
      </div>

      {/* Right Column: Paragraph and Keywords */}
      <div className="lg:col-span-1">
        <p className="section-paragraph text-brand-gray mb-12">{text}</p>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex flex-col gap-y-3">
            {firstHalf.map((keyword, index) => (
              <span key={index} className="text-base text-white">
                {keyword}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-y-3">
            {secondHalf.map((keyword, index) => (
              <span key={index} className="text-base text-white">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const WhyWeAreDifferentSection = () => {
  const items = [
    {
      title: "Placeholder Title 1",
      text: "This is a placeholder paragraph for the first item.",
      keywords: ["Keyword A", "Keyword B", "Keyword C"]
    },
    {
      title: "Placeholder Title 2",
      text: "This is a placeholder paragraph for the second item.",
      keywords: ["Keyword G", "Keyword H", "Keyword I"]
    },
    {
      title: "Placeholder Title 3",
      text: "This is a placeholder paragraph for the third item.",
      keywords: ["Keyword M", "Keyword N", "Keyword O"]
    },
    {
      title: "Placeholder Title 4",
      text: "This is a placeholder paragraph for the fourth item.",
      keywords: ["Keyword S", "Keyword T", "Keyword U"]
    },
    {
      title: "Placeholder Title 5",
      text: "This is a placeholder paragraph for the fifth item.",
      keywords: ["Keyword Y", "Keyword Z", "Keyword AA"]
    },
    {
      title: "Placeholder Title 6",
      text: "This is a placeholder paragraph for the sixth item.",
      keywords: ["Keyword EE", "Keyword FF", "Keyword GG"]
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
          {/* 30% Negative Space */}
          <div className="hidden lg:block lg:col-span-3"></div>

          {/* 70% Content Area */}
          <div className="lg:col-span-7 flex flex-col gap-y-20">
            {items.map((item, index) => (
              <PlaceholderItem 
                key={index}
                title={item.title}
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