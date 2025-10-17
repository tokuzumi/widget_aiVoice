"use client";

// Removido import Image from "next/image";

export const ExperimenteSection = () => {
  // Removido const backgroundImageSrc

  return (
    <section className="content-section bg-black text-white relative overflow-hidden"> {/* Reintroduzindo bg-black para garantir o fundo escuro da seção */}
      
      {/* Fundo preto e imagem de fundo removidos */}
      
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
    </section>
  );
};