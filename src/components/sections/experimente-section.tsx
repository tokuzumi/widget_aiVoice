"use client";

import Image from "next/image";

export const ExperimenteSection = () => {
  const agentImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1760685315/bg_aiVoice_thais2_e8mf6v.jpg";

  return (
    <section className="content-section bg-black text-white relative overflow-hidden min-h-screen lg:flex-row lg:items-stretch">
      
      {/* Coluna Esquerda: Conteúdo de Texto (60% em LG) */}
      <div className="section-content-wrapper relative z-10">
        <p className="section-eyebrow !text-brand-gray">experimente agora</p>
        <h2 className="section-title text-white">
          Veja a Mágica Acontecer
        </h2>
        <p className="section-paragraph text-brand-gray mb-8">
          Agora você vai experimentar o impacto real. Informe o endereço do seu site e criaremos em alguns segundos um Agente de Voz treinado com o DNA do seu negócio, para você receber um atendimento em tempo-real. Descubra como vamos impactar os seus visitantes
        </p>
        <p className="impact-text text-white">
          Conheça a Thais: sua mais nova Funcionária do Ano
        </p>
      </div>

      {/* Coluna Direita: Imagem da Agente (40% em LG) */}
      <div className="relative w-full h-[50vh] lg:w-[40%] lg:h-auto flex-shrink-0 flex items-center justify-center"> {/* Adicionado flex items-center justify-center para centralizar o conteúdo */}
        <Image
          src={agentImageSrc}
          alt="Agente de voz Thais"
          fill
          className="object-contain" // Alterado para object-contain
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
        />
      </div>
    </section>
  );
};