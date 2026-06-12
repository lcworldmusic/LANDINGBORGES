
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { BeatList } from './components/BeatList';
import { AudioPlayer } from './components/AudioPlayer';
import { CartDrawer } from './components/CartDrawer';
import { LyricAssistant } from './components/LyricAssistant';
import { Services } from './components/Services';
import { AdminUpload } from './components/AdminUpload';
import { ShoppingCart, Music, Globe, Loader, Lock, ChevronDown, ChevronUp } from './components/Icons';
import { Beat, CartItem, LicenseType, LICENSE_PRICES } from './types';
import { supabase } from './services/supabaseClient';
import { ASSETS, PORTFOLIO_LINKS } from './constants';

function PortfolioLinkCard({ name, url, image, keepColor }: { name: string, url: string, image?: string, keepColor?: boolean }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative block p-4 bg-neutral-900/40 border border-[#0D3A5C]/20 hover:border-[#7A5A20]/50 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D3A5C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex items-center gap-4">
        {image && (
          <div className="w-12 h-12 flex-shrink-0 border border-[#0D3A5C]/20 overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110 ${keepColor ? '' : 'grayscale group-hover:grayscale-0'}`}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-tech text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 group-hover:text-[#7A5A20] transition-colors truncate">{name}</h4>
          <div className="flex items-center gap-2 text-[#7A5A20] text-[8px] font-tech tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <span>Abrir Enlace</span>
            <Music className="w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A5A20] transition-all duration-500 group-hover:w-full" />
    </a>
  );
}

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
    <div id={id} className={`border-b border-[#0D3A5C]/30 transition-all duration-500 relative bg-black transition-colors ${isOpen ? 'bg-black' : ''}`}>
      <button 
        onClick={onToggle}
        className="w-full py-8 px-4 flex items-center justify-between group hover:bg-neutral-900/50 transition-colors"
      >
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex-1 text-left">
            {title}
          </div>
          <div className={`p-2 rounded-full border border-[#0D3A5C]/50 group-hover:border-[#7A5A20]/50 transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#7A5A20]/10 border-[#7A5A20]' : ''}`}>
            <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#7A5A20]' : 'text-neutral-600 group-hover:text-[#7A5A20]'}`} />
          </div>
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100 py-16' : 'max-h-0 opacity-0'}`}>
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
    services: false,
    origin: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const GRADIENT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-[#0D3A5C] from-65% to-[#7A5A20]";

  if (isLoading) {
      return (
          <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center text-[#C8CDD8]">
              <Loader className="w-10 h-10 text-[#7A5A20] animate-spin mb-4" />
              <p className="font-tech tracking-widest uppercase">Cargando Sistema BORGES...</p>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#030305] text-[#C8CDD8] font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#030305]/90 backdrop-blur-md border-b border-[#0D3A5C]/20">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img 
              src={ASSETS.LOGO} 
              alt="Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex items-center gap-12">
            <button 
                onClick={() => {
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-tech font-bold uppercase tracking-[0.4em] text-neutral-500 hover:text-[#7A5A20] transition-colors"
            >
                Portfolio
            </button>
            <button 
                onClick={() => {
                  setOpenSections(prev => ({ ...prev, origin: true }));
                  setTimeout(() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="text-xs font-tech font-bold uppercase tracking-[0.4em] text-neutral-500 hover:text-[#7A5A20] transition-colors"
            >
                CONÓCEME
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Hero />
        
        {/* Portfolio Section - Always Visible */}
        <section id="catalog" className="border-b border-[#0D3A5C]/30 bg-black py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] font-black-ops flex items-center mb-12`}>
              <span className="text-white mr-6 text-xl md:text-2xl">01</span>
              <span className={GRADIENT_TEXT}>PORTFOLIO</span>
            </h2>
            
            <div className="space-y-16">
              {/* Redes y Último Lanzamiento */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#0D3A5C]/20">
                {/* Redes Sociales (Column span 7) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#0D3A5C]/50" />
                      <h3 className="font-tech text-xs tracking-[0.5em] text-[#7A5A20] uppercase font-bold">
                        REDES SOCIALES
                      </h3>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#0D3A5C]/50" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                      {/* Image beside socials */}
                      <div className="w-full sm:w-2/5 aspect-square border border-[#0D3A5C]/20 relative overflow-hidden bg-neutral-900/40 rounded-sm">
                        <img 
                          src="https://i.postimg.cc/MGMZfpjv/Chat-GPT-Image-30-may-2026-18-22-15.png" 
                          alt="BORGES" 
                          className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Social Links buttons */}
                      <div className="flex-1 flex flex-col gap-3 justify-center">
                        <a 
                          href="https://open.spotify.com/intl-es/artist/6918mke4Pv7CeYuEPQpfCx?si=V8akFS0bS7O_xhKSZvMHCA" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-4 p-4 bg-neutral-900/40 border border-[#0D3A5C]/20 hover:border-[#7A5A20]/50 transition-all duration-300 rounded-sm"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#1DB954]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DB954]/10 text-[#1DB954]">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.336.135-.668.47-.743 3.856-.88 7.15-.506 9.817 1.127.295.18.387.563.207.861zm1.224-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.676-1.114 8.25-.572 11.35 1.336.366.226.486.706.258 1.078zm.106-2.827C14.392 8.76 8.56 8.567 5.174 9.594a1 1 0 011.238-1.528c3.023-.918 8.44-.7 12.44 1.677a1 1 0 11-1.037 1.713z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-tech text-xs tracking-[0.2em] uppercase group-hover:text-[#7A5A20] transition-colors font-semibold">Spotify</h4>
                          </div>
                          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A5A20] transition-all duration-500 group-hover:w-full" />
                        </a>

                        <a 
                          href="https://youtu.be/gilcBi2k16E?si=pH0-DJXqpeqfebqJ" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-4 p-4 bg-neutral-900/40 border border-[#0D3A5C]/20 hover:border-[#7A5A20]/50 transition-all duration-300 rounded-sm"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FF0000]/10 text-[#FF0000]">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-tech text-xs tracking-[0.2em] uppercase group-hover:text-[#7A5A20] transition-colors font-semibold">YouTube</h4>
                          </div>
                          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A5A20] transition-all duration-500 group-hover:w-full" />
                        </a>

                        <a 
                          href="https://www.instagram.com/x_borges_x?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-4 p-4 bg-neutral-900/40 border border-[#0D3A5C]/20 hover:border-[#7A5A20]/50 transition-all duration-300 rounded-sm"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#E1306C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E1306C]/10 text-[#E1306C]">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-tech text-xs tracking-[0.2em] uppercase group-hover:text-[#7A5A20] transition-colors font-semibold">Instagram</h4>
                          </div>
                          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A5A20] transition-all duration-500 group-hover:w-full" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Último Lanzamiento (Column span 5) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#0D3A5C]/50" />
                      <h3 className="font-tech text-xs tracking-[0.5em] text-[#7A5A20] uppercase font-bold">
                        ÚLTIMO LANZAMIENTO
                      </h3>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#0D3A5C]/50" />
                    </div>

                    <a 
                      href="https://youtu.be/gilcBi2k16E?si=4Zd74eslRIBEFEVZ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group relative flex gap-6 p-6 bg-neutral-900/40 border border-[#0D3A5C]/20 hover:border-[#7A5A20]/50 transition-all duration-300 rounded-sm overflow-hidden h-full min-h-[188px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0D3A5C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Cover image of treason */}
                      <div className="w-1/3 aspect-square border border-[#0D3A5C]/20 overflow-hidden rounded-sm flex-shrink-0">
                        <img 
                          src="https://i.postimg.cc/fknRMnbJ/PORTADA-TREASON.png" 
                          alt="TREASON" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info and button */}
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="inline-block px-1.5 py-0.5 mb-2 border border-[#7A5A20]/30 text-[#7A5A20] font-tech text-[8px] tracking-widest uppercase rounded-sm bg-[#7A5A20]/5 self-start">
                          NUEVO SINGLE
                        </div>
                        <h4 className="text-white font-tech text-base tracking-[0.2em] uppercase mb-1 group-hover:text-[#7A5A20] transition-colors truncate">TREASON</h4>
                        <p className="text-neutral-500 font-tech text-[10px] tracking-widest uppercase mb-4">MIRA EL VIDEOCLIP OFICIAL</p>
                        <div className="flex items-center gap-2 text-[#7A5A20] text-[10px] font-tech tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <span>Escuchar en YouTube</span>
                          <Music className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A5A20] transition-all duration-500 group-hover:w-full" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Playlists Category */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#0D3A5C]/50" />
                  <h3 className="font-tech text-xs tracking-[0.5em] text-[#7A5A20] uppercase font-bold">
                    PLAYLIST BORGES
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#0D3A5C]/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {PORTFOLIO_LINKS.PLAYLISTS.map((link, i) => (
                    <PortfolioLinkCard key={i} {...link} />
                  ))}
                </div>
              </div>

              {/* Portfolio Category */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#0D3A5C]/50" />
                  <h3 className="font-tech text-xs tracking-[0.5em] text-[#7A5A20] uppercase font-bold">
                    SINGLES
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#0D3A5C]/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {PORTFOLIO_LINKS.PORTFOLIO.map((link, i) => (
                    <PortfolioLinkCard key={i} {...link} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Desplegable: El Origen */}
        <CollapsibleSection
          id="origin"
          title={
            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] font-black-ops flex items-center`}>
              <span className="text-white mr-6 text-xl md:text-2xl">02</span>
              <span className={GRADIENT_TEXT}>EL ORIGEN</span>
            </h2>
          }
          isOpen={openSections.origin}
          onToggle={() => toggleSection('origin')}
        >
          <div className="relative text-center py-32 transform scale-90 origin-top overflow-hidden">
             <img 
               src={ASSETS.BANNER} 
               alt="" 
               className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale pointer-events-none"
               referrerPolicy="no-referrer"
             />
             <div className="relative z-10">
               <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter italic flex flex-col items-center justify-center gap-6">
                 <span className={GRADIENT_TEXT}>BIOGRAFÍA</span>
                 <p className="text-neutral-500 font-tech text-sm tracking-widest max-w-2xl uppercase mt-4">
                   Un artista forjado en la realidad. Letras que trascienden el género.
                 </p>
               </h3>
             </div>
          </div>
        </CollapsibleSection>

        {/* Desplegable: Accede a la máquina */}
        <CollapsibleSection
          id="services"
          title={
            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] font-black-ops flex items-center`}>
              <span className="text-white mr-6 text-xl md:text-2xl">03</span>
              <span className={GRADIENT_TEXT}>ACCEDE A LA MÁQUINA</span>
            </h2>
          }
          isOpen={openSections.services}
          onToggle={() => toggleSection('services')}
        >
          <Services />
        </CollapsibleSection>
      </main>

      {/* Footer */}
      <footer className="bg-[#030305] py-16 border-t border-[#0D3A5C]/20">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex flex-col items-center md:items-start text-[#C8CDD8]">
                  <img 
                    src={ASSETS.LOGO} 
                    alt="Logo" 
                    className="h-12 w-auto mb-4 opacity-80 hover:opacity-100 transition-opacity" 
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-neutral-500 text-sm max-w-xs font-tech">
                    "Música Pura, Letra Real"
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
