import React from 'react';
import { Mic2, Sliders, Headphones, Check } from './Icons';

interface ServiceTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  recommended?: boolean;
  formUrl: string;
}

const ServiceTier: React.FC<ServiceTierProps> = ({ title, description, features, icon, recommended, formUrl }) => (
  <div className={`relative p-8 border flex flex-col h-full transition-all group hover:-translate-y-2 ${
    recommended 
      ? 'bg-neutral-900 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)] z-10' 
      : 'bg-black border-neutral-800 hover:border-neutral-700'
  }`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-black px-4 py-1.5 uppercase tracking-widest skew-x-[-10deg]">
        <span className="skew-x-[10deg] inline-block">Popular</span>
      </div>
    )}
    
    <div className="mb-8 border-b border-neutral-800 pb-8">
      <div className={`w-14 h-14 flex items-center justify-center mb-6 border ${
        recommended ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-neutral-900 text-white border-neutral-800'
      }`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight font-display">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
    </div>

    <ul className="space-y-4 mb-10 flex-1">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 font-medium">
          <Check className={`w-5 h-5 shrink-0 ${recommended ? 'text-yellow-500' : 'text-neutral-600'}`} />
          {feature}
        </li>
      ))}
    </ul>

    <a 
      href={formUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-full py-4 text-center font-bold uppercase tracking-widest transition-all skew-x-[-10deg] ${
        recommended 
          ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
          : 'bg-white hover:bg-neutral-200 text-black'
      }`}
    >
      <span className="skew-x-[10deg] inline-block">Solicitar Información</span>
    </a>
  </div>
);

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-4 bg-black border-t border-neutral-900 relative">
       {/* Background accent */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-3 py-1 border border-neutral-800 text-neutral-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Ecosistema LC WORLD
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter font-display">
            ACCEDE A LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">MÁQUINA</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light">
            No vendemos archivos; entregamos una carrera. 
            Selecciona el nivel de compromiso para tu proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ServiceTier 
            title="Beat Personalizado"
            description="Producción a medida basada en tu identidad artística. Sonido exclusivo LC."
            icon={<Sliders className="w-7 h-7" />}
            formUrl="https://forms.gle/pw2Eh91zWm6f8iuq9"
            features={[
              "Composición exclusiva",
              "Arreglos estructurales",
              "Protocolo de identidad de sonido",
              "Stems y archivos WAV",
              "Derechos de uso profesional"
            ]}
          />
          
          <ServiceTier 
            title="Canción Completa"
            description="El estándar de producción del estudio. De la idea al master final."
            icon={<Mic2 className="w-7 h-7" />}
            recommended={true}
            formUrl="https://forms.gle/UHv4aLaj7bDGYGDQ6"
            features={[
              "Grabación y Coaching Vocal",
              "Composición + Beatmaking",
              "Mezcla y Mastering Pro",
              "Análisis de viabilidad comercial",
              "Revisiones estratégicas"
            ]}
          />
 
          <ServiceTier 
            title="Más que una Canción"
            description="Protocolo de Cuarentena. Estrategia, identidad y acompañamiento integral."
            icon={<Headphones className="w-7 h-7" />}
            formUrl="https://forms.gle/zD2UB2XFpQWBKcgC9"
            features={[
              "Plataforma completa de artista",
              "Estrategia de Lanzamiento",
              "Gestión de Redes y Tráfico",
              "Diseño de Identidad Visual",
               "Acceso al Ecosistema LC WORLD",
              "Distribución y Plan de Medios"
            ]}
          />
        </div>
      </div>
    </section>
  );
};