"use client";

import React from 'react';

interface Stage {
  timelineLabel: string;
}

interface EvolutionTimelineProps {
  stages: Stage[];
  activeIndex: number;
  onStageChange: (index: number) => void;
}

export const EvolutionTimeline: React.FC<EvolutionTimelineProps> = ({ stages, activeIndex, onStageChange }) => {
  return (
    <div className="w-full relative px-8 lg:px-16">
      {/* A linha contínua que se estende por toda a largura */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2"></div>
      
      {/* Container para os pontos, alinhado à esquerda */}
      <div className="relative w-full lg:w-3/4">
        <div className="flex justify-between">
          {stages.map((stage, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Label acima do ponto */}
              <span className="absolute bottom-full mb-3 text-sm font-medium text-white whitespace-nowrap">
                {stage.timelineLabel}
              </span>

              {/* Botão do Ponto (dot) */}
              <button 
                onClick={() => onStageChange(index)} 
                className="relative z-10 flex items-center justify-center w-6 h-6"
                aria-label={`Ir para ${stage.timelineLabel}`}
              >
                {activeIndex === index ? (
                  // Ponto Ativo: com borda, centro transparente
                  <div className="w-4 h-4 bg-black rounded-full border-2 border-white"></div>
                ) : (
                  // Ponto Inativo: sólido
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};