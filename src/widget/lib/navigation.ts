import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registra o plugin do GSAP para a funcionalidade de rolagem.
// Isso só precisa ser feito uma vez na aplicação.
gsap.registerPlugin(ScrollToPlugin);

/**
 * Rola suavemente para uma seção específica da página usando GSAP.
 * A função assume que o Lenis está configurado com o scrollerProxy do GSAP.
 * @param sectionId O ID do elemento para o qual rolar (ex: "#pricing").
 */
export const scrollToSection = (sectionId: string) => {
  gsap.to(window, {
    duration: 1.5, // Duração da animação em segundos
    scrollTo: {
      y: sectionId,
      offsetY: 0 // Corrigido para 0 para um alinhamento exato
    },
    ease: 'power2.inOut', // Easing para uma animação suave
  });
};