import React from 'react';
import { playClickSound } from '../utils/audio';
import { Send, Mail, Share2 } from 'lucide-react';

interface FooterProps {
  onOpenQuiz: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onScrollToSection }) => {
  return (
    <footer className="w-full bg-[#063D21] border-t-4 border-[#FFE600] py-12 px-4 sm:px-6 lg:px-8 mt-20 text-[#FAF7EC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Social & Contact Handles (Matching Screenshot 1 & 4) */}
        <div className="space-y-3 font-hh-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
          <div className="flex items-center space-x-3 text-[#FFE600]">
            <Share2 className="w-4 h-4 text-[#FF007F]" />
            <span>@247PMSTUDIO</span>
          </div>
          <div className="flex items-center space-x-3 text-[#FFE600]">
            <Send className="w-4 h-4 text-[#FF007F]" />
            <span>@TWOFOURTYSEVENPM</span>
          </div>
          <div className="flex items-center space-x-3 text-[#FFE600]">
            <Mail className="w-4 h-4 text-[#FF007F]" />
            <span>SATAPATHYPRAYASU@GMAIL.COM</span>
          </div>
        </div>

        {/* Right Links & Copyright (Matching Screenshot 1 & 4) */}
        <div className="space-y-3 font-hh-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-right md:text-right">
          <div className="flex items-center justify-end space-x-6">
            <a 
              href="#hero" 
              onClick={() => { playClickSound(); onScrollToSection('hero'); }}
              className="text-white hover:text-[#FFE600] transition-colors"
            >
              BRAND KIT
            </a>
            <a 
              href="#hero" 
              onClick={() => { playClickSound(); onOpenQuiz(); }}
              className="text-white hover:text-[#FFE600] transition-colors"
            >
              TERM &amp; CONDITIONS
            </a>
          </div>

          <div className="text-[#FFE600] pt-2">
            © 2026 HH-GOA. ALL RIGHTS RESERVED.
          </div>
          <p className="text-[10px] text-amber-200 font-normal">
            Forge Goa — Official Open Trials Identity Ritual Engine
          </p>
        </div>

      </div>
    </footer>
  );
};
