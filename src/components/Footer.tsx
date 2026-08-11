import React from 'react';
import { playClickSound } from '../utils/audio';
import { Send, Mail, Link2 } from 'lucide-react';

interface FooterProps {
  onOpenQuiz: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onScrollToSection }) => {
  return (
    <footer className="w-full bg-[#063D21] border-t-4 border-[#FFE600] py-12 px-4 sm:px-6 lg:px-8 mt-20 text-[#FAF7EC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Social & Contact Handles */}
        <div className="space-y-3 font-hh-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
          <a
            href="https://x.com/247pmstudio"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="flex items-center space-x-3 text-[#FFE600] hover:text-[#FF007F] transition-colors"
          >
            <Link2 className="w-4 h-4 text-[#FF007F]" />
            <span>X: HTTPS://X.COM/247PMSTUDIO</span>
          </a>

          <a
            href="https://t.me/twofourtysevenpm"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="flex items-center space-x-3 text-[#FFE600] hover:text-[#FF007F] transition-colors"
          >
            <Send className="w-4 h-4 text-[#FF007F]" />
            <span>TELEGRAM: @TWOFOURTYSEVENPM</span>
          </a>

          <a
            href="mailto:SATAPATHYPRAYASU@GMAIL.COM"
            onClick={() => playClickSound()}
            className="flex items-center space-x-3 text-[#FFE600] hover:text-[#FF007F] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#FF007F]" />
            <span>SATAPATHYPRAYASU@GMAIL.COM</span>
          </a>
        </div>

        {/* Right Links & Copyright */}
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
          <p className="text-[11px] text-amber-200 font-bold uppercase tracking-widest">
            MADE BY AUTONOMOUS MINDS
          </p>
        </div>

      </div>
    </footer>
  );
};
