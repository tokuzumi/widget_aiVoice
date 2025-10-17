"use client";

import Image from "next/image";

export const ExperimenteSection = () => {
  const widgetImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_800/v1760598050/widget_aiVoice_xpowr8.png";

  return (
    <section className="content-section bg-white text-black relative">
      <div className="section-content-wrapper">
        <p className="section-eyebrow">experimente agora</p>
        <h2 className="section-title text-black">
          Veja a Mágica Acontecer
        </h2>
        <p className="section-paragraph text-black mb-8">
          Agora você vai experimentar o impacto real. Informe o endereço do seu site e criaremos em alguns segundos um Agente de Voz treinado com o DNA do seu negócio, para você receber um atendimento em tempo-real. Descubra como vamos impactar os seus visitantes
        </p>
        <p className="impact-text text-black">
          Conheça a Thais: sua mais nova Funcionária do Ano
        </p>

        {/* O formulário, botão e tooltip foram removidos daqui. */}
      </div>
      
      {/* Imagem do Widget no lado direito (oculta em telas pequenas) */}
      <div className="hidden lg:block lg:w-[40%] h-full absolute top-0 right-0 z-0">
        <Image
          src={widgetImageSrc}
          alt="Preview do widget aiVoice em um celular"
          fill
          className="object-contain object-right p-16"
          sizes="(max-width: 1024px) 0vw, 40vw"
        />
      </div>
    </section>
  );
};