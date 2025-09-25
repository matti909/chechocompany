'use client';

import { useEffect, useState } from 'react';

export function MouseGraviton() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Luz principal que sigue al cursor */}
      <div
        className="fixed pointer-events-none z-30 transition-opacity duration-300"
        style={{
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />
      
      {/* Luz más pequeña e intensa en el centro */}
      <div
        className="fixed pointer-events-none z-31 transition-opacity duration-200"
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(101, 163, 13, 0.12) 0%, rgba(101, 163, 13, 0.06) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Núcleo central muy sutil */}
      <div
        className="fixed pointer-events-none z-32"
        style={{
          left: mousePos.x - 25,
          top: mousePos.y - 25,
          width: '50px',
          height: '50px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(15px)',
        }}
      />
    </>
  );
}