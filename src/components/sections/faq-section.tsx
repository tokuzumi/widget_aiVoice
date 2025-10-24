import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FaqSection = () => {
  const faqItems = [
    {
      question: "Como instalo o aiVoice no meu site?",
      answer: "A instalação é feita com a implementação de apenas uma linha de código no seu site.",
    },
    {
      question: "Quanto custa o aiVoice?",
      answer: "O custo varia de acordo com o volume de atendimentos. Ative a Thais para solicitar uma conversa sem compromisso com os nossos consultores.",
    },
    {
      question: "Qual é o limite de atendimentos concorrentes?",
      answer: "Para cada caso, fazemos um estudo e identificamos o limite ideal de atendimentos concorrentes. Atualmente, o limite máximo é de 30.000 atendimentos concorrentes.",
    },
    {
      question: "Consigo testar o aiVoice com as informações do meu negócio?",
      answer: "Sim, é totalmente possível. Utilize nosso widget para solicitar uma conversa com um dos nossos consultores.",
    },
    {
      question: "Como é feito o treinamento do meu aiVoice?",
      answer: "Através do nosso Dashboard, você acessará uma IA especializada, que vai te guiar no passo-a-passo, tanto para fazer o treinamento como para personalizar e manter seu conteúdo atualizado.",
    },
    {
      question: "Como funciona o Suporte Técnico?",
      answer: "Nosso suporte técnico funciona por e-mail e responde em até 24h.",
    },
    {
      question: "Existe uma versão White Label para revendedores?",
      answer: "Sim, temos condições especiais para quem procura uma solução robusta e funcional: o nosso aiVoice, com a sua marca, para os seus clientes.",
    },
    {
      question: "O aiVoice pode ser usado para Ligações telefônicas?",
      answer: "Sim, integramos com ligações convencionais e ligações por Whatsapp.",
    },
    {
      question: "Como faço para obter mais informações sobre o aiVoice?",
      answer: "É só clicar no widdget e pedir para a Thais agendar uma conversa com um dos nossos consultores.",
    },
  ];

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
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="section-paragraph text-brand-gray">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};