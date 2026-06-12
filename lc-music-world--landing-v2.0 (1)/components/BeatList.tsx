import React from 'react';
import { Beat } from '../types';
import { Play, Pause, ShoppingCart, Sparkles, Search, Music, Zap, Instagram, Youtube } from './Icons';
import { ASSETS, SINGLES } from '../constants';

interface BeatListProps {
  beats: Beat[];
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onPause: () => void;
  onAddToCart: (beat: Beat) => void;
  onOpenLyricAssistant: (beat: Beat) => void;
}

export const BeatList: React.FC<BeatListProps> = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 mb-8">
      {/* Social Links Section */}
      <div className="flex flex-wrap justify-center gap-12 mb-20">
        <a 
          href="https://www.instagram.com/lcworldmusic/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 group transition-all"
        >
          <div className="w-12 h-12 flex items-center justify-center p-2 rounded-lg bg-neutral-900/50 border border-neutral-800 group-hover:border-red-600/50 transition-all">
            <img src={ASSETS.LOGO} alt="LC Logo" className="w-8 h-8 object-contain mix-blend-lighten group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-rubik font-bold tracking-[0.2em] text-sm text-white group-hover:text-red-500 transition-colors">INSTAGRAM</span>
            <span className="text-[10px] text-neutral-600 font-medium tracking-widest">FOLLOW THE WAVE</span>
          </div>
        </a>

        <a 
          href="https://youtube.com/@ytlcworldmusic?si=YXTmffUlKrZ25Rot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 group transition-all"
        >
          <div className="w-12 h-12 flex items-center justify-center p-2 rounded-lg bg-neutral-900/50 border border-neutral-800 group-hover:border-red-600/50 transition-all">
            <img src={ASSETS.LOGO} alt="LC Logo" className="w-8 h-8 object-contain mix-blend-lighten group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-rubik font-bold tracking-[0.2em] text-sm text-white group-hover:text-red-500 transition-colors">YOUTUBE</span>
            <span className="text-[10px] text-neutral-600 font-medium tracking-widest">OFFICIAL CHANNEL</span>
          </div>
        </a>
      </div>

      {/* Singles Section Header */}
      <div className="relative flex items-center justify-center mb-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
        </div>
        <div className="relative bg-black px-8">
          <h3 className="font-rubik font-bold tracking-[0.8em] text-orange-600/40 text-xs md:text-sm uppercase">SINGLES YOUTUBE</h3>
        </div>
      </div>

      {/* Singles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SINGLES.map((single, index) => (
          <a 
            key={index}
            href={single.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-32 flex items-center justify-center overflow-hidden border border-neutral-900 hover:border-red-600/50 transition-all rounded-sm shadow-2xl"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              style={{ backgroundImage: `url(${single.cover})` }}
            ></div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
            
            {/* Subtle Gradient Accent */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-100"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
               <h4 className="font-rubik font-bold text-white text-[10px] md:text-xs tracking-[0.3em] uppercase group-hover:text-white transition-colors drop-shadow-md">
                 {single.title}
               </h4>
               <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Play className="w-5 h-5 text-red-500 mx-auto fill-red-500" />
               </div>
            </div>
          </a>
        ))}
      </div>

      {/* Main Banner / Background Callout */}
      <div 
        className="mt-20 text-center space-y-8 py-24 border border-dashed border-neutral-900 bg-black relative overflow-hidden group rounded-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${ASSETS.BANNER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
          <div className="relative z-10 transition-transform duration-700 group-hover:scale-105">
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-4 opacity-70">
              PRÓXIMAMENTE; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-600">EN OBRAS</span>
            </h2>
            <p className="text-neutral-500 font-rubik text-xs tracking-[0.3em] font-medium opacity-50">NUEVOS BEATS DISPONIBLES PRONTO</p>
          </div>
      </div>
    </div>
  );
};