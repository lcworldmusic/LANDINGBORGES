import React, { useState } from 'react';
import { Beat } from '../types';
import { Play, Pause, ShoppingCart, Sparkles, Search, Music, Zap } from './Icons';
import { LICENSE_PRICES, LicenseType } from '../types';
import { ASSETS } from '../constants';

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
  const songs = ["Ubícate Lila", "Rabia", "Treason"];
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 mb-20">
        {songs.map((song, idx) => (
          <div key={idx} className="group flex items-center justify-between p-6 border-b border-[#0D3A5C]/20 hover:bg-[#0D3A5C]/5 transition-all">
            <div className="flex items-center gap-8">
              <span className="font-tech text-xs text-[#0D3A5C] tracking-widest">0{idx + 1}</span>
              <h3 className="text-2xl md:text-5xl font-rubik text-[#7A5A20] uppercase tracking-tighter group-hover:text-[#C8CDD8] transition-colors">{song}</h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:block">
                <span className="font-tech text-[10px] text-[#0D3A5C] uppercase tracking-[0.2em]">Mastered / HQ</span>
              </div>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-[#7A5A20] text-[#7A5A20] hover:bg-[#7A5A20] hover:text-[#030305] transition-all">
                <Play className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center space-y-8 py-16 border border-dashed border-neutral-800 bg-neutral-900/10">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-4 opacity-50">
              PRÓXIMAMENTE; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4682B4] via-[#5A9BD5] to-[#B8860B]">EN OBRAS</span>
            </h2>
          </div>
      </div>
    </div>
  );
};