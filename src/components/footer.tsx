import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialIcons } from './social-icons';

const navigationLinks = [
  { href: "#hero", label: "Home" },
  { href: "#faq", label: "FAQ" },
  { href: "#footer", label: "Contato" },
];

const legalLinks = [
  { href: "#privacy", label: "Política de Privacidade" },
  { href: "#terms", label: "Termos de Uso" },
];

export const Footer = () => {
  const aiVoiceLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_150,c_limit,dpr_auto/v1757012939/aiVoice_white_h1iae6.png";
  const spadaGlobalLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1760729731/SpadaGlobal_logo_g9ut0f.png";

  return (
    <footer id="footer" className="bg-black text-brand-gray py-16 lg:py-24">
      <div className="container mx-auto px-8 lg:px-16">
        
        {/* Main Content Grid: 4 Columns Simétricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pb-10 border-b border-gray-800">
          
          {/* Coluna 1: Logo Spada Global e Texto de Comercialização */}
          <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
            <a 
              href="https://www.spadaglobal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity inline-block max-w-[150px]"
            >
              <Image
                src={spadaGlobalLogoSrc}
                alt="Spada Global Logo"
                width={150}
                height={42}
                className="w-[150px] h-auto"
              />
            </a>
            <div className="text-sm text-gray-400 max-w-xs">
              <p>Inteligência Artificial para Negócios</p>
              <p className="mt-1">Desenvolvendo soluções estrategicamente customizadas desde 1.990.</p>
              <a 
                href="https://www.spadaglobal.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link-underline link-underline-white hover:text-white mt-1 inline-block"
              >
                www.SpadaGlobal.com
              </a>
            </div>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <nav className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Navegação</h4>
            <ul className="flex flex-col space-y-3 text-base">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 link-underline link-underline-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 3: Links Legais */}
          <nav className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="flex flex-col space-y-3 text-base">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 link-underline link-underline-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Coluna 4: Redes Sociais */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start lg:items-end">
            <h4 className="text-lg font-semibold text-white mb-4 lg:text-right w-full">Siga-nos</h4>
            <SocialIcons />
          </div>
        </div>

        {/* Bottom Section: Copyright e Logo aiVoice */}
        <div className="pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="text-sm text-gray-400 order-2 sm:order-1">
            <p>&copy; {new Date().getFullYear()} aiVoice. Todos os direitos reservados.</p>
          </div>

          {/* Logo aiVoice */}
          <div className="order-1 sm:order-2">
            <Image
              src={aiVoiceLogoSrc}
              alt="aiVoice Logo"
              width={100}
              height={23}
              className="transition-opacity duration-300 hover:opacity-80 w-[100px] h-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};