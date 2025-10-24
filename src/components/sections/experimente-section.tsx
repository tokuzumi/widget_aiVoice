"use client";

import Image from "next/image";

export const ExperimenteSection = () => {
  // Nova URL da imagem Cloudinary
  const agentImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1761200423/widget_aiVoice_big_draqam.png";

  return (
    <section id="experimente" className="content-section bg-black text-white relative overflow-hidden min-h-screen lg:flex-row lg:items-stretch pb-8 lg:pb-0"> {/* Reduzido pb-16 para pb-8 em mobile */}
      
      {/* Coluna Esquerda: Conteúdo de Texto (60% em LG) */}
      <div className="section-content-wrapper relative z-10 pb-0 lg:pb-24">
        <p className="section-eyebrow">experimente agora</p>
        <h2 className="section-title text-white">
          Veja a Mágica Acontecer
        </h2>
        <p className="section-paragraph text-brand-gray mb-4"> {/* Reduzido mb-8 para mb-4 */}
          Clique no widget aiVoice e descubra como vamos impactar sua audiência. Sinta a naturalidade de um atendimento real, capturando as informações estratégicas que farão toda diferença no seu negócio
        </p>
        <p className="impact-text text-white mb-4"> {/* Adicionado mb-4 para manter algum espaçamento, mas reduzido */}
          Conheça a Thais: sua mais nova Funcionária do Ano
        </p>
      </div>

      {/* Coluna Direita: Imagem da Agente (40% em LG) */}
      <div className="relative w-full h-[40vh] lg:w-[40%] lg:h-auto flex-shrink-0 flex items-center justify-center"> {/* Reduzido h-[50vh] para h-[40vh] em mobile */}
        <Image
          src={agentImageSrc}
          alt="Agente de voz Thais"
          fill
          className="object-contain brightness-110 contrast-110"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
        />
      </div>
    </section>
  );
};