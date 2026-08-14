import React from 'react';
import { Sparkles, ArrowRight, Terminal, Shield } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeroProps {
  onOpenQuiz: () => void;
  onExploreArchetypes: () => void;
  forgedCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onExploreArchetypes, forgedCount }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-[#0B6638]">
      
      {/* Decorative Retro Palm Trees Left & Right (Matching Official HH Goa Site Screenshots) */}
      <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-48 sm:w-72 lg:w-96 opacity-95 pointer-events-none z-0">
        <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Trunk */}
          <path d="M70,400 C70,250 110,150 130,50" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round"/>
          <path d="M70,400 C70,250 110,150 130,50" stroke="#063D21" strokeWidth="12" strokeLinecap="round"/>
          {/* Fronds */}
          <path d="M130,50 C80,20 10,-10 0,30 C30,45 80,60 130,50 Z" fill="#FFE600" stroke="#063D21" strokeWidth="4"/>
          <path d="M130,50 C160,-20 200,0 210,40 C170,50 140,55 130,50 Z" fill="#12844C" stroke="#063D21" strokeWidth="4"/>
          <path d="M130,50 C180,70 200,110 190,140 C150,110 135,80 130,50 Z" fill="#FFE600" stroke="#063D21" strokeWidth="4"/>
          <path d="M130,50 C70,80 40,120 20,150 C50,130 90,90 130,50 Z" fill="#FF007F" stroke="#063D21" strokeWidth="4"/>
        </svg>
      </div>

      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-48 sm:w-72 lg:w-96 opacity-95 pointer-events-none z-0">
        <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto transform scale-x-[-1]">
          {/* Trunk */}
          <path d="M70,400 C70,250 110,150 130,50" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round"/>
          <path d="M70,400 C70,250 110,150 130,50" stroke="#063D21" strokeWidth="12" strokeLinecap="round"/>
          {/* Fronds */}
          <path d="M130,50 C80,20 10,-10 0,30 C30,45 80,60 130,50 Z" fill="#FFE600" stroke="#063D21" strokeWidth="4"/>
          <path d="M130,50 C160,-20 200,0 210,40 C170,50 140,55 130,50 Z" fill="#12844C" stroke="#063D21" strokeWidth="4"/>
          <path d="M130,50 C180,70 200,110 190,140 C150,110 135,80 130,50 Z" fill="#FFE600" stroke="#063D21" strokeWidth="4"/>
          <path d="M130,50 C70,80 40,120 20,150 C50,130 90,90 130,50 Z" fill="#FF007F" stroke="#063D21" strokeWidth="4"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Top Studio Badge */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-[#063D21] border-2 border-[#FFE600] rounded shadow-[4px_4px_0px_#000000]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] animate-ping" />
          <span className="font-hh-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFE600]">
            HH GOA '26 OPEN TRIALS CHALLENGE SUBMISSION
          </span>
        </div>

        {/* Iconic HH Goa Title Block (Matching Screenshot 1 & 4) */}
        <div className="relative py-4 select-none">
          {/* Giant Serif Yellow Title */}
          <h1 className="font-hh-title font-black text-5xl sm:text-8xl lg:text-9xl text-[#FFE600] tracking-tight leading-none uppercase drop-shadow-[6px_6px_0px_#042E18]">
            HACKER<br />HOUSE
          </h1>
          
          {/* Overlaid Hot Pink Hindi गोवा Badge (Exact match from Screenshot 1 & 4) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] z-20">
            <span className="font-hh-hindi font-black text-4xl sm:text-7xl lg:text-8xl text-[#FF007F] px-4 py-0.5 sm:px-6 sm:py-1 bg-[#FFE600] border-3 sm:border-4 border-black shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] inline-block tracking-widest">
              गोवा
            </span>
          </div>
        </div>

        {/* Sub-Metadata matching HH Goa website format */}
        <div className="font-hh-mono text-xs sm:text-base font-bold text-amber-100 tracking-widest uppercase space-y-1">
          <p className="text-[#FFE600]">GOA, INDIA &nbsp;•&nbsp; 28 - 31 OCT 2026 &nbsp;•&nbsp; 2:47 PM STUDIO</p>
          <p className="text-white text-sm sm:text-lg pt-2 max-w-xl mx-auto font-normal font-hh-mono">
            FORGE YOUR BUILDER IDENTITY • DISCOVER ARCHETYPES • BUILD YOUR SQUAD
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <button
            onClick={() => { playClickSound(); onOpenQuiz(); }}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF007F] hover:bg-[#FFE600] text-white hover:text-black font-hh-title font-black text-xl tracking-wider uppercase border-3 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000000] transition-all flex items-center justify-center space-x-3"
          >
            <Sparkles className="w-6 h-6 fill-current text-[#FFE600]" />
            <span>FORGE MY IDENTITY NOW</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => { playClickSound(); onExploreArchetypes(); }}
            className="w-full sm:w-auto px-8 py-4 bg-[#063D21] hover:bg-[#12844C] text-[#FFE600] font-hh-mono font-bold text-base tracking-wider uppercase border-2 border-[#FFE600] shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center space-x-2"
          >
            <Terminal className="w-5 h-5" />
            <span>EXPLORE ARCHETYPES</span>
          </button>
        </div>

        {/* Live Identity Counter & Ticker */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-amber-100 font-hh-mono text-xs sm:text-sm">
          <div className="flex items-center space-x-2 px-3 py-1 bg-[#063D21] border border-[#FFE600]/40 rounded">
            <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping" />
            <span><strong className="text-[#FFE600]">{forgedCount}</strong> {forgedCount === 1 ? 'Passport Forged' : 'Passports Forged'}</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-[#063D21] border border-[#FF007F]/40 rounded">
            <Shield className="w-4 h-4 text-[#FF007F]" />
            <span>4-Person Hack Squad Engine Active</span>
          </div>
        </div>

      </div>

      {/* Decorative Rising Sun Illustration Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[80px] overflow-hidden pointer-events-none opacity-40">
        <svg viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="100" r="80" fill="#FFE600"/>
          <line x1="250" y1="0" x2="250" y2="20" stroke="#FFE600" strokeWidth="4"/>
          <line x1="170" y1="20" x2="185" y2="35" stroke="#FFE600" strokeWidth="4"/>
          <line x1="330" y1="20" x2="315" y2="35" stroke="#FFE600" strokeWidth="4"/>
        </svg>
      </div>

    </section>
  );
};
