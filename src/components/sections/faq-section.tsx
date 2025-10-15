import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FaqSection = () => {
  return (
    <section id="faq" className="content-section bg-black text-brand-gray relative items-start justify-start">
      {/* Wrapper para o título e parágrafo - mantém 60% de largura e alinhamento à esquerda em LG */}
      <div className="section-content-wrapper text-center lg:text-left relative z-10 pb-4 lg:pb-8">
        <p className="section-eyebrow">dúvidas frequentes</p>
        <h2 className="section-title text-white">
          Tudo o que você precisa saber
        </h2>
        <p className="section-paragraph text-brand-gray">
          Aqui você encontra as respostas para as perguntas mais comuns sobre a aiVoice e como ela pode transformar a interação no seu site.
        </p>
      </div>

      {/* Accordion Container - similar ao container do carrossel em IntroducingSection */}
      <div className="w-full px-8 lg:w-[70%] lg:mx-auto lg:px-0 mt-4 pb-16 lg:pb-24 relative z-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">Como funciona a integração com o meu site?</AccordionTrigger>
            <AccordionContent className="section-paragraph text-brand-gray">
              A integração é simples e rápida. Nossa equipe técnica cuidará de todo o processo, que geralmente envolve adicionar um pequeno trecho de código ao seu site. Não é necessário ter conhecimento técnico avançado.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">A voz da Thais pode ser personalizada?</AccordionTrigger>
            <AccordionContent className="section-paragraph text-brand-gray">
              Atualmente, a Thais possui uma voz padrão otimizada para naturalidade e clareza. Estamos trabalhando em futuras atualizações para oferecer mais opções de personalização de voz.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">O que acontece se eu atingir o limite do meu pack de atendimentos por voz?</AccordionTrigger>
            <AccordionContent className="section-paragraph text-brand-gray">
              Não se preocupe, você nunca perderá um lead. Se os créditos de voz acabarem, a Thais continuará a interagir com seus visitantes por meio de texto, garantindo que a conversa continue até que você possa adquirir um novo pack.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">A aiVoice funciona em qualquer tipo de site?</AccordionTrigger>
            <AccordionContent className="section-paragraph text-brand-gray">
              Sim, a aiVoice é compatível com a grande maioria das plataformas de sites, incluindo WordPress, Shopify, Webflow e sites customizados. Nossa equipe de implementação validará a compatibilidade durante o processo de onboarding.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">Quanto tempo leva para a IA aprender sobre o meu negócio?</AccordionTrigger>
            <AccordionContent className="section-paragraph text-brand-gray">
              O processo inicial de personalização e aprendizado leva até 30 dias durante a fase de implementação. A partir daí, a Thais continua aprendendo e se otimizando continuamente a cada nova interação, tornando-se cada vez mais inteligente e eficaz.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};