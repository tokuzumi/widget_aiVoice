import Image from "next/image";
import { EvolutionTimeline } from "@/components/evolution-timeline";

export const EvolutionSection = () => {
  const backgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1759818792/aiVoice_bg_rrluyi.png";

  return (
    <section 
      id="evolution" 
      className="content-section bg-black text-white relative items-start justify-center"
    >
      <Image
        src={backgroundImage}
        alt="Background abstrato com partículas digitais"
        fill
        className="object-cover z-0"
        priority
      />
      
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">a evolução</p>
        <h2 className="section-title text-white">
          A Nova Geração de Sites
        </h2>
      </div>

      {/* O container agora é full-width, permitindo que a timeline controle seu próprio layout interno */}
      <div className="w-full mt-4 pb-16 lg:pb-24 relative z-10">
        <EvolutionTimeline />
      </div>
    </section>
  );
};