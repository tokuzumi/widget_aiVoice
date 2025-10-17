"use client";

import Image from "next/image";

export const ExperimenteSection = () => {
  const widgetImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_800/v1760598050/widget_aiVoice_xpowr8.png";

  return (
    <section className="content-section bg-black text-white relative">
      <div className="section-content-wrapper">
        <p className="section-eyebrow !text-brand-gray">experimente agora</p>
        <h2 className="section-title text-white">
          Veja a Mágica Acontecer
        </h2>
        <p className="section-paragraph text-brand-gray mb-8">
          Agora você vai experimentar o impacto real. Informe o endereço do seu site e criaremos em alguns segundos um Agente de Voz treinado com o DNA do seu negócio, para você receber um atendimento em tempo-real. Descubra como vamos impactar os seus visitantes
        </p>
        <p className="impact-text text-white mb-12">
          Conheça a Thais: sua mais nova Funcionária do Ano
        </p>

        {/* Imagem do Widget com borda branca */}
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] mx-auto max-w-2xl border border-white rounded-xl overflow-hidden">
          <Image
            src={widgetImageSrc}
            alt="Preview do widget aiVoice em um celular"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
};