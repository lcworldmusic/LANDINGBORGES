import React from 'react';

const steps = [
  { id: '01', label: 'IDENTIDAD' },
  { id: '02', label: 'COMPOSICIÓN' },
  { id: '03', label: 'PRODUCCIÓN' },
  { id: '04', label: 'MEZCLA' },
  { id: '05', label: 'MASTERING' },
  { id: '06', label: 'ESTRATEGIA' },
  { id: '07', label: 'LANZAMIENTO' },
];

export const Structure: React.FC = () => {
  return (
    <div className="w-full">
      {/* Background decoration - very subtle */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0D3A5C]/5 blur-[150px] -z-10 rotate-12 transform translate-x-1/2"></div>
      
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative">
          <h2 className="text-[10vw] md:text-7xl font-bold uppercase tracking-tighter font-display leading-none select-none">
            <span className="text-white">LA</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D3A5C] from-65% to-[#7A5A20]">
              ESTRUCTURA
            </span>
          </h2>
        </div>
      </div>

      {/* Steps Timeline - Back to Circles */}
      <div className="relative mt-8">
        {/* Horizontal Line (Desktop) */}
        <div className="absolute top-6 left-0 w-full h-[1px] bg-[#0D3A5C]/20 hidden md:block">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#7A5A20]/20 to-transparent w-full"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-y-12 gap-2 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center group">
              <div className="relative mb-4">
                {/* Outer circle */}
                <div className="w-12 h-12 rounded-full border border-[#0D3A5C]/30 bg-[#030305] flex items-center justify-center font-tech text-sm group-hover:border-[#7A5A20]/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] relative z-10">
                  <span className="text-[#7A5A20] font-bold">
                     {step.id}
                  </span>
                </div>
                {/* Diffused glow effect */}
                <div className="absolute inset-0 bg-[#7A5A20] blur-xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full -z-10" />
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-tech font-bold tracking-[0.2em] uppercase text-neutral-600 group-hover:text-[#7A5A20] transition-colors duration-300 text-center">
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
