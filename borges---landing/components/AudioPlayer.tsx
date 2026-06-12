import React, { useRef, useEffect, useState } from 'react';
import { Beat } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ShoppingCart, X } from './Icons';
import { LICENSE_PRICES, LicenseType } from '../types';

interface AudioPlayerProps {
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onAddToCart: (beat: Beat) => void;
  onClose: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  currentBeat, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrev,
  onAddToCart,
  onClose
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentBeat]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
        onNext();
    }

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentBeat, onNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentBeat) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#030305]/95 backdrop-blur-xl border-t border-[#0D3A5C]/20 p-0 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 animate-in slide-in-from-bottom">
      <audio ref={audioRef} src={currentBeat.audioUrl} />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute -top-4 right-4 bg-[#08263E] border border-[#0D3A5C]/30 hover:bg-[#7A5A20] hover:border-[#7A5A20] hover:text-[#030305] text-[#C8CDD8] p-1.5 transition-all shadow-lg z-50"
        title="Cerrar reproductor"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar (Absolute Top) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#0D3A5C]/10 group cursor-pointer">
          <div 
            className="h-full bg-gradient-to-r from-[#0D3A5C] to-[#7A5A20] relative"
            style={{ width: `${progress}%` }}
          >
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleSeek}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-20 md:h-24 px-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3 min-w-[140px]">
          <img 
            src={currentBeat.coverUrl} 
            alt={currentBeat.title} 
            className="w-14 h-14 md:w-16 md:h-16 object-cover border border-[#0D3A5C]/30 shadow-lg"
          />
          <div className="hidden md:block overflow-hidden">
            <h3 className="font-bold text-[#C8CDD8] truncate text-base md:text-lg font-rubik uppercase tracking-tighter">{currentBeat.title}</h3>
            <p className="text-[10px] text-[#7A5A20] font-tech font-bold tracking-[0.2em] uppercase">{currentBeat.producer}</p>
          </div>
          <div className="md:hidden">
             <h3 className="font-bold text-[#C8CDD8] truncate text-sm font-rubik uppercase">{currentBeat.title}</h3>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center gap-6 md:gap-8">
            <button onClick={onPrev} className="text-neutral-600 hover:text-[#0D3A5C] transition-colors">
              <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={onPlayPause} 
              className="w-12 h-12 md:w-14 md:h-14 bg-[#0D3A5C] hover:bg-[#7A5A20] text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              {isPlaying ? <Pause className="w-6 h-6 md:w-7 md:h-7 fill-current" /> : <Play className="w-6 h-6 md:w-7 md:h-7 fill-current ml-1" />}
            </button>
            <button onClick={onNext} className="text-neutral-600 hover:text-[#0D3A5C] transition-colors">
              <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="text-[10px] text-neutral-500 mt-2 font-tech hidden md:block tracking-[0.2em]">
            {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center justify-end gap-3 md:gap-8 w-1/3">
            
           {/* Add to Cart Quick Action */}
           <button 
             onClick={() => onAddToCart(currentBeat)}
             className="bg-[#08263E] border border-[#0D3A5C]/30 hover:bg-[#7A5A20] hover:text-[#030305] text-[#C8CDD8] px-4 py-2 text-xs md:text-sm font-tech font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
           >
             <span className="hidden md:inline font-tech">${LICENSE_PRICES[LicenseType.MP3]}</span>
             <ShoppingCart className="w-4 h-4" />
           </button>

          <div className="hidden md:flex items-center gap-3 group">
            <button onClick={() => setIsMuted(!isMuted)} className="text-neutral-600 hover:text-[#0D3A5C]">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-[#0D3A5C] bg-[#0D3A5C]/10 h-1 appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};