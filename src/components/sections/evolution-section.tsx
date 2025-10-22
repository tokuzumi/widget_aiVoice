import Image from "next/image";
import { EvolutionTimeline } from "@/components/evolution-timeline";

export const EvolutionSection = () => {
  const backgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1759818792/aiVoice_bg_rrluyi.png";

  return (
    <section 
      id="evolution" 
      className="content-section bg-black text-white relative items-center justify-center"
    >
      <Image
        src={backgroundImage}
        alt="Background abstrato com partículas digitais"
        fill
        className="object-cover z-0"
        priority
      />
      
      <EvolutionTimeline />
    </section>
  );
};