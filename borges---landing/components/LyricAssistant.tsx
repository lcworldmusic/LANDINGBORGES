import React, { useState } from 'react';
import { Beat } from '../types';
import { generateLyrics } from '../services/geminiService';
import { X, Sparkles, Zap } from './Icons';

interface LyricAssistantProps {
  beat: Beat;
  onClose: () => void;
}

export const LyricAssistant: React.FC<LyricAssistantProps> = ({ beat, onClose }) => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Freestyle');
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setGeneratedLyrics('');
    
    const result = await generateLyrics(beat, topic, style);
    
    setGeneratedLyrics(result);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030305]/95 backdrop-blur-md">
      <div className="bg-[#030305] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] border border-[#0D3A5C]/30 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#0D3A5C]/20 flex justify-between items-center bg-[#08263E]/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0D3A5C]/10 border border-[#0D3A5C]/20">
              <Zap className="w-6 h-6 text-[#7A5A20]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#C8CDD8] font-rubik uppercase tracking-tighter">AI WRITER</h2>
              <p className="text-[10px] text-neutral-500 font-tech uppercase tracking-[0.2em]">SISTEMA DE ASISTENCIA <span className="text-[#0D3A5C]">V1.0</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#0D3A5C]/20 transition-colors rounded-full">
            <X className="w-6 h-6 text-neutral-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto bg-[#030305]">
          {!generatedLyrics ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-tech font-bold text-neutral-500 uppercase tracking-widest">Concepto / Tema</label>
                <textarea 
                  className="w-full bg-[#08263E]/20 border border-[#0D3A5C]/20 p-4 text-[#C8CDD8] focus:outline-none focus:border-[#7A5A20]/50 placeholder-neutral-700 font-tech text-sm min-h-[120px]"
                  placeholder="Describe la vibra... Ej: Una noche en la ciudad, traición, dinero, éxito..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-tech font-bold text-neutral-500 uppercase tracking-widest">Flow & Estilo</label>
                <div className="flex flex-wrap gap-2">
                  {['Freestyle', 'Trap Hard', 'Reggaeton', 'Melódico', 'Consciente'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`px-4 py-2 text-[10px] font-tech font-bold uppercase tracking-wider transition-all border ${
                        style === s 
                          ? 'bg-[#7A5A20] border-[#7A5A20] text-white' 
                          : 'bg-transparent border-[#0D3A5C]/20 text-neutral-500 hover:border-[#0D3A5C]/50 hover:text-[#C8CDD8]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#08263E]/10 p-5 border border-[#0D3A5C]/10 border-dashed">
                <h4 className="text-[10px] font-tech font-bold uppercase tracking-widest text-[#0D3A5C] mb-4">Datos del Sistema</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="block text-neutral-600 text-[10px] uppercase font-tech font-bold">ESTADO</span>
                    <span className="font-tech text-[#7A5A20] text-lg uppercase">Activo</span>
                  </div>
                  <div>
                    <span className="block text-neutral-600 text-[10px] uppercase font-tech font-bold">ENCRIPTACIÓN</span>
                    <span className="font-tech text-[#C8CDD8] text-lg">P2P</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-neutral-600 text-[10px] uppercase font-tech font-bold">ALGORITMO</span>
                    <span className="text-[#0D3A5C] font-tech text-lg uppercase tracking-wider">BORGES_AI</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
               <div className="flex justify-between items-center mb-6 border-b border-[#0D3A5C]/10 pb-4">
                 <h3 className="text-xl font-bold text-[#C8CDD8] font-rubik uppercase tracking-tighter">LETRA GENERADA</h3>
                 <button 
                   onClick={() => setGeneratedLyrics('')}
                   className="text-[10px] font-tech font-bold text-[#7A5A20] hover:text-[#C8CDD8] uppercase tracking-widest flex items-center gap-1"
                 >
                   <Sparkles className="w-4 h-4" />
                   Regenerar
                 </button>
               </div>
               <div className="bg-[#08263E]/20 p-6 border border-[#0D3A5C]/10 whitespace-pre-wrap font-tech text-[#C8CDD8] leading-loose text-sm shadow-inner">
                 {generatedLyrics}
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!generatedLyrics && (
          <div className="p-6 border-t border-[#0D3A5C]/20 bg-[#08263E]/40">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className={`w-full py-4 px-6 font-tech font-bold text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
                isLoading || !topic.trim()
                  ? 'bg-[#0D3A5C]/20 text-neutral-600 cursor-not-allowed'
                  : 'bg-[#0D3A5C] hover:bg-[#124d7a] text-white shadow-[0_0_20px_rgba(13,58,92,0.4)]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Procesando BORGES_AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generar Letra
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

};