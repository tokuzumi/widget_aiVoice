import React from 'react';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="bg-black text-brand-gray py-8"> {/* Alterado de bg-overlay para bg-black */}
      <div className="container mx-auto px-8 lg:px-16 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div className="mb-4 sm:mb-0">
           <Image
            src="https://res.cloudinary.com/dco1sm3hy/image/upload/f_auto,q_auto,w_150,c_limit,dpr_auto/v1757012939/aiVoice_white_h1iae6.png"
            alt="aiVoice Logo"
            width={150}
            height={35}
            className="transition-opacity duration-300 hover:opacity-80"
          />
        </div>
        <div className="text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} aiVoice. Todos os direitos reservados.</p>
          <p className="text-gray-500">Uma empresa TkzM Ai Studio.</p>
        </div>
      </div>
    </footer>
  );
};