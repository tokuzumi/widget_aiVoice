"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PainSection } from "@/components/sections/pain-section";
import { IntroducingSection } from "@/components/sections/introducing-section";
import { ExperimenteSection } from "@/components/sections/experimente-section";
import { HowYouManageSection } from "@/components/sections/how-you-manage-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { LenisProvider } from "@/components/lenis-provider";
import { AiVoiceWidget } from "@/components/ai-voice-widget";

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
      <IntroducingSection />
      <ExperimenteSection />
      <HowYouManageSection />
      <PricingSection />
      <FaqSection />

      <Footer />
      
      {/* Renderiza o widget de voz */}
      <AiVoiceWidget />
    </LenisProvider>
  );
}