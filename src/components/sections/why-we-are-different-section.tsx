"use client";

import React from 'react';

const PlaceholderItem = ({ title, text }: { title: string, text: string }) => (
  <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-4">
    {/* 30% column for the title */}
    <div className="lg:col-span-3">
      <h4 className="text-3xl md:text-4xl font-medium text-white">
        {title}
      </h4>
    </div>
    {/* 70% column for the line and paragraph */}
    <div className="lg:col-span-7">
      <div className="w-full h-px bg-white mb-4"></div>
      <p className="section-paragraph text-brand-gray">
        {text}
      </p>
    </div>
  </div>
);

export const WhyWeAreDifferentSection = () => {
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
          <div className="lg:col-span-7 flex flex-col gap-y-12">
            <PlaceholderItem 
              title="Placeholder Title 1"
              text="This is a placeholder paragraph for the first item."
            />
            <PlaceholderItem 
              title="Placeholder Title 2"
              text="This is a placeholder paragraph for the second item."
            />
            <PlaceholderItem 
              title="Placeholder Title 3"
              text="This is a placeholder paragraph for the third item."
            />
            <PlaceholderItem 
              title="Placeholder Title 4"
              text="This is a placeholder paragraph for the fourth item."
            />
            <PlaceholderItem 
              title="Placeholder Title 5"
              text="This is a placeholder paragraph for the fifth item."
            />
            <PlaceholderItem 
              title="Placeholder Title 6"
              text="This is a placeholder paragraph for the sixth item."
            />
          </div>
        </div>
      </div>
    </section>
  );
};