import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

interface SocialIconProps {
  Icon: React.ElementType;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, label }) => (
  <div
    className="text-brand-gray transition-colors duration-200 cursor-default" // Removido hover:text-white e cursor-default para indicar inatividade
    aria-label={label}
  >
    <Icon className="h-6 w-6" />
  </div>
);

export const SocialIcons: React.FC = () => {
  const socialLinks = [
    { Icon: Instagram, label: "Instagram" },
    { Icon: Youtube, label: "YouTube" },
  ];

  return (
    <div className="flex space-x-6">
      {socialLinks.map((link, index) => (
        <SocialIcon key={index} {...link} />
      ))}
    </div>
  );
};