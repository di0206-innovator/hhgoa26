import React, { useState, useRef } from 'react';
import { Download, Share2, Terminal, Bot, Sparkles, Cpu, Zap, Globe, Flame, Compass, Check, Shield } from 'lucide-react';
import type { BuilderIdentity, FrameTheme } from '../types';
import { ARCHETYPES } from '../data/archetypes';
import { downloadCardAsPng, copySocialShareText } from '../utils/export';
import { playClickSound, playChimeSound } from '../utils/audio';

interface BuilderCardProps {
  identity: BuilderIdentity;
  onUpdateIdentity?: (updated: BuilderIdentity) => void;
  onAddToSquad?: (identity: BuilderIdentity) => void;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({ identity, onUpdateIdentity, onAddToSquad }) => {
  const [frameTheme, setFrameTheme] = useState<FrameTheme>(identity.frameTheme || 'sunset_glass');
  const [copiedText, setCopiedText] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // 3D Tilt Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const archetype = ARCHETYPES[identity.archetypeId] || ARCHETYPES.agent_wrangler;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleFrameChange = (theme: FrameTheme) => {
    playClickSound();
    setFrameTheme(theme);
    if (onUpdateIdentity) {
      onUpdateIdentity({ ...identity, frameTheme: theme });
    }
  };

  const handleDownload = async () => {
    playChimeSound();
    setIsExporting(true);
    await downloadCardAsPng(`builder_card_${identity.id}`, `${identity.handle}_HHGoa26_Passport`);
    setIsExporting(false);
  };

