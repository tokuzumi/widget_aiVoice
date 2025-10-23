"use client";

import Image from "next/image";

export const ExperimenteSection = () => {
  const agentImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1760685315/bg_aiVoice_thais2_e8mf6v.jpg";

  return (
    <section id="experimente" className="content-section bg-black text-white relative overflow-hidden min-h-screen lg:flex-row lg:items-stretch pb-16 lg:pb-0"> {/* Adicionado pb-16 aqui */}
      
      {/* Coluna Esquerda: Conteúdo de Texto (60% em LG) */}
      <div className="section-content-wrapper relative z-10 pb-0 lg:pb-24">
        <p className="section-eyebrow !text-brand-gray">experimente agora</p>
        <h2 className="section-title text-white">
          Veja a Mágica Acontecer
        </h2>
        <p className="section-paragraph text-brand-gray mb-8">
          Clique no widget aiVoice e descubra como vamos transformar o seu site em uma poderosa ferramenta de geração de negócios e insights
        </p>
        <p className="impact-text text-white">
          Conheça a Thais: sua mais nova Funcionária do Ano
        </p>
      </div>

      {/* Coluna Direita: Imagem da Agente (40% em LG) */}
      <div className="relative w-full h-[50vh] lg:w-[40%] lg:h-auto flex-shrink-0 flex items-center justify-center">
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