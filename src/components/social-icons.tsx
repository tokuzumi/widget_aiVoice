import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

interface SocialIconProps {
  href: string;
  Icon: React.ElementType;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-brand-gray hover:text-white transition-colors duration-200"
    aria-label={label}
  >
    <Icon className="h-6 w-6" />
  </a>
);

export const SocialIcons: React.FC = () => {
  const socialLinks = [
    { href: "#", Icon: Instagram, label: "Instagram" },
    { href: "#", Icon: Youtube, label: "YouTube" },
  ];

  return (
    <div className="flex space-x-6">
      {socialLinks.map((link, index) => (
        <SocialIcon key={index} {...link} />
      ))}
    </div>
  );
};