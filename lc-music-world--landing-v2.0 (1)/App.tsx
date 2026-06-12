
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { BeatList } from './components/BeatList';
import { AudioPlayer } from './components/AudioPlayer';
import { CartDrawer } from './components/CartDrawer';
import { LyricAssistant } from './components/LyricAssistant';
import { Structure } from './components/Structure';
import { Services } from './components/Services';
import { AdminUpload } from './components/AdminUpload';
import { ShoppingCart, Music, Globe, Loader, Lock, ChevronDown, ChevronUp } from './components/Icons';
import { Beat, CartItem, LicenseType, LICENSE_PRICES } from './types';
import { supabase } from './services/supabaseClient';
import { ASSETS } from './constants';

function CollapsibleSection({ 
  title, 
  children, 
  isOpen, 
  onToggle, 
  id 
}: { 
  title: React.ReactNode; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
  id?: string;
}) {
  return (
    <div id={id} className={`border-b border-neutral-900 transition-all duration-500 relative bg-black transition-colors`}>
      <button 
        onClick={onToggle}
        className="w-full py-8 px-4 flex items-center justify-between group hover:bg-neutral-900/10 transition-colors"
      >
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex-1 text-left">
            {title}
          </div>
          <div className={`p-2 rounded-full border border-neutral-900 group-hover:border-red-600/50 transition-all duration-300 ${isOpen ? 'rotate-180 bg-red-600/10' : ''}`}>
            <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-red-600' : 'text-neutral-700 group-hover:text-white'}`} />
          </div>
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100 py-16' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    catalog: false,
    origin: false,
    structure: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const GRADIENT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-600";

  if (isLoading) {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
              <Loader className="w-10 h-10 text-red-600 animate-spin mb-4" />
              <p className="font-display tracking-widest uppercase">Cargando Estudio...</p>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-24 h-24 flex items-center justify-center transform group-hover:scale-105 transition-all drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <img src={ASSETS.LOGO} alt="LC WORLD Logo" className="w-full h-full object-contain mix-blend-lighten" />
            </div>
          </div>

          <div className="flex items-center gap-12">
            <button 
                onClick={() => {
                  setOpenSections(prev => ({ ...prev, catalog: true }));
                  setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-400 hover:text-white transition-colors"
            >
                Catálogo
            </button>
            <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-400 hover:text-white transition-colors"
            >
                ACCEDE A LA MÁQUINA
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Hero />
        
        {/* Desplegable: Catálogo */}
        <CollapsibleSection
          id="catalog"
          title={
            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] font-rubik flex items-center`}>
              <span className="text-white mr-6 text-xl md:text-2xl">01</span>
              <span className={GRADIENT_TEXT}>CATÁLOGO</span>
            </h2>
          }
          isOpen={openSections.catalog}
          onToggle={() => toggleSection('catalog')}
        >
          <div className="transform scale-90 origin-top">
            <BeatList 
              beats={[]}
              currentBeat={null}
              isPlaying={false}
              onPlay={() => {}}
              onPause={() => {}}
              onAddToCart={() => {}}
              onOpenLyricAssistant={() => {}}
            />
          </div>
        </CollapsibleSection>

        {/* Desplegable: El Origen */}
        <CollapsibleSection
          id="origin"
          title={
            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] font-rubik flex items-center`}>
              <span className="text-white mr-6 text-xl md:text-2xl">02</span>
              <span className={GRADIENT_TEXT}>EL ORIGEN</span>
            </h2>
          }
          isOpen={openSections.origin}
          onToggle={() => toggleSection('origin')}
        >
          <div 
            className="relative text-center py-48 transform scale-90 origin-top overflow-hidden rounded-lg border border-neutral-900 group"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${ASSETS.BANNER})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
             <div className="relative z-10 transition-all duration-700 group-hover:scale-105">
               <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter italic flex flex-col md:flex-row items-center justify-center gap-6">
                 <span className={GRADIENT_TEXT}>BIOGRAFÍA</span>
                 <span className="text-neutral-900 hidden md:block">...</span>
                 <span className="text-white opacity-40 text-2xl md:text-5xl">PRÓXIMAMENTE</span>
               </h3>
             </div>
          </div>
        </CollapsibleSection>

        {/* Desplegable: La Estructura */}
        <CollapsibleSection
          id="structure"
          title={
            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] font-rubik flex items-center`}>
              <span className="text-white mr-6 text-xl md:text-2xl">03</span>
              <span className={GRADIENT_TEXT}>LA ESTRUCTURA</span>
            </h2>
          }
          isOpen={openSections.structure}
          onToggle={() => toggleSection('structure')}
        >
          <Structure />
        </CollapsibleSection>

        <Services />
      </main>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-40 h-40 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <img src={ASSETS.LOGO} alt="LC WORLD Logo" className="w-full h-full object-contain mix-blend-lighten" />
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm max-w-xs pl-4">
                    "Nosotros somos la máquina, tú el director." — El estándar de excelencia en música urbana.
                  </p>
               </div>
               
               <div className="flex gap-6">
                  <Globe className="w-6 h-6 text-neutral-600 hover:text-white cursor-pointer transition-colors" />
                  <Music className="w-6 h-6 text-neutral-600 hover:text-white cursor-pointer transition-colors" />
               </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-neutral-900 text-center text-neutral-600 text-[10px] uppercase tracking-[0.3em]">
               © {new Date().getFullYear()} LC WORLD MUSIC • ALL RIGHTS RESERVED
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
