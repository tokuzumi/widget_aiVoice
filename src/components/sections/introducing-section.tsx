"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { FeatureListItem } from "@/components/feature-list-item";
import { FileText, Sparkles, Mic, User, TrendingUp } from 'lucide-react';
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';

export const IntroducingSection = () => {
  const backgroundImage = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1759818792/aiVoice_bg_rrluyi.png";
  const newImageSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_225,c_limit,dpr_auto/v1759913615/aiVoice_logo_hero_eegjc3.png";

  const featureItems = [
    {
      itemNumber: "01",
      headerText: "O PROBLEMA",
      title: "Formulários: As Barreiras Silenciosas",
      description: "Formulários são um unilaterais e a verdade é que ninguém gosta de preencher. Também conhecida como \"fricção\", é um dos principais motivos para altas taxas de abandono.",
      keywords: [
        "Ultrapassados",
        "Fricção",
        "Abandono",
        "Baixa Conversão",
        "Unilaterais",
        "Leads Perdidos"
      ],
      IconComponent: FileText,
    },
    {
      itemNumber: "02",
      headerText: "A PRIMEIRA EVOLUÇÃO",
      title: "Chatbots de Texto: IA nos sites",
      description: "A evolução natural para quebrar a barreira foram os chatbots, que provaram o poder da interatividade para engajar visitantes. Iniciaram a transição de um site estático para ferramenta mais interativa, mostrando que a proatividade é o caminho para a conversão.",
      keywords: [
        "Chatbots",
        "Interatividade",
        "Bilaterais",
        "Atendimento Rápido",
        "Conversa por Texto",
        "Automação"
      ],
      IconComponent: Sparkles,
    },
    {
      itemNumber: "03",
      headerText: "MÁXIMO EM EFICIÊNCIA",
      title: "aiVoice: A Naturalidade no Atendimento",
      description: "A voz é o próximo salto evolutivo, eliminando a última barreira que restava: o teclado. Ao permitir que seus clientes falem naturalmente, a comunicação se torna até 4x mais rápida e intuitiva.",
      keywords: [
        "A Nata da IA",
        "Interação por Voz",
        "Praticidade",
        "Comunicação Natural",
        "Experiência Imersiva",
        "Inovação"
      ],
      IconComponent: Mic,
    },
    {
      itemNumber: "04",
      headerText: "A CONEXÃO HUMANA",
      title: "A Diferença Real é a Conexão",
      description: "Enquanto o texto é funcional, a voz é emocional. Ela consegue transmitir tom, empatia e confiança, criando uma conexão humana autêntica que acelera decisões e constroem uma experiência memorável.",
      keywords: [
        "Conexão Humana",
        "Empatia",
        "Confiança",
        "Experiência Memorável",
        "Percepção da Marca",
        "Engajamento Emocional"
      ],
      IconComponent: User,
    },
    {
      itemNumber: "05",
      headerText: "Informações Estratégicas",
      title: "Muito Além de Simples Respostas",
      description: "Exploramos o melhor que a naturalidade pode oferecer: de forma orgânica, extraímos informações estratégicas na medida em que o visitante engaja com o atendimento. Tudo isso é processado e te entragamos através de insights através do nosso Dashboard IA",
      keywords: [
        "Resultados",
        "Tecnologia de Ponta",
        "Leads Qualificados",
        "Ciclo de Vendas",
        "Inteligência de Negócio",
        "Conversão Máxima"
      ],
      IconComponent: TrendingUp,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <section id="introducing" className="content-section bg-black text-white relative items-start justify-start pb-24 lg:pb-0">
      <Image
        src={backgroundImage}
        alt="Background image for aiVoice Introducing Section"
        fill
        className="object-cover hidden lg:block z-0 h-screen"
        priority
      />

      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">por que aiVoice?</p>
        <h2 className="section-title text-white">
          A Melhor Solução de Atendimento com IA para Sites
        </h2>
        <p className="section-paragraph text-brand-gray">
          A era dos Smart Sites já começou. A verdadeira questão não é mais SE você vai usar IA, mas COMO vai usá-la para criar uma vantagem real. É aqui que a aiVoice vai se tornar o seu maior diferencial.
        </p>
      </div>

      <div className="w-full px-8 lg:w-[70%] lg:mx-auto lg:px-0 mt-4 pb-16 lg:pb-24 relative z-10">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {featureItems.map((item, index) => (
              <div className="embla__slide flex-[0_0_100%] min-w-0" key={index}>
                <FeatureListItem
                  itemNumber={item.itemNumber}
                  title={item.title}
                  description={item.description}
                  keywords={item.keywords}
                  headerText={item.headerText}
                  IconComponent={item.IconComponent}
                  totalItems={featureItems.length}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Image
        src={newImageSrc}
        alt="aiVoice Logo"
        width={225}
        height={53}
        className="block lg:hidden mx-auto mt-8 relative z-10"
      />
    </section>
  );
};