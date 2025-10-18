import Image from "next/image";

export const HeroSection = () => {
  const heroBackgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_1920/v1758347951/aiVoice_hero_bg_r2gfk0.jpg";

  return (
    <section
      id="hero"
      className="relative min-h-screen text-white flex flex-col items-center justify-center lg:flex-row lg:justify-start overflow-hidden"
    >
      <Image
        src={heroBackgroundImage}
        alt="Fundo abstrato com ondas de som e partículas digitais, representando a tecnologia de voz da IA."
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="w-full px-8 py-16 text-center lg:w-3/4 lg:px-16 lg:py-24 lg:text-left h-full flex flex-col justify-center"> {/* Ajustado o padding vertical */}
        <h1 className="hero-title">
          Seu site agora Fala, Navega e Encanta cada Visitante
        </h1>
        <p className="hero-subtitle">
          Surpreenda sua audiência com nosso Agente Web de Voz, a primeira IA que entende seus visitantes e entrega conteúdo de forma personalizada, em tempo-real, criando uma experiência única e memorável.
        </p>
        <Image
          src="https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_225,c_limit,dpr_auto/v1757012939/aiVoice_white_h1iae6.png"
          alt="aiVoice Logo"
          width={225}
          height={53}
          className="transition-transform duration-300 hover:scale-105 inline-block mx-auto lg:mx-0"
        />
      </div>
      <div className="hidden lg:block lg:w-1/4">
        {/* Esta área de 25% está reservada para imagens e é oculta em telas pequenas */}
      </div>
    </section>
  );
};