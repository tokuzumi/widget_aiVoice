import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialIcons } from './social-icons';

const navigationLinks = [
  { href: "#", label: "Home" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing", label: "Planos" },
  { href: "#contact", label: "Contato" },
  { href: "#privacy", label: "Política de Privacidade" },
  { href: "#terms", label: "Termos de Uso" },
];

export const Footer = () => {
  const aiVoiceLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_150,c_limit,dpr_auto/v1757012939/aiVoice_white_h1iae6.png";
  const spadaGlobalLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1760729731/SpadaGlobal_logo_g9ut0f.png";

  return (
    <footer id="footer" className="bg-black text-brand-gray py-16 lg:py-24">
      <div className="container mx-auto px-8 lg:px-16">
        
        {/* Main Content Grid: Logos and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 pb-10">
          
          {/* Coluna 1: Logo aiVoice e Redes Sociais */}
          <div className="flex flex-col gap-6">
            <Image
              src={aiVoiceLogoSrc}
              alt="aiVoice Logo"
              width={150}
              height={35}
              className="transition-opacity duration-300 hover:opacity-80"
            />
            <SocialIcons />
          </div>

          {/* Coluna 2: Links de Navegação */}
          <nav className="md:col-span-1">
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

          {/* Coluna 3/4: Logo Spada Global e Informação de Comercialização */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4 lg:items-end lg:text-right">
            <p className="text-sm text-gray-400">Comercializado por:</p>
            <a 
              href="https://www.spadaglobal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-4 hover:opacity-80 transition-opacity lg:justify-end"
            >
              <Image
                src={spadaGlobalLogoSrc}
                alt="Spada Global Logo"
                width={150}
                height={35}
                className="w-[150px] h-auto"
              />
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} aiVoice. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};