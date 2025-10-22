import Image from "next/image";

export const EvolutionSection = () => {
  const backgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1759818792/aiVoice_bg_rrluyi.png";

  return (
    <section 
      id="evolution" 
      className="content-section bg-black text-white relative items-start justify-start"
    >
      <Image
        src={backgroundImage}
        alt="Background abstrato com partículas digitais"
        fill
        className="object-cover z-0"
        priority
      />
      
      <div className="section-content-wrapper text-center lg:text-left relative z-10">
        <p className="section-eyebrow">a evolução</p>
        <h2 className="section-title text-white">
          A Nova Geração de Sites
        </h2>
      </div>
    </section>
  );
};