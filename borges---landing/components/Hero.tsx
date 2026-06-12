import React from 'react';
import { ChevronDown, Play } from './Icons';
import { ASSETS } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#030305]">
      {/* Background Image with Official Borges Styling */}
      <div className="absolute inset-0 z-0 bg-[#030305]">
        <div 
          className="w-full h-full absolute inset-0"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(3, 3, 5, 0.4), rgba(3, 3, 5, 0.8)), url(${ASSETS.BANNER})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            WebkitImageRendering: '-webkit-optimize-contrast',
            imageRendering: 'crisp-edges',
          } as React.CSSProperties}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center">
          <p className="font-teko text-xl md:text-3xl font-light text-white max-w-4xl mx-auto tracking-[0.4em] uppercase italic opacity-95 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            "Música Pura, Letra Real"
          </p>

          <div className="flex flex-col md:flex-row gap-8 mt-48 w-full md:w-auto">
            <button 
               onClick={() => {
                 document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="px-10 py-4 bg-[#0D3A5C] border-2 border-[#0D3A5C] text-white hover:bg-transparent hover:text-white font-tech font-bold text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 transform hover:scale-105"
            >
              Portfolio
            </button>
            
            <button 
               onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-10 py-4 bg-transparent border-2 border-[#7A5A20] text-[#7A5A20] hover:bg-[#7A5A20] hover:text-white font-tech font-bold text-sm uppercase tracking-[0.3em] transition-all transform hover:scale-105"
            >
              Conóceme
            </button>
          </div>
          
          <div className="mt-8 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#0D3A5C]/50" />
          </div>
        </div>
      </div>
    </div>
  );
};