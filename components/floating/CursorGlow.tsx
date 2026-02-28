"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      // pointer-events-none garante que o brilho não atrapalhe os cliques do usuário
      // hidden dark:md:block garante que só apareça no PC e no Modo Escuro
      className="pointer-events-none fixed inset-0 z-30 hidden dark:md:block transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(76, 175, 79, 0.08), transparent 80%)`,
      }}
    />
  );
}