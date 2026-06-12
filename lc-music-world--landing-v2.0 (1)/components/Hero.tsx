import React from 'react';
import { ChevronDown, Play } from './Icons';
import { ASSETS } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Urban/Grit Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <div 
          className="w-full h-full absolute inset-0"
          style={{ 
            backgroundColor: '#000000',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ASSETS.BANNER})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
            // @ts-ignore
            msInterpolationMode: 'nearest-neighbor',
            WebkitImageRendering: 'optimize-contrast',
            imageRendering: 'crisp-edges',
            filter: 'brightness(0.6)'
          } as React.CSSProperties}
        />
        {/* Grain/Texture effect overlay (Noise) */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-8 mt-64 w-full md:w-auto">
          <a 
             href="https://forms.gle/zD2UB2XFpQWBKcgC9"
             target="_blank"
             rel="noopener noreferrer"
             className="px-10 py-4 bg-black/60 border-2 border-[#CC2020] text-white hover:bg-[#CC2020] hover:text-white font-bold text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 transform hover:scale-105"
          >
            Más que una carrera
          </a>
          
          <button 
             onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-10 py-4 bg-transparent border-2 border-[#E08030] text-white hover:bg-[#E08030] hover:text-white font-bold text-sm uppercase tracking-[0.3em] transition-all transform hover:scale-105"
          >
            Servicios
          </button>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <p className="font-teko text-2xl md:text-4xl font-light text-white max-w-4xl mx-auto tracking-[0.4em] uppercase italic opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            "Nosotros somos la máquina, tú el director."
          </p>
          
          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-8 h-8 text-neutral-600" />
          </div>
        </div>
      </div>
    </div>
  );
};