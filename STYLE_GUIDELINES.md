# Diretrizes de Estilo do Projeto

Este documento descreve os padrões e as diretrizes de estilo que devem ser rigorosamente seguidos em todo o projeto. A adesão a estas regras é fundamental para manter a consistência visual, a manutenibilidade do código e a eficiência do desenvolvimento.

## 1. Uso Exclusivo de Tailwind CSS

*   **Abordagem Utility-First**: Toda a estilização deve ser realizada utilizando exclusivamente as classes utilitárias do Tailwind CSS.
*   **Proibição de CSS-in-JS e Outros Frameworks**: Não é permitido o uso de bibliotecas de CSS-in-JS (como Styled Components, Emotion) ou outros frameworks de estilização que não sejam o Tailwind CSS.
*   **Estilos Inline**: Evitar ao máximo a utilização de estilos inline diretamente nos elementos HTML/JSX.

## 2. Variáveis CSS para Tematização Global

*   **`src/app/globals.css` como Fonte Única**: Todas as definições de variáveis CSS para cores, tamanhos e outras propriedades globais devem residir no arquivo `src/app/globals.css`.
*   **Paleta de Cores Centralizada**: As cores da aplicação são definidas através de variáveis CSS (ex: `--black`, `--white`, `--accent`, `--background`, `--foreground`).
*   **Suporte a Dark Mode**: O tema escuro é implementado através da redefinição dessas variáveis CSS dentro do seletor `.dark` em `src/app/globals.css`.
*   **Mapeamento no `tailwind.config.ts`**: As variáveis CSS devem ser mapeadas para nomes de cores no `tailwind.config.ts` para permitir o uso de classes Tailwind como `bg-black`, `text-accent`, etc.

## 3. Classes de Componentes Reutilizáveis (`@layer components`)

Estilos complexos ou repetitivos para elementos de layout e tipografia devem ser definidos como classes CSS personalizadas dentro da camada `@layer components` em `src/app/globals.css` e reutilizadas nos componentes.

*   **Pré-Título (Eyebrow) - `.section-eyebrow`**:
    ```css
    @apply text-sm md:text-base lg:text-lg font-normal mb-2;
    ```
    *   **Uso**: Para textos introdutórios ou categorias acima de um título principal.

*   **Título - `.section-title`**:
    ```css
    @apply text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1] md:leading-tight max-w-4xl;
    ```
    *   **Uso**: Para os títulos principais das seções.

*   **Parágrafo - `.section-paragraph`**:
    ```css
    @apply text-sm md:text-base lg:text-lg font-normal max-w-4xl leading-relaxed;
    ```
    *   **Uso**: Para blocos de texto padrão.

*   **Texto de Impacto - `.impact-text`**:
    ```css
    @apply text-2xl md:text-3xl lg:text-4xl font-normal mb-8 leading-tight;
    ```
    *   **Uso**: Para frases ou parágrafos que precisam de destaque visual significativo.

*   **Seção de Conteúdo - `.content-section`**:
    ```css
    @apply min-h-screen flex flex-col items-center justify-center relative lg:items-start;
    ```
    *   **Uso**: Define a estrutura básica de uma seção, garantindo altura mínima e alinhamento.

*   **Wrapper de Conteúdo da Seção - `.section-content-wrapper`**:
    ```css
    @apply w-full lg:w-[60%] flex flex-col justify-center p-8 lg:p-16;
    ```
    *   **Uso**: Define a largura e o **padding interno** do conteúdo dentro de uma seção, garantindo espaçamento consistente em diferentes tamanhos de tela.

## 4. Gerenciamento de Fontes

*   **Fonte Exclusiva `ppNeueMontreal`**: A única família de fontes permitida em todo o projeto é a `ppNeueMontreal`.
*   **Otimização com `next/font/local`**: A fonte `ppNeueMontreal` deve ser importada e configurada usando `next/font/local` em `src/app/layout.tsx` para otimização de carregamento.
*   **Variável CSS para Fonte**: A fonte deve ser exposta como uma variável CSS (ex: `--font-pp-neue-montreal`).
*   **Configuração no `tailwind.config.ts`**: A variável da fonte deve ser definida como a fonte padrão para a categoria `sans` no `tailwind.config.ts`, garantindo que todos os elementos que usam `font-sans` herdem `ppNeueMontreal`.

## 5. Animações

*   **`tailwindcss-animate` e Radix UI**: Para animações de UI padrão, utilize o plugin `tailwindcss-animate` e as capacidades de animação integradas aos componentes do Radix UI (base do Shadcn/UI).
*   **GSAP para Animações Complexas**: Para animações mais elaboradas, especialmente aquelas baseadas em scroll ou interações complexas, a biblioteca GSAP (GreenSock Animation Platform) deve ser utilizada, preferencialmente com o plugin `ScrollTrigger`.
*   **Rough Notation para Destaques Visuais**: Para efeitos de anotação e destaque desenhados à mão, a biblioteca `rough-notation` é a ferramenta designada.
*   **Gerenciamento com `useEffect`**: A lógica de inicialização e limpeza de animações deve ser encapsulada em `useEffect` hooks nos componentes React.

## 6. Otimização de Imagens

*   **`next/image` Obrigatório**: Todas as imagens devem ser carregadas utilizando o componente `next/image` do Next.js para garantir otimização automática (redimensionamento, formatos modernos, lazy loading).
*   **Hospedagem Externa**: As imagens devem ser hospedadas em serviços como o Cloudinary, conforme a configuração atual do `next.config.ts`.
*   **Atributo `fill` para Fundos**: Para imagens de fundo que devem cobrir um elemento pai, utilize o atributo `fill` em `next/image`.