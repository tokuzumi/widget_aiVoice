"use client";

import React from 'react';
import Image from 'next/image';

interface ItemProps {
  title: string;
  subtitle: string;
  text: string;
  benefit: string;
}

const FeatureItem: React.FC<ItemProps> = ({ title, subtitle, text, benefit }) => {
  return (
    <div className="w-full">
      {/* Título e Linha (Estrutura vertical) */}
      <h4 className="text-3xl md:text-4xl font-medium mb-4 text-white">{title}</h4>
      <div className="w-full h-px bg-white mb-4"></div>

      {/* Box de Conteúdo do Ítem (Estrutura de 3 colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-6 lg:items-start">
        {/* Coluna 1: Subtítulo (30%) */}
        <div className="lg:col-span-3">
          <h5 className="text-2xl md:text-3xl font-medium text-gray-300">{subtitle}</h5>
        </div>

        {/* Coluna 2: Parágrafo e Benefício (70%) */}
        <div className="lg:col-span-7">
          <p className="section-paragraph text-brand-gray mb-8">{text}</p>
          
          {/* Bloco de Benefício */}
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
            <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Benefício</p>
            <p className="text-base text-white font-normal leading-relaxed">{benefit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WhyWeAreDifferentSection = () => {
  // Nova URL da imagem Cloudinary
  const aiVoiceFunctionsImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto/v1761189663/aiVoice_thais2_hkylcx.jpg";
  
  const items = [
    {
      title: "1. Conexão Emocional com seus visitantes",
      subtitle: "Funcionalidade: Naturalidade Humana",
      text: "Nosso agente cria uma conexão real através do poder da voz em tempo-real. Ele utiliza nuances humanas, como pausas inteligentes e sinais de escuta (back-channels, como \"uh-huh\", \"entendo...\"), e aplica técnicas de espelhamento para criar rapport. Isso gera um vínculo de confiança que permite ao agente explorar o momentum da conversa, fazendo perguntas contextuais e aprofundando a qualificação de uma forma que um chatbot de texto, frio e reativo, jamais conseguiria.",
      benefit: "Geração de Confiança e Rapport Imediato. Você não está apenas coletando dados; está construindo um relacionamento. Clientes que confiam na sua marca compram mais rápido e com menos objeções."
    },
    {
      title: "2. Atendimento Global",
      subtitle: "Funcionalidade: Multi-idiomas Dinâmico",
      text: "Quebre as barreiras geográficas instantaneamente. Nossa IA identifica dinamicamente o idioma de preferência do seu visitante (seja pela configuração do navegador ou pelas primeiras palavras ditas) e assume automaticamente a conversa. O sistema traduz e responde em tempo real, de forma contextualizada e fluida, permitindo que seu negócio atenda em escala global, 24/7, parecendo um nativo em qualquer língua.",
      benefit: "Expansão de Mercado e Acessibilidade Total. Você abre seu negócio para o mercado internacional sem precisar contratar equipes multilíngues, oferecendo uma experiência de ponta para todos os visitantes, independentemente de onde venham."
    },
    {
      title: "3. Impacto Visual",
      subtitle: "Funcionalidade: Navegação Automática Contextualizada",
      text: "O agente não apenas fala, ele age. Com base no contexto da conversa (\"Gostaria de ver os planos...\"), ele guia ativamente o visitante pelo seu site, mudando de página (window.location) e destacando elementos visuais importantes em tempo real. É a diferença entre dizer \"a informação está na página X\" e ativamente levar o cliente pela mão até a resposta, criando uma experiência imersiva e sem atrito.",
      benefit: "Redução Drástica da Taxa de Abandono. Você garante que o visitante encontre a informação que precisa no exato momento de sua intenção, eliminando a confusão da navegação e acelerando a jornada de compra."
    },
    {
      title: "4. Conteúdo com o DNA do seu negócio",
      subtitle: "Funcionalidade: Entrega de Conteúdo Just-in-Time",
      text: "O agente funciona como seu melhor vendedor, treinado com o DNA do seu negócio. Ele não recita um script. Ele entende a intenção e o sentimento do visitante e faz a entrega estratégica de conteúdo (como um case de sucesso, um dado técnico ou um depoimento) no momento exato em que essa informação terá o maior poder de persuasão para quebrar uma objeção específica.",
      benefit: "Aumento da Autoridade e Quebra de Objeções. Ao entregar o argumento certo no momento certo, você constrói autoridade, educa o cliente e neutraliza objeções antes mesmo que elas se solidifiquem, aumentando a eficácia da persuasão."
    },
    {
      title: "5. Conversas robotizadas nunca mais",
      subtitle: "Funcionalidade: Proatividade Conversacional",
      text: "Nossos agentes são proativos e tomam a iniciativa, tornando a experiência radicalmente humana. Se o visitante faz uma pausa longa após uma informação complexa, o agente pode perguntar: \"Fez sentido para você ou prefere que eu explique de outra forma?\". Ele não espera passivamente por comandos, mas guia ativamente o diálogo para os objetivos do negócio.",
      benefit: "Engajamento Contínuo e Percepção Premium. O visitante sente que está sendo ouvido e compreendido por um especialista, não por um robô reativo. Isso eleva a percepção da sua marca e mantém o visitante engajado por mais tempo."
    },
    {
      title: "6. Melhorando suas Campanhas em tempo-real",
      subtitle: "Funcionalidade: Inteligência de Comunicação (BI)",
      text: "Durante os atendimentos, os agentes adotam diferentes estratégias de conversa para capturar, de forma orgânica e natural, informações valiosas para sua Inteligência de Negócio. Eles identificam dores, objeções recorrentes, termos de busca e a origem do visitante (ex: \"Vim pelo anúncio do Instagram\"), transformando cada conversa em \"ouro\" puro para você otimizar suas campanhas de marketing e vendas.",
      benefit: "ROI de Marketing Otimizado. Você para de adivinhar. O dashboard revela exatamente o que seus clientes estão pensando e por que eles procuram você, fornecendo dados reais para otimizar o criativo dos anúncios, o texto do site e o foco das suas campanhas."
    },
    {
      title: "7. Transformando Leads em Clientes",
      subtitle: "Funcionalidade: Continuidade Aquecida (Qualificação e Handoff)",
      text: "O agente é o seu melhor SDR (Representante de Vendas). Com base na intenção e nas respostas do visitante, ele qualifica o lead em tempo real (identificando orçamento, urgência e autoridade). Ao identificar uma oportunidade clara, ele pode agendar uma reunião diretamente na agenda do seu time ou notificar um vendedor humano para uma transferência imediata, integrando-se ao seu CRM com todo o histórico da conversa.",
      benefit: "Eficiência Comercial e Vendas Mais Rápidas. Seu time de vendas para de perder tempo com leads frios. Eles recebem apenas oportunidades qualificadas, já agendadas e com todo o contexto da conversa, prontos para focar no fechamento."
    },
    {
      title: "8. Melhora a cada atendimento",
      subtitle: "Funcionalidade: Aprendizado Contínuo (Auto-Otimização)",
      text: "O sistema possui um ciclo de autoaprendizado. Ele analisa as interações bem-sucedidas para entender quais argumentos e fluxos de conversa geram os melhores resultados (conversões, agendamentos). Além disso, ele aprende com os ajustes manuais feitos por você no Dashboard, tornando-se mais inteligente, preciso e alinhado à sua estratégia a cada novo atendimento.",
      benefit: "Um Ativo que se Valoriza com o Tempo. Diferente de um funcionário que vai embora, o Agente de IA acumula conhecimento e melhora continuamente. Seu investimento se torna mais inteligente e eficaz a cada dia, garantindo um desempenho de ponta de forma consistente."
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
          
          {/* 30% Left Column with Sticky Image */}
          <div className="hidden lg:block lg:col-span-3 h-full">
            <div className="sticky top-32">
              <Image
                src={aiVoiceFunctionsImageSrc}
                alt="Agente de voz Thais"
                width={540}
                height={540}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

          {/* 70% Content Area */}
          <div className="lg:col-span-7 flex flex-col gap-y-24">
            {items.map((item, index) => (
              <FeatureItem 
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                text={item.text}
                benefit={item.benefit}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};