"use client";

import Image from "next/image";

export const ExperimenteSection = () => {
  const backgroundImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1760683975/bg_aiVoice_thais_iinwzs.jpg";

  return (
    <section className="content-section bg-black text-white relative overflow-hidden">
      <Image
        src={backgroundImageSrc}
        alt="Fundo com a imagem da agente de voz Thais"
        fill
        className="object-cover -z-10" // Opacidade removida para 100%
        sizes="100vw"
      />
      <div className="section-content-wrapper">
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
    </section>
  );
};