  const handleShareText = () => {
    playClickSound();
    copySocialShareText(identity.name, identity.archetypeTitle, identity.serialNumber);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  // Icon mapping
  const IconComponent = {
    Bot, Sparkles, Cpu, Moon: Terminal, Zap, Globe, Flame, Compass
  }[archetype.iconName] || Bot;

  return (
    <div className="space-y-6 max-w-md mx-auto">
      
      {/* Frame Theme Switcher Bar (Matching HH Goa Palette) */}
      <div className="flex items-center justify-center space-x-2 bg-[#063D21] p-1.5 rounded-xl border-2 border-[#FFE600]">
        <button
          onClick={() => handleFrameChange('sunset_glass')}
          className={`px-3 py-1.5 rounded font-hh-mono font-bold text-xs uppercase transition-all ${
            frameTheme === 'sunset_glass' ? 'bg-[#FFE600] text-black shadow' : 'text-slate-200 hover:text-[#FFE600]'
          }`}
        >
          Official Palm
        </button>
        <button
          onClick={() => handleFrameChange('terminal_retro')}
          className={`px-3 py-1.5 rounded font-hh-mono font-bold text-xs uppercase transition-all ${
            frameTheme === 'terminal_retro' ? 'bg-[#FF007F] text-white shadow' : 'text-slate-200 hover:text-[#FFE600]'
          }`}
        >
          Roadmap Cream
        </button>
        <button
          onClick={() => handleFrameChange('lanyard_badge')}
          className={`px-3 py-1.5 rounded font-hh-mono font-bold text-xs uppercase transition-all ${
            frameTheme === 'lanyard_badge' ? 'bg-[#12844C] text-[#FFE600] border border-[#FFE600]' : 'text-slate-200 hover:text-[#FFE600]'
          }`}
        >
          Jungle Night
        </button>
      </div>

      {/* 3D Holographic Card Canvas Area */}
      <div
        ref={cardRef}
        id={`builder_card_${identity.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: tilt.rotateX === 0 ? 'transform 0.5s ease-out' : 'none'
        }}
        className={`relative w-full aspect-[4/5] rounded-2xl p-6 overflow-hidden shadow-2xl transition-all duration-300 ${
          frameTheme === 'sunset_glass'
            ? 'bg-[#0B6638] border-4 border-[#FFE600] text-white shadow-[8px_8px_0px_#042E18]'
            : frameTheme === 'terminal_retro'
            ? 'bg-[#FAF7EC] border-4 border-[#063D21] text-[#063D21] shadow-[8px_8px_0px_#FF007F]'
            : 'bg-[#042E18] border-4 border-[#FF007F] text-[#FFE600] shadow-[8px_8px_0px_#FFE600]'
        }`}
      >
        {/* Header Stamp & Serial Number */}
        <div className="flex items-center justify-between border-b-2 border-current pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#FF007F] text-white font-hh-hindi font-bold text-xs rounded border border-black">
              गोवा VERIFIED
            </span>
            <span className="text-[10px] font-hh-mono font-bold uppercase tracking-wider text-[#FFE600] bg-[#063D21] px-1.5 py-0.5 rounded">
              HH GOA '26
            </span>
          </div>
          <span className="text-xs font-hh-mono font-bold tracking-widest">{identity.serialNumber}</span>
        </div>

        {/* Main Profile Info */}
        <div className="flex items-start space-x-4 mb-4">
          
          {/* Avatar with Frame Glow */}
          <div className="relative group/avatar">
            <img
              src={identity.avatarUrl}
              alt={identity.name}
              className="w-20 h-20 rounded-xl object-cover border-3 border-[#FFE600] shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 bg-[#FF007F] text-white rounded border border-black shadow">
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          {/* Name, Handle & Archetype Title */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="font-hh-title font-black text-2xl truncate leading-tight uppercase">
              {identity.name}
            </h3>
            <p className="text-xs font-hh-mono font-bold opacity-80">@{identity.handle}</p>
            
            {/* Archetype Title Pill */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFE600] text-[#063D21] font-hh-title font-black text-sm uppercase rounded border border-black">
              <span>{identity.archetypeTitle}</span>
            </div>
          </div>

        </div>

        {/* Tagline Quote */}
        <div className="p-3 rounded bg-[#063D21]/20 border border-current mb-4 text-xs font-hh-mono italic">
          "{identity.archetypeTagline}"
        </div>

        {/* RPG Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2.5 rounded bg-[#063D21]/30 border border-current space-y-1">
            <div className="flex items-center justify-between text-[10px] font-hh-mono font-bold">
              <span>SHIP SPEED</span>
              <span>{identity.stats.shipSpeed}/100</span>
            </div>
            <div className="w-full bg-[#063D21] h-2 rounded overflow-hidden border border-current">
              <div
                className="bg-[#FFE600] h-full"
                style={{ width: `${identity.stats.shipSpeed}%` }}
              />
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#063D21]/30 border border-current space-y-1">
            <div className="flex items-center justify-between text-[10px] font-hh-mono font-bold">
              <span>COFFEE/CODE</span>
              <span>{identity.stats.coffeeCodeRatio}%</span>
            </div>
            <div className="w-full bg-[#063D21] h-2 rounded overflow-hidden border border-current">
              <div
                className="bg-[#FF007F] h-full"
                style={{ width: `${identity.stats.coffeeCodeRatio}%` }}
              />
            </div>
          </div>
        </div>

        {/* Primary Attribute & Flaw */}
        <div className="space-y-1 mb-4 text-xs font-hh-mono">
          <div className="flex items-center space-x-1.5">
            <span className="font-bold uppercase text-[#FFE600] bg-[#063D21] px-1 rounded">AURA:</span>
            <span className="font-bold">{identity.goaAura}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold uppercase text-[#FF007F] bg-[#063D21] px-1 rounded">FLAW:</span>
            <span className="truncate">{identity.signatureFlaw}</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {identity.techStack.map(t => (
            <span key={t} className="px-2 py-0.5 rounded bg-[#063D21] text-[#FFE600] text-[10px] font-hh-mono font-bold border border-current">
              {t}
            </span>
          ))}
        </div>

        {/* Stickers Layer */}
        {identity.stickers && identity.stickers.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-current">
            {identity.stickers.map(s => (
              <span key={s.id} className="px-2 py-0.5 rounded text-[10px] font-hh-mono font-black uppercase bg-[#FF007F] text-white border border-black">
                {s.label}
              </span>
            ))}
          </div>
        )}

        {/* Card Barcode Footer */}
        <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between border-t-2 border-current pt-2 text-[9px] font-hh-mono font-bold">
          <span>FORGE GOA // 2:47PM STUDIO</span>
          <div className="tracking-widest font-black opacity-60">||||| | |||| ||| |||</div>
        </div>

      </div>

      {/* Card Action Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        
        {/* Download PNG */}
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full sm:w-1/2 px-5 py-3 bg-[#FFE600] hover:bg-[#FF007F] text-[#063D21] hover:text-white font-hh-title font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'EXPORTING...' : 'DOWNLOAD CARD'}</span>
        </button>

        {/* Copy Share Text */}
        <button
          onClick={handleShareText}
          className="w-full sm:w-1/2 px-5 py-3 bg-[#063D21] hover:bg-[#12844C] text-[#FFE600] font-hh-mono font-bold text-xs uppercase tracking-wider border-2 border-[#FFE600] shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center space-x-2"
        >
          {copiedText ? <Check className="w-4 h-4 text-[#FFE600]" /> : <Share2 className="w-4 h-4 text-[#FF007F]" />}
          <span>{copiedText ? 'COPIED!' : 'SHARE TO SOCIAL'}</span>
        </button>

      </div>

      {/* Add to Squad Button */}
      {onAddToSquad && (
        <button
          onClick={() => { playClickSound(); onAddToSquad(identity); }}
          className="w-full px-5 py-2.5 bg-[#FF007F] hover:bg-[#FFE600] text-white hover:text-black font-hh-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center space-x-2"
        >
          <Shield className="w-4 h-4" />
          <span>ADD TO SQUAD POSTER (+1 SLOT)</span>
        </button>
      )}

    </div>
  );
};
