# aiVoice Widget - Guia de Integração

Este documento fornece todas as instruções necessárias para integrar o aiVoice Widget em qualquer projeto Next.js que utilize Tailwind CSS.

## 1. Copiar o Módulo

Copie todo o diretório `widget` para o diretório `src` do seu projeto de destino.

```
/seu-projeto
└── /src
    └── /widget  <-- Copie esta pasta inteira
```

## 2. Instalar Dependências

O widget requer as seguintes dependências. Adicione-as ao seu arquivo `package.json` e execute o comando de instalação (`npm install`, `yarn install`, etc.).

```json
{
  "dependencies": {
    "@livekit/components-react": "...",
    "livekit-client": "...",
    "lucide-react": "...",
    "clsx": "...",
    "tailwind-merge": "..."
  }
}
```
*(Nota: As versões exatas podem ser copiadas do `package.json` do projeto original para garantir compatibilidade.)*

## 3. Configurar Tailwind CSS

Para que os estilos do widget sejam aplicados, adicione o caminho para o diretório do widget no arquivo `tailwind.config.ts` do seu projeto.

```typescript
// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widget/**/*.{js,ts,jsx,tsx,mdx}", // <-- Adicione esta linha
  ],
  // ... resto da configuração
};
export default config;
```
**Importante:** Após modificar a configuração do Tailwind, reinicie o servidor de desenvolvimento.

## 4. Integrar o Componente

Importe e renderize o `AiVoiceWidget` no layout principal da sua aplicação (`src/app/layout.tsx` ou similar) para que ele esteja disponível em todas as páginas.

Você precisará fornecer as credenciais específicas do site como propriedades para o componente.

```tsx
// Exemplo em src/app/layout.tsx

import { AiVoiceWidget } from "@/widget/ai-voice-widget";

export default function RootLayout({ children }: { children: React.Node }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        <AiVoiceWidget 
          tokenApiUrl={process.env.NEXT_PUBLIC_TOKEN_API_URL!}
          solution={process.env.NEXT_PUBLIC_SOLUTION!}
          clientId={process.env.NEXT_PUBLIC_CLIENTID!}
        />
      </body>
    </html>
  );
}
```

## 5. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do seu projeto e adicione as seguintes variáveis com os valores fornecidos para o site específico:

```
NEXT_PUBLIC_TOKEN_API_URL=URL_DA_API_DE_TOKEN_AQUI
NEXT_PUBLIC_SOLUTION=NOME_DA_SOLUCAO_AQUI
NEXT_PUBLIC_CLIENTID=ID_DO_CLIENTE_AQUI