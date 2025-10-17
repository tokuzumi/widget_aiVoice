"use client";

import React from 'react';
import { Check, Minus } from 'lucide-react'; // Ícones para as features

export const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Basic",
      description: "Ideal para quem está começando e precisa de uma solução robusta para qualificar leads.",
      price: "R$899",
      priceUnit: "/ mês",
      buttonText: "Experimente",
      buttonVariant: "light",
      features: {
        'Widget aiVoice': 'yes',
        'Suporte Técnico': 'yes',
        // Dashboard AI
        'Gerenciamento da Base de Conhecimento': 'yes',
        'Histórico de Atendimentos': 'yes',
        'Métricas': 'yes',
        'Análise de Sentimento': 'no',
        'Análise de Intenção': 'no',
        'Análise de Objeções': 'no',
        'Inteligência de Negócio': 'no',
        // Interatividade
        'Navegação Automática': 'no',
        'AG-UI': 'no',
        // Packs de Atendimentos
        'Mensais Inclusos': '100',
        'Extras': 'R$ 3,40',
        // Notificações
        'Email': 'yes',
        // Integrações
        'Google Agenda': 'no',
        'Whatsapp': 'no',
        'CRMs': 'no',
      },
    },
    {
      name: "Growth",
      description: "Para empresas que buscam escalar e otimizar a conversão com inteligência artificial avançada.",
      price: "R$1.899",
      priceUnit: "/ mês",
      buttonText: "Experimente",
      buttonVariant: "dark",
      features: {
        'Widget aiVoice': 'yes',
        'Suporte Técnico': 'yes',
        // Dashboard AI
        'Gerenciamento da Base de Conhecimento': 'yes',
        'Histórico de Atendimentos': 'yes',
        'Métricas': 'yes',
        'Análise de Sentimento': 'yes',
        'Análise de Intenção': 'yes',
        'Análise de Objeções': 'yes',
        'Inteligência de Negócio': 'yes',
        // Interatividade
        'Navegação Automática': 'yes',
        'AG-UI': 'yes',
        // Packs de Atendimentos
        'Mensais Inclusos': '300',
        'Extras': 'R$ 3,00',
        // Notificações
        'Email': 'yes',
        // Integrações
        'Google Agenda': 'yes',
        'Whatsapp': 'no',
        'CRMs': 'no',
      },
    },
    {
      name: "Custom",
      description: "Ideal para quem procura por integrações com CRM ou outras plataformas",
      price: "---",
      priceUnit: "",
      buttonText: "Fale Conosco",
      buttonVariant: "dark",
      features: {
        'Widget aiVoice': 'no',
        'Suporte Técnico': 'no',
        // Dashboard AI
        'Gerenciamento da Base de Conhecimento': 'no',
        'Histórico de Atendimentos': 'no',
        'Métricas': 'no',
        'Análise de Sentimento': 'no',
        'Análise de Intenção': 'no',
        'Análise de Objeções': 'no',
        'Inteligência de Negócio': 'no',
        // Interatividade
        'Navegação Automática': 'no',
        'AG-UI': 'no',
        // Packs de Atendimentos
        'Mensais Inclusos': '---',
        'Extras': '---',
        // Notificações
        'Email': 'no',
        // Integrações
        'Google Agenda': 'no',
        'Whatsapp': 'no',
        'CRMs': 'no',
      },
    },
  ];

  const featureTableStructure = [
    { type: 'subtitle', label: 'Funcionalidades' },
    { type: 'feature', label: 'Widget aiVoice' },
    { type: 'feature', label: 'Suporte Técnico' },
    
    // Categoria Dashboard AI
    { type: 'subtitle', label: 'Dashboard AI' },
    { type: 'feature', label: 'Gerenciamento da Base de Conhecimento' },
    { type: 'feature', label: 'Histórico de Atendimentos' },
    { type: 'feature', label: 'Métricas' },
    { type: 'feature', label: 'Análise de Sentimento' },
    { type: 'feature', label: 'Análise de Intenção' },
    { type: 'feature', label: 'Análise de Objeções' },
    { type: 'feature', label: 'Inteligência de Negócio' },

    // Categoria Interatividade
    { type: 'subtitle', label: 'Interatividade' },
    { type: 'feature', label: 'Navegação Automática' },
    { type: 'feature', label: 'AG-UI' },

    { type: 'subtitle', label: 'Packs de Atendimentos' },
    { type: 'feature', label: 'Mensais Inclusos' },
    { type: 'feature', label: 'Extras' },
    
    { type: 'subtitle', label: 'Notificações' },
    { type: 'feature', label: 'Email' },
    
    { type: 'subtitle', label: 'Integrações' },
    { type: 'feature', label: 'Google Agenda' },
    { type: 'feature', label: 'Whatsapp' },
    { type: 'feature', label: 'CRMs' },
  ];

  const renderDesktopFeatureValue = (value: string) => {
    if (value === 'yes') return <Check className="h-5 w-5 text-white mx-auto" />;
    if (value === 'no') return <Minus className="h-5 w-5 text-gray-500 mx-auto" />;
    return <span className="text-base text-white">{value}</span>;
  };

  const renderMobileFeatureValue = (value: string) => {
    if (value === 'yes') return <Check className="h-5 w-5 text-black" />;
    if (value === 'no') return <Minus className="h-5 w-5 text-gray-400" />;
    return <span className="text-gray-700">{value}</span>;
  };

  return (
    <section className="content-section bg-black text-brand-gray relative items-start justify-start">
      {/* Bloco de texto introdutório */}
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">nossos planos</p>
        <h2 className="section-title text-white">
          Escolha o plano ideal para o seu negócio
        </h2>
        <p className="section-paragraph text-brand-gray">
          Nossos planos são desenhados para se adaptar às suas necessidades, desde startups até empresas em crescimento.
        </p>
      </div>

      {/* Mobile/Tablet View (md e abaixo) - Cards Empilhados */}
      <div className="w-full max-w-7xl mx-auto px-8 mt-4 pb-16 relative z-10 lg:hidden">
        <div className="grid grid-cols-1 gap-8">
          {pricingPlans.map((plan, planIndex) => (
            <div key={planIndex} className="bg-white text-black rounded-3xl p-8 flex flex-col justify-between h-full shadow-lg">
              <div>
                <h3 className="text-3xl font-bold text-gray-700 mb-2">{plan.name}</h3>
                <p className="section-paragraph !text-gray-500 mb-6">{plan.description}</p>
                <div className="flex items-baseline mb-8">
                  {plan.price.startsWith('R$') ? (
                    <span className="text-5xl font-bold text-gray-700">
                      <span className="text-lg font-medium align-baseline mr-1">R$</span>
                      {plan.price.substring(2)}
                    </span>
                  ) : (
                    <span className="text-5xl font-bold text-gray-700">{plan.price}</span>
                  )}
                  <span className="text-lg text-gray-500 ml-2">{plan.priceUnit}</span>
                </div>
              </div>

              <div className="mb-8">
                <button
                  className={`w-full py-3 rounded-full text-base font-semibold transition-colors duration-300 flex items-center justify-center gap-2
                    ${plan.buttonVariant === "light"
                      ? 'bg-white border border-gray-300 text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                    }
                  `}
                >
                  {plan.buttonText} <span className="ml-2">&rarr;</span>
                </button>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                {featureTableStructure.map((row, rowIndex) => {
                  if (row.type === 'subtitle') {
                    return <h4 key={`mobile-subtitle-${rowIndex}`} className="text-lg font-semibold text-gray-700 mt-4 mb-2 first:mt-0">{row.label}</h4>;
                  }
                  // Acessa a feature usando o label da estrutura
                  const value = plan.features[row.label as keyof typeof plan.features];
                  if (value === undefined) return null; // Ignora features que não existem mais no plano
                  
                  return (
                    <div key={`mobile-feature-${rowIndex}`} className="flex items-center justify-between text-gray-700 py-1">
                      <span>{row.label}</span>
                      {renderMobileFeatureValue(value)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View (lg e acima) - Estrutura de Tabela */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-16 mt-4 pb-24 relative z-10">
        <div className="grid grid-cols-[200px_1fr_1fr_1fr]">
          {/* Linha 1: Nomes dos Planos */}
          <div></div>
          {pricingPlans.map((plan, planIndex) => (
            <div key={`plan-name-${planIndex}`} className={`${planIndex < pricingPlans.length - 1 ? 'border-r' : ''} border-border p-4 text-center`}>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            </div>
          ))}

          {/* Linha 2: Descrições */}
          <div></div>
          {pricingPlans.map((plan, planIndex) => (
            <div key={`plan-desc-${planIndex}`} className={`${planIndex < pricingPlans.length - 1 ? 'border-r' : ''} border-border p-4 text-center`}>
              <p className="section-paragraph text-brand-gray">{plan.description}</p>
            </div>
          ))}

          {/* Linha 3: Preços */}
          <div></div>
          {pricingPlans.map((plan, planIndex) => (
            <div key={`plan-price-${planIndex}`} className={`${planIndex < pricingPlans.length - 1 ? 'border-r' : ''} border-border p-4 text-center`}>
              {plan.price.startsWith('R$') ? (
                <span className="text-5xl font-bold text-white">
                  <span className="text-lg font-medium align-baseline mr-1">R$</span>
                  {plan.price.substring(2)}
                </span>
              ) : (
                <span className="text-5xl font-bold text-white">{plan.price}</span>
              )}
              <span className="text-lg text-brand-gray ml-2">{plan.priceUnit}</span>
            </div>
          ))}

          {/* Linha 4: CTAs */}
          <div></div>
          {pricingPlans.map((plan, planIndex) => (
            <div key={`plan-cta-${planIndex}`} className={`${planIndex < pricingPlans.length - 1 ? 'border-r' : ''} border-border p-4 text-center`}>
              <button
                className={`w-full py-3 rounded-full text-base font-semibold transition-colors duration-300 flex items-center justify-center gap-2
                  ${plan.buttonVariant === "light"
                    ? 'bg-white border border-gray-300 text-black hover:bg-gray-100'
                    : 'bg-black text-white hover:bg-gray-800'
                  }
                `}
              >
                {plan.buttonText} <span className="ml-2">&rarr;</span>
              </button>
            </div>
          ))}

          {/* Linhas de Funcionalidades */}
          {featureTableStructure.map((row, rowIndex) => {
            if (row.type === 'subtitle') {
              return (
                <React.Fragment key={`subtitle-${rowIndex}`}>
                  <div className="border-r border-border p-4 text-right">
                    <h3 className="text-lg font-semibold text-white">{row.label}</h3>
                  </div>
                  <div className="border-r border-border p-4"></div>
                  <div className="border-r border-border p-4"></div>
                  <div className="p-4"></div>
                </React.Fragment>
              );
            }
            // Se for uma feature, renderiza a linha
            return (
              <React.Fragment key={`feature-row-${rowIndex}`}>
                <div className="border-r border-border p-4 text-right">
                  <span className="text-base text-brand-gray">{row.label}</span>
                </div>
                {pricingPlans.map((plan, planIndex) => {
                  // Acessa a feature usando o label da estrutura
                  const value = plan.features[row.label as keyof typeof plan.features];
                  
                  // Se a feature não existir no plano (o que não deve acontecer com a nova estrutura), retorna um traço
                  if (value === undefined) {
                    return (
                      <div key={`feature-cell-${planIndex}-${rowIndex}`} className={`${planIndex < pricingPlans.length - 1 ? 'border-r' : ''} border-border p-4 text-center`}>
                        <Minus className="h-5 w-5 text-gray-500 mx-auto" />
                      </div>
                    );
                  }

                  return (
                    <div key={`feature-cell-${planIndex}-${rowIndex}`} className={`${planIndex < pricingPlans.length - 1 ? 'border-r' : ''} border-border p-4 text-center`}>
                      {renderDesktopFeatureValue(value)}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};