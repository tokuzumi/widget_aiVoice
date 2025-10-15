"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureListItemProps {
  itemNumber: string;
  title: string;
  description: string;
  keywords: string[];
  headerText: string;
  IconComponent: React.ElementType;
  className?: string;
  totalItems: number;
}

export const FeatureListItem: React.FC<FeatureListItemProps> = ({
  itemNumber,
  title,
  description,
  keywords,
  headerText,
  IconComponent,
  className,
  totalItems,
}) => {
  // Dividir as palavras-chave em duas metades para as colunas
  const half = Math.ceil(keywords.length / 2);
  const firstHalf = keywords.slice(0, half);
  const secondHalf = keywords.slice(half);

  return (
    <div className={cn("w-full max-w-4xl mx-auto text-left text-white", className)}>
      {/* Primeira Linha: Layout Padrão */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <IconComponent className="h-5 w-5 text-white" />
          <span className="text-sm font-medium uppercase">{headerText}</span>
        </div>
        <span className="text-sm text-white">{`${itemNumber}/${String(totalItems).padStart(2, '0')}`}</span>
      </div>

      {/* Segunda Linha: Linha Horizontal */}
      <div className="w-full h-px bg-white mb-4"></div>

      {/* Terceira Linha: Título (40%) e Descrição (60%) em telas maiores */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 mb-6 lg:mb-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl md:text-3xl font-medium">{title}</h3>
        </div>
        <div className="lg:col-span-3">
          <p className="section-paragraph">{description}</p>
        </div>
      </div>

      {/* Quarta Linha: Palavras-chave (alinhadas com a descrição em telas grandes) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-2">
        {/* Espaço vazio para a coluna do título em telas grandes */}
        <div className="hidden lg:block lg:col-span-2"></div>

        {/* Container para as palavras-chave, alinhado com a descrição */}
        <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-x-4 gap-y-2">
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
  );
};