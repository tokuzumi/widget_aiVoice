import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialIcons } from './social-icons';

const navigationLinks = [
  { href: "#", label: "Home" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing", label: "Planos" },
  { href: "#contact", label: "Contato" },
];

export const Footer = () => {
  const aiVoiceLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_150,c_limit,dpr_auto/v1757012939/aiVoice_white_h1iae6.png";
  const spadaGlobalLogoSrc = "https://res.cloudinary.com/dco1sm3hy/image/upload/v1760729731/SpadaGlobal_logo_g9ut0f.png";

  return (
    <footer id="footer" className="bg-black text-brand-gray py-16 lg:py-24">
      <div className="container mx-auto px-8 lg:px-16">
        
        {/* Top Section: Logo, Navigation, and Social Icons */}
        <div className="flex flex-col lg:flex-row justify-between items-start border-b border-gray-800 pb-10 mb-10">
          
          {/* Logo aiVoice */}
          <div className="mb-8 lg:mb-0">
            <Image
              src={aiVoiceLogoSrc}
              alt="aiVoice Logo"
              width={150}
              height={35}
              className="transition-opacity duration-300 hover:opacity-80"
            />
          </div>

          {/* Navigation Links */}
          <nav className="mb-8 lg:mb-0">
            <ul className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 text-lg font-medium">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-200 link-underline link-underline-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons */}
          <SocialIcons />
        </div>

        {/* Bottom Section: Copyright and Spada Global Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          
          {/* Copyright */}
          <div className="text-sm text-gray-400 mb-6 sm:mb-0">
            <p>&copy; {new Date().getFullYear()} aiVoice. Todos os direitos reservados.</p>
          </div>

          {/* Spada Global Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
            <p className="text-center sm:text-right">Comercializado por:</p>
            <a 
              href="https://www.spadaglobal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src={spadaGlobalLogoSrc}
                alt="Spada Global Logo"
                width={100}
                height={25}
                className="w-24 h-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};