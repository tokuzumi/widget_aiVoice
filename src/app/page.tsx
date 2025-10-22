"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PainSection } from "@/components/sections/pain-section";
import { EvolutionSection } from "@/components/sections/evolution-section";
import { IntroducingSection } from "@/components/sections/introducing-section";
import { ExperimenteSection } from "@/components/sections/experimente-section";
import { HowYouManageSection } from "@/components/sections/how-you-manage-section";
import { FaqSection } from "@/components/sections/faq-section";
import { LenisProvider } from "@/components/lenis-provider";
import { AiVoiceWidget } from "@/widget/ai-voice-widget";
import { WhyWeAreDifferentSection } from "@/components/sections/why-we-are-different-section";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Apenas a limpeza do ScrollTrigger permanece, caso haja outras animações.
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <LenisProvider>
      <HeroSection />
      <PainSection />
      <EvolutionSection />
      <WhyWeAreDifferentSection />
      <IntroducingSection />
      <ExperimenteSection />
      <HowYouManageSection />
      <FaqSection />

      <Footer />
      
      {/* Renderiza o widget de voz, passando a configuração via props */}
      <AiVoiceWidget 
        tokenApiUrl={process.env.NEXT_PUBLIC_TOKEN_API_URL!}
        solution={process.env.NEXT_PUBLIC_SOLUTION!}
        clientId={process.env.NEXT_PUBLIC_CLIENTID!}
      />
    </LenisProvider>
  );
}