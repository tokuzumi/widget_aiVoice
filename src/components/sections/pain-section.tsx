"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
// Removido import Image from "next/image";

export const PainSection = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  // Removida a constante imageUrl

  useEffect(() => {
    if (textRef.current) {
      const annotation = annotate(textRef.current, {
        type: "bracket",
        color: "var(--accent)", // Usando a variável CSS para a cor accent
        brackets: ["left", "right"],
        strokeWidth: 2,
        padding: 10,
      });
      annotation.show();

      // Cleanup function to hide/remove annotation if component unmounts
      return () => {
        annotation.hide();
      };
    }
  }, []);

  return (
    <section className="content-section bg-pain-bg text-black min-h-[70vh]"> {/* Alterado min-h-[50vh] para min-h-[70vh] */}
      <div className="section-content-wrapper text-left">
        <p className="section-eyebrow !text-black">sobre sites com formulários ...</p>
        <p ref={textRef} className="impact-text text-black mb-8">
          seu site ainda usa um recurso dos anos 90 para gerar negócios em 2025?
        </p>
        {/* O segundo parágrafo impact-text foi removido */}
      </div>
    </section>
  );
};