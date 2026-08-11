import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Terminal, Users, Shield } from 'lucide-react';
import { toggleOceanAmbient, playClickSound } from '../utils/audio';

interface HeaderProps {
  onOpenQuiz: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz, onScrollToSection, activeSection }) => {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const newState = toggleOceanAmbient();
    setIsAudioActive(newState);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#063D21] border-b-4 border-[#FFE600] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - 2:47 PM STUDIO & FORGE GOA */}
        <div 
          onClick={() => { playClickSound(); onScrollToSection('hero'); }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="bg-[#FFE600] text-[#063D21] px-2.5 py-1 rounded font-hh-mono font-black text-sm tracking-tighter border-2 border-black group-hover:scale-105 transition-transform">
            2:47PM<br/><span className="text-[10px] uppercase tracking-widest text-[#FF007F]">STUDIO</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-hh-title font-black text-2xl text-[#FFE600] tracking-tight group-hover:text-white transition-colors">
                FORGE GOA
              </span>
              <span className="px-2 py-0.5 text-[10px] font-hh-mono font-bold uppercase bg-[#FF007F] text-white rounded">
                HH GOA '26
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links matching HH Goa UI */}
        <nav className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => { playClickSound(); onScrollToSection('hero'); }}
            className={`px-3 py-1.5 font-hh-mono text-sm font-bold tracking-wider uppercase transition-colors ${
              activeSection === 'hero' ? 'text-[#FFE600] border-b-2 border-[#FFE600]' : 'text-slate-200 hover:text-[#FFE600]'
            }`}
          >
            CHECK HYPE
          </button>

          <button
            onClick={() => { playClickSound(); onScrollToSection('archetypes'); }}
            className={`px-3 py-1.5 font-hh-mono text-sm font-bold tracking-wider uppercase transition-colors flex items-center space-x-1 ${
              activeSection === 'archetypes' ? 'text-[#FFE600] border-b-2 border-[#FFE600]' : 'text-slate-200 hover:text-[#FFE600]'
            }`}
          >
            <Terminal className="w-4 h-4 text-[#FFE600]" />
            <span>ARCHETYPES</span>
          </button>

          <button
            onClick={() => { playClickSound(); onScrollToSection('community'); }}
            className={`px-3 py-1.5 font-hh-mono text-sm font-bold tracking-wider uppercase transition-colors flex items-center space-x-1 ${
              activeSection === 'community' ? 'text-[#FFE600] border-b-2 border-[#FFE600]' : 'text-slate-200 hover:text-[#FFE600]'
            }`}
          >
            <Users className="w-4 h-4 text-[#FFE600]" />
            <span>COMMUNITY</span>
          </button>

          <button
            onClick={() => { playClickSound(); onScrollToSection('squad'); }}
            className={`px-3 py-1.5 font-hh-mono text-sm font-bold tracking-wider uppercase transition-colors flex items-center space-x-1 ${
              activeSection === 'squad' ? 'text-[#FFE600] border-b-2 border-[#FFE600]' : 'text-slate-200 hover:text-[#FFE600]'
            }`}
          >
            <Shield className="w-4 h-4 text-[#FF007F]" />
            <span>SQUAD MODE</span>
          </button>
        </nav>

        {/* Right CTA & Audio Toggle */}
        <div className="flex items-center space-x-3">
          {/* Audio Wave Toggle */}
          <button
            onClick={handleAudioToggle}
            title={isAudioActive ? "Mute Ocean Sound" : "Play Lo-Fi Beach Wave Sound"}
            className={`p-2 rounded border-2 transition-all ${
              isAudioActive 
                ? 'bg-[#FF007F] border-[#FFE600] text-white shadow-lg' 
                : 'bg-[#063D21] border-[#FFE600]/40 text-[#FFE600] hover:border-[#FFE600]'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Glowing APPLY / FORGE IDENTITY Button */}
          <button
            onClick={() => { playClickSound(); onOpenQuiz(); }}
            className="px-6 py-2.5 bg-[#FFE600] hover:bg-[#FF007F] text-[#063D21] hover:text-white font-hh-title font-black text-lg tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all animate-hh-glow flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            <span>FORGE PASSPORT</span>
          </button>
        </div>

      </div>
    </header>
  );
};
