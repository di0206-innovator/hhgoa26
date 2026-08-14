import React, { useState, useRef } from 'react';
import { Download, Share2, Check, Edit3, Shield, Zap, Plane, Cpu } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import type { BuilderIdentity, FrameTheme } from '../types';
import { PHOTO_FILTERS } from '../data/archetypes';
import { downloadCardAsPng, copySocialShareText, getTwitterShareUrl, getLinkedInShareUrl } from '../utils/export';
import { playClickSound, playChimeSound } from '../utils/audio';

interface BuilderCardProps {
  identity: BuilderIdentity;
  onUpdateIdentity?: (updated: BuilderIdentity) => void;
  onAddToSquad?: (identity: BuilderIdentity) => void;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({ identity, onUpdateIdentity, onAddToSquad }) => {
  const [frameTheme, setFrameTheme] = useState<FrameTheme>(identity.frameTheme || 'official_lanyard');
  const [copiedText, setCopiedText] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Inline Editing State
  const [editingField, setEditingField] = useState<string | null>(null);

  // Compute QR Destination URL
  const getQrValue = () => {
    const target = identity.qrTarget || 'linkedin';
    if (target === 'linkedin' && identity.linkedinUrl) return identity.linkedinUrl;
    if (target === 'twitter' && (identity.twitterHandle || identity.handle)) return `https://x.com/${identity.twitterHandle || identity.handle}`;
    if (target === 'github' && identity.githubHandle) return `https://github.com/${identity.githubHandle}`;
    if (target === 'portfolio' && identity.portfolioUrl) return identity.portfolioUrl;
    if (target === 'custom' && identity.customQrUrl) return identity.customQrUrl;

    // Fallbacks
    if (identity.linkedinUrl) return identity.linkedinUrl;
    if (identity.twitterHandle || identity.handle) return `https://x.com/${identity.twitterHandle || identity.handle}`;
    return `https://hhgoa.com`;
  };

  const qrValue = getQrValue();

  // Get active photo filter CSS
  const photoFilterCss = PHOTO_FILTERS.find(f => f.id === identity.photoFilter)?.css || 'none';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      rotateX: ((y - centerY) / centerY) * -6,
      rotateY: ((x - centerX) / centerX) * 6
    });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

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
    await downloadCardAsPng(`builder_card_${identity.id}`, `${identity.name.replace(/\s+/g, '_')}_HHGoa26_${frameTheme}`);
    setIsExporting(false);
  };

  const handleShareText = () => {
    playClickSound();
    copySocialShareText(identity);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const updateFieldInline = (key: keyof BuilderIdentity, val: string) => {
    if (onUpdateIdentity) {
      onUpdateIdentity({ ...identity, [key]: val });
    }
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      
      {/* Frame Theme Switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#063D21] p-1.5 rounded-xl border-2 border-[#FFE600] text-center">
        <button onClick={() => handleFrameChange('official_lanyard')}
          className={`py-1.5 px-2 rounded font-hh-mono font-bold text-[10px] sm:text-[11px] uppercase transition-all ${frameTheme === 'official_lanyard' ? 'bg-[#FFE600] text-black shadow' : 'text-slate-200 hover:text-[#FFE600]'}`}>
          🪪 Lanyard
        </button>
        <button onClick={() => handleFrameChange('boarding_pass')}
          className={`py-1.5 px-2 rounded font-hh-mono font-bold text-[10px] sm:text-[11px] uppercase transition-all ${frameTheme === 'boarding_pass' ? 'bg-[#FF007F] text-white shadow' : 'text-slate-200 hover:text-[#FFE600]'}`}>
          ✈️ Ticket
        </button>
        <button onClick={() => handleFrameChange('vintage_poster')}
          className={`py-1.5 px-2 rounded font-hh-mono font-bold text-[10px] sm:text-[11px] uppercase transition-all ${frameTheme === 'vintage_poster' ? 'bg-[#FAF7EC] text-[#063D21] border border-[#063D21]' : 'text-slate-200 hover:text-[#FFE600]'}`}>
          🌴 Vintage
        </button>
        <button onClick={() => handleFrameChange('cyber_neon')}
          className={`py-1.5 px-2 rounded font-hh-mono font-bold text-[10px] sm:text-[11px] uppercase transition-all ${frameTheme === 'cyber_neon' ? 'bg-cyan-400 text-black shadow font-black' : 'text-slate-200 hover:text-cyan-400'}`}>
          ⚡ Cyber
        </button>
      </div>

      <p className="text-[11px] text-amber-200/80 font-hh-mono text-center flex items-center justify-center space-x-1">
        <Edit3 className="w-3 h-3 text-[#FFE600]" />
        <span>Click any text field on the card to edit directly!</span>
      </p>

      {/* 3D Card Canvas */}
      <div
        ref={cardRef}
        id={`builder_card_${identity.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: tilt.rotateX === 0 ? 'transform 0.5s ease-out' : 'none'
        }}
        className="relative w-full overflow-hidden shadow-2xl rounded-3xl"
      >
        {/* ═══════════════════════════════════════════════════════ */}
        {/* THEME 1: OFFICIAL LANYARD (inspired by Aritra's card) */}
        {/* ═══════════════════════════════════════════════════════ */}
        {frameTheme === 'official_lanyard' && (
          <div className="bg-[#0B6638] rounded-3xl border-[6px] border-[#063D21] p-0 overflow-hidden relative" style={{ aspectRatio: '3/4.3' }}>
            {/* Lanyard Hole & Strap Clip */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-4 bg-[#063D21] rounded-full border-2 border-[#0B6638] shadow-inner flex items-center justify-center">
                <div className="w-4 h-1.5 bg-[#FFE600] rounded-full" />
              </div>
            </div>

            {/* Header Strip */}
            <div className="flex items-center justify-between px-5 py-2">
              <div className="font-hh-mono text-[10px] text-amber-100 font-bold leading-tight">
                <div className="text-base font-black text-[#FFE600]">2:47<span className="text-[10px]">PM</span></div>
                <div className="text-[9px] uppercase tracking-widest">STUDIO</div>
              </div>
              <div className="font-hh-mono text-[10px] text-amber-100 font-bold text-right leading-tight uppercase">
                <div>28 - 31 OCT 2026</div>
                <div>GOA, INDIA</div>
              </div>
            </div>

            {/* Giant Title */}
            <div className="text-center px-4 pt-1 pb-2 select-none">
              <h2 className="font-hh-title font-black text-[#FFE600] text-4xl sm:text-5xl uppercase tracking-tight leading-none drop-shadow-[3px_3px_0px_#042E18]">
                HACKER<span className="font-hh-hindi text-[#FF007F] text-3xl sm:text-4xl mx-1 px-2 py-0.5 bg-[#FFE600] border-2 border-black rounded inline-block rotate-[-4deg] shadow">गोवा</span>HOUSE
              </h2>
              <p className="font-hh-mono text-[9px] text-amber-200 uppercase tracking-[0.2em] pt-1">
                4 DAYS. ONE RHYTHM. EVERYTHING INTENTIONAL.
              </p>
            </div>

            {/* Hashtag Badge */}
            <div className="flex justify-center pb-2">
              <span className="px-4 py-1 bg-[#FFE600] text-[#063D21] font-hh-mono font-black text-xs uppercase rounded-full border-2 border-black shadow">
                #FrameInGoa
              </span>
            </div>

            {/* Photo with Arch Frame */}
            <div className="flex justify-center px-6 pb-2">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-t-full rounded-b-lg overflow-hidden border-4 border-[#FFE600] shadow-lg bg-black">
                <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover" style={{ filter: photoFilterCss }} />
              </div>
            </div>

            {/* Name in Yellow Box */}
            <div className="mx-5 px-4 py-2 bg-[#FFE600] border-3 border-[#063D21] rounded-lg text-center shadow relative group cursor-pointer">
              {editingField === 'name' ? (
                <input
                  type="text"
                  value={identity.name}
                  onChange={e => updateFieldInline('name', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="w-full text-center bg-white text-[#063D21] font-hh-title font-black text-xl border border-black rounded"
                />
              ) : (
                <h3 onClick={() => setEditingField('name')} className="font-hh-title font-black text-xl sm:text-2xl text-[#063D21] uppercase tracking-wide truncate">
                  {identity.name}
                  <Edit3 className="w-3 h-3 text-[#FF007F] inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              )}
            </div>

            {/* Role Badge - Hot Pink */}
            <div className="flex justify-center pt-2 pb-1">
              <span className="px-5 py-1.5 bg-[#FF007F] text-white font-hh-title font-black text-xs sm:text-sm uppercase tracking-wider rounded border-2 border-black shadow flex items-center space-x-1.5">
                <span>✦</span>
                <span>{identity.archetypeTitle.toUpperCase()}</span>
                <span>✦</span>
              </span>
            </div>

            {/* Pinned Sticker Badges */}
            {identity.stickers && identity.stickers.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 px-4 pt-1.5 pb-1">
                {identity.stickers.slice(0, 4).map((s, idx) => (
                  <span
                    key={s.id || idx}
                    className={`px-2 py-0.5 text-[9px] font-hh-mono font-bold uppercase rounded-full border border-black shadow-sm ${s.color}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            )}

            {/* Organization & Builder ID */}
            <div className="text-center px-5 pt-1 pb-2">
              <p className="font-hh-mono text-[11px] text-amber-200 font-bold uppercase tracking-wider">
                {identity.college} &nbsp;•&nbsp; {identity.serialNumber}
              </p>
            </div>

            {/* QR Code Section */}
            <div className="flex justify-center pb-3 pt-1">
              <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-[#063D21]">
                <QRCodeSVG
                  value={qrValue}
                  size={75}
                  bgColor="#FFFFFF"
                  fgColor="#063D21"
                  level="M"
                  includeMargin={false}
                />
                <p className="text-center font-hh-mono text-[8px] text-[#063D21] font-bold uppercase pt-1">
                  SCAN FOR {identity.qrTarget ? identity.qrTarget.toUpperCase() : 'PROFILE'}
                </p>
              </div>
            </div>

            {/* Bottom Decorative Band */}
            <div className="hh-pattern-band h-4 w-full" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* THEME 2: BOARDING PASS (Redesigned Perfect Ticket Layout) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {frameTheme === 'boarding_pass' && (
          <div className="bg-[#042E18] rounded-2xl border-3 border-[#FFE600] overflow-hidden relative shadow-xl font-hh-mono" style={{ aspectRatio: '16/10.2' }}>
            
            {/* Top Header Strip */}
            <div className="bg-[#063D21] px-4 py-2 flex items-center justify-between border-b-2 border-[#FFE600]/40 text-white">
              <div className="flex items-center space-x-2">
                <span className="font-hh-title font-black text-sm text-[#FFE600] uppercase tracking-tight">
                  HACKER <span className="font-hh-hindi text-[#FF007F]">गोवा</span> HOUSE
                </span>
                <span className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] font-bold text-[9px] rounded border border-black">GOA 2026</span>
              </div>
              <div className="flex items-center space-x-2">
                <Plane className="w-3.5 h-3.5 text-[#FFE600]" />
                <span className="text-[10px] text-[#FFE600] font-bold uppercase">BOARDING PASS</span>
              </div>
              <span className="text-[10px] text-amber-300 font-bold">FLIGHT HH2626</span>
            </div>

            {/* Ticket Content Container */}
            <div className="flex h-[calc(100%-38px)] relative">

              {/* Left Main Ticket Section */}
              <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between overflow-hidden space-y-2">
                
                {/* FROM → TO Route Strip */}
                <div className="flex items-center justify-between bg-[#063D21]/80 p-2 rounded-xl border border-[#FFE600]/30">
                  <div className="cursor-pointer group" onClick={() => setEditingField('city')}>
                    <span className="text-[8px] text-amber-400 uppercase font-bold block">FROM</span>
                    {editingField === 'city' ? (
                      <input
                        type="text"
                        value={identity.city}
                        onChange={e => updateFieldInline('city', e.target.value)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="bg-[#0B6638] text-white font-hh-title font-black text-sm border border-[#FFE600] rounded px-1 w-20"
                      />
                    ) : (
                      <h4 className="font-hh-title font-black text-sm sm:text-base text-white uppercase leading-tight truncate max-w-[100px]">
                        {identity.city || 'INDIA'}
                      </h4>
                    )}
                  </div>

                  {/* Flight Plane Icon & Line */}
                  <div className="flex-1 flex items-center justify-center px-3 space-x-1 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
                    <div className="flex-1 h-[2px] bg-dashed border-b border-dashed border-[#FFE600]" />
                    <Plane className="w-4 h-4 text-[#FFE600] rotate-90" />
                    <div className="flex-1 h-[2px] bg-dashed border-b border-dashed border-[#FFE600]" />
                    <span className="w-2 h-2 rounded-full bg-[#FF007F]" />
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] text-amber-400 uppercase font-bold block">TO</span>
                    <h4 className="font-hh-title font-black text-sm sm:text-base text-[#FFE600] uppercase leading-tight">GOA</h4>
                  </div>
                </div>

                {/* Profile Info Row: Photo + Name + Org + Tagline */}
                <div className="flex items-center space-x-3 bg-[#063D21]/50 p-2 rounded-xl border border-[#12844C]">
                  <img
                    src={identity.avatarUrl}
                    alt={identity.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-[#FFE600] bg-black flex-shrink-0 shadow"
                    style={{ filter: photoFilterCss }}
                  />
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="cursor-pointer group" onClick={() => setEditingField('name')}>
                      <span className="text-[7px] text-[#FF007F] font-bold uppercase block">PASSENGER NAME</span>
                      {editingField === 'name' ? (
                        <input
                          type="text"
                          value={identity.name}
                          onChange={e => updateFieldInline('name', e.target.value)}
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          className="bg-[#063D21] text-white font-hh-title font-black text-xs border border-[#FFE600] rounded px-1 w-full"
                        />
                      ) : (
                        <h3 className="font-hh-title font-black text-sm sm:text-base text-white uppercase truncate leading-tight">
                          {identity.name}
                        </h3>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-[9px] text-amber-200">
                      <span className="font-bold truncate text-white">{identity.college}</span>
                      <span>•</span>
                      <span className="truncate text-[#FFE600]">{identity.whatIDo}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Arsenal & Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {identity.techStack.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 bg-[#12844C] text-[#FFE600] text-[8px] font-bold rounded border border-[#FFE600]/40 uppercase">
                      {t}
                    </span>
                  ))}
                  {identity.stickers && identity.stickers.slice(0, 2).map((s, idx) => (
                    <span key={s.id || idx} className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded border border-black shadow-sm ${s.color}`}>
                      {s.label}
                    </span>
                  ))}
                </div>

                {/* Bottom Ticket Footer: Barcode & Flight Stats */}
                <div className="flex items-center justify-between pt-1 border-t border-[#12844C] text-[9px]">
                  <div className="font-mono text-amber-300 font-bold tracking-[2px]">
                    |||||| | |||| ||| |||
                  </div>
                  <div className="flex items-center space-x-3 text-amber-200">
                    <span>SEAT: <strong className="text-white">1A</strong></span>
                    <span>GATE: <strong className="text-[#FFE600]">GOA-01</strong></span>
                    <span className="px-2 py-0.5 bg-[#FF007F] text-white text-[8px] font-black rounded uppercase">#FrameInGoa</span>
                  </div>
                </div>

              </div>

              {/* Semicircular Ticket Notch (Top & Bottom Cutouts) */}
              <div className="absolute top-0 bottom-0 left-[calc(100%-8.5rem)] w-[2px] border-l-2 border-dashed border-[#FFE600]/60 z-10 flex flex-col justify-between">
                <div className="w-4 h-4 bg-[#0B6638] rounded-full -translate-x-1/2 -translate-y-1/2 border border-[#FFE600]" />
                <div className="w-4 h-4 bg-[#0B6638] rounded-full -translate-x-1/2 translate-y-1/2 border border-[#FFE600]" />
              </div>

              {/* Right Tear-Off Pass Stub (Matches Hosted Version + Zero Overflow) */}
              <div className="w-34 sm:w-36 bg-[#063D21] p-2.5 flex flex-col items-center justify-between text-center border-l-2 border-dashed border-[#FFE600]/40 flex-shrink-0">
                <div className="space-y-0.5">
                  <span className="text-[8px] text-[#FFE600] uppercase font-bold tracking-widest block">GOA</span>
                  <h4 className="font-hh-title font-black text-xs sm:text-sm text-white uppercase leading-tight">DESTINATION</h4>
                </div>

                {/* Let's Build Pill */}
                <div className="px-2 py-1 bg-[#0B6638] text-[#FFE600] border border-[#FFE600]/60 rounded font-hh-mono text-[8px] font-black uppercase w-full">
                  LET'S BUILD
                  <span className="block text-[7px] text-amber-200 font-normal italic">AT SUNRISE</span>
                </div>

                {/* QR Code */}
                <div className="bg-white p-1 rounded-lg shadow-md border-2 border-[#FFE600] my-0.5">
                  <QRCodeSVG value={qrValue} size={58} bgColor="#FFFFFF" fgColor="#063D21" level="M" />
                </div>

                <div className="space-y-1 w-full">
                  <div className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] rounded font-hh-mono text-[8px] font-black uppercase border border-black truncate">
                    ✦ 2026 ✦ HH GOA ✦
                  </div>
                  <div className="px-2 py-0.5 bg-[#FF007F] text-white rounded font-hh-title font-black text-[8px] uppercase tracking-wider border border-black truncate">
                    {identity.archetypeTitle}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* THEME 3: VINTAGE POSTER (inspired by Shreyas/Nityom)      */}
        {/* ════════════════════════════════════════════════════════════ */}
        {frameTheme === 'vintage_poster' && (
          <div className="bg-[#FAF7EC] rounded-3xl border-[6px] border-[#063D21] p-5 text-[#063D21] overflow-hidden" style={{ aspectRatio: '3/4.2' }}>
            
            {/* Top Badges Row */}
            <div className="flex items-start justify-between mb-2">
              {/* GOA INDIA Stamp */}
              <div className="w-13 h-13 border-2 border-[#063D21] rounded p-1 text-center flex flex-col items-center justify-center">
                <span className="font-hh-title font-black text-[10px] uppercase leading-tight">GOA</span>
                <span className="font-hh-mono text-[8px] uppercase text-[#FF007F] font-bold">INDIA</span>
                <span className="text-xs">🌅</span>
              </div>

              {/* HH GOA 2026 Center Badge */}
              <div className="px-3 py-1 bg-[#FF007F] text-white rounded border-2 border-[#063D21] shadow text-center">
                <span className="font-hh-title font-black text-xs uppercase leading-tight">HH<br/>GOA</span>
                <div className="font-hh-mono text-[9px] font-bold bg-[#FFE600] text-[#063D21] px-1.5 rounded mt-0.5">2026</div>
              </div>

              {/* Built in Goa Seal */}
              <div className="w-13 h-13 border-2 border-[#063D21] rounded-full flex flex-col items-center justify-center text-center">
                <span className="font-hh-mono text-[6px] uppercase font-bold leading-tight">BUILT IN GOA</span>
                <span className="text-xs">🌴</span>
                <span className="font-hh-mono text-[6px] uppercase font-bold leading-tight">PARADISE</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-2 select-none">
              <h2 className="font-hh-title font-black text-3xl uppercase tracking-tight leading-none">
                HACKER <span className="font-hh-hindi text-[#FF007F]">गोवा</span> HOUSE
              </h2>
              <p className="font-hh-mono text-[9px] uppercase tracking-[0.15em] text-[#063D21]/70 pt-0.5">
                CODE • CONNECT • CHILL • REPEAT
              </p>
            </div>

            {/* Vertical Date & Circular Photo */}
            <div className="flex items-center gap-2 mb-2">
              {/* Left Signs */}
              <div className="space-y-1 flex-shrink-0">
                <div className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] font-hh-mono text-[8px] font-black uppercase rounded border border-[#063D21]">BUILD</div>
                <div className="px-2 py-0.5 bg-[#FF007F] text-white font-hh-mono text-[8px] font-black uppercase rounded border border-[#063D21]">SHIP</div>
              </div>

              {/* Center Photo Circle */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#FFE600] shadow-lg bg-black mx-auto" style={{ boxShadow: '0 0 0 3px #FF007F, 0 0 0 6px #FFE600' }}>
                    <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover" style={{ filter: photoFilterCss }} />
                  </div>
                </div>
              </div>

              {/* Right Elements */}
              <div className="space-y-1 flex-shrink-0 text-right">
                <div className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] font-hh-mono text-[8px] font-black uppercase rounded border border-[#063D21]">LET'S BUILD</div>
                <div className="font-hh-mono text-base text-[#063D21] font-bold">&lt;/&gt;</div>
              </div>
            </div>

            {/* Name Banner */}
            <div className="bg-[#FFE600] border-2 border-[#063D21] rounded-lg px-3 py-1.5 text-center mb-2 shadow cursor-pointer group" onClick={() => setEditingField('name')}>
              {editingField === 'name' ? (
                <input
                  type="text"
                  value={identity.name}
                  onChange={e => updateFieldInline('name', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="w-full text-center bg-white text-[#063D21] font-hh-title font-black text-xl border border-black rounded"
                />
              ) : (
                <h3 className="font-hh-title font-black text-xl sm:text-2xl text-[#063D21] uppercase tracking-wide truncate">{identity.name}</h3>
              )}
            </div>

            {/* Role Banner - Pink */}
            <div className="flex justify-center mb-2">
              <span className="px-4 py-1 bg-[#FF007F] text-white font-hh-title font-black text-xs sm:text-sm uppercase tracking-wider rounded-full border-2 border-[#063D21] shadow">
                ⚡ {identity.archetypeTitle.toUpperCase()} ⚡
              </span>
            </div>

            {/* Pinned Badges */}
            {identity.stickers && identity.stickers.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mb-2">
                {identity.stickers.slice(0, 4).map((s, idx) => (
                  <span key={s.id || idx} className={`px-2 py-0.5 text-[8px] font-hh-mono font-bold uppercase rounded border border-[#063D21] ${s.color}`}>
                    {s.label}
                  </span>
                ))}
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              <div className="p-1.5 border-2 border-[#063D21] rounded text-center">
                <span className="text-[7px] font-hh-mono font-bold text-[#FF007F] uppercase">✦ CLASS ✦</span>
                <p className="font-hh-title font-black text-[10px] uppercase leading-tight pt-0.5 truncate">{identity.archetypeTitle}</p>
              </div>
              <div className="p-1.5 border-2 border-[#063D21] rounded text-center">
                <span className="text-[7px] font-hh-mono font-bold text-[#FF007F] uppercase">✦ FUEL ✦</span>
                <p className="text-[8px] font-hh-mono font-bold truncate pt-0.5">🥥 {identity.goaFuel.split(' ')[0]}</p>
              </div>
              <div className="p-1.5 border-2 border-[#063D21] rounded text-center">
                <span className="text-[7px] font-hh-mono font-bold text-[#FF007F] uppercase">✦ SHIPPING ✦</span>
                <p className="font-hh-title font-black text-[10px] uppercase leading-tight pt-0.5 truncate">{identity.currentlyShipping}</p>
              </div>
            </div>

            {/* Bottom: QR + ID + Barcode */}
            <div className="flex items-end justify-between border-t-2 border-[#063D21] pt-1.5">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded border-2 border-[#063D21] shadow">
                  <QRCodeSVG value={qrValue} size={48} bgColor="#FFFFFF" fgColor="#063D21" level="M" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-hh-mono text-[7px] font-bold text-[#063D21]">BUILDER ID</p>
                  <p className="font-hh-mono text-[8px] font-bold text-[#063D21]">{identity.serialNumber}</p>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div className="tracking-[2px] font-hh-mono text-[9px] text-[#063D21] font-bold">||||| | |||| |||</div>
                <span className="px-3 py-1 bg-[#FF007F] text-white font-hh-title font-black text-xs uppercase tracking-wider rounded-full border border-[#063D21] inline-block">
                  #FRAMEINGOA
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* THEME 4: CYBER NEON VIP PASS (DRASTICALLY IMPROVED HUD PASS) */}
        {/* ════════════════════════════════════════════════════════════ */}
        {frameTheme === 'cyber_neon' && (
          <div className="bg-[#070C16] rounded-3xl border-2 border-cyan-400 p-5 text-white overflow-hidden relative shadow-[0_0_30px_rgba(0,242,254,0.35)] font-hh-mono" style={{ aspectRatio: '3/4.4' }}>
            
            {/* Holographic Watermark Matrix Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe0d_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe0d_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

            {/* Glowing Corner HUD Brackets [+] */}
            <div className="absolute top-2 left-2 text-cyan-400 font-bold text-xs opacity-70">+</div>
            <div className="absolute top-2 right-2 text-cyan-400 font-bold text-xs opacity-70">+</div>
            <div className="absolute bottom-2 left-2 text-cyan-400 font-bold text-xs opacity-70">+</div>
            <div className="absolute bottom-2 right-2 text-cyan-400 font-bold text-xs opacity-70">+</div>

            {/* Glowing Top Laser Header Bar */}
            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2 mb-2 relative z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400 inline" />
                  <span>HH-NET // SECURE ACCESS</span>
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white text-[9px] font-black uppercase rounded shadow-[0_0_10px_rgba(255,0,127,0.5)]">
                VIP BUILDER PASS
              </span>
            </div>

            {/* Cyber Brand Title with Neon Glow */}
            <div className="text-center mb-2 select-none relative z-10">
              <h2 className="font-hh-title font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-yellow-300 uppercase tracking-tight leading-none drop-shadow-[0_0_10px_rgba(0,242,254,0.8)]">
                HACKER<span className="text-pink-500 mx-1 font-hh-hindi drop-shadow-[0_0_8px_#ff007f]">गोवा</span>HOUSE
              </h2>
              <div className="flex justify-center items-center space-x-2 pt-1 text-[8px] text-cyan-300 font-bold uppercase tracking-[0.2em]">
                <span className="h-[1px] w-6 bg-cyan-400/60" />
                <span>CLASSIFIED PASSPORT // GOA 2026</span>
                <span className="h-[1px] w-6 bg-cyan-400/60" />
              </div>
            </div>

            {/* Cyber Photo HUD Frame */}
            <div className="flex justify-center mb-2.5 relative z-10">
              <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-yellow-300 shadow-[0_0_20px_rgba(0,242,254,0.6)]">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-black relative">
                  <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover" style={{ filter: photoFilterCss }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-black/60 pointer-events-none" />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#070C16] border border-cyan-400 rounded-full text-[8px] text-cyan-300 font-bold uppercase shadow flex items-center space-x-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>SHIP SPEED: {identity.stats.shipSpeed}%</span>
                </div>
              </div>
            </div>

            {/* Cyber Name Callsign */}
            <div className="text-center mb-2 cursor-pointer group relative z-10" onClick={() => setEditingField('name')}>
              {editingField === 'name' ? (
                <input
                  type="text"
                  value={identity.name}
                  onChange={e => updateFieldInline('name', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                  className="bg-slate-900 text-cyan-300 font-hh-title font-black text-xl border border-cyan-400 rounded text-center px-2 py-0.5"
                />
              ) : (
                <h3 className="font-hh-title font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white uppercase tracking-wide truncate drop-shadow-[0_0_10px_rgba(0,242,254,0.9)]">
                  {identity.name}
                </h3>
              )}
              <p className="text-[10px] text-cyan-300 font-bold tracking-wider pt-0.5">
                @{identity.twitterHandle || identity.handle} &nbsp;•&nbsp; <span className="text-pink-400">{identity.college}</span>
              </p>
            </div>

            {/* Role Glitch Cyber Badge */}
            <div className="flex justify-center mb-2 relative z-10">
              <span className="px-4 py-1 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-hh-title font-black text-xs uppercase tracking-wider rounded-lg border border-pink-400 shadow-[0_0_14px_rgba(255,0,127,0.7)] flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-current" />
                <span>{identity.archetypeTitle.toUpperCase()}</span>
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-current" />
              </span>
            </div>

            {/* Pinned Cyber Badges */}
            {identity.stickers && identity.stickers.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mb-2 relative z-10">
                {identity.stickers.slice(0, 4).map((s, idx) => (
                  <span key={s.id || idx} className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded border border-cyan-400/60 shadow-[0_0_8px_rgba(0,242,254,0.2)] ${s.color}`}>
                    {s.label}
                  </span>
                ))}
              </div>
            )}

            {/* Cyber Neon Progress Bar Stat Grid */}
            <div className="bg-[#0D1527]/90 border border-cyan-500/40 p-2.5 rounded-xl space-y-1.5 mb-2.5 relative z-10 shadow-inner">
              <div className="flex items-center justify-between text-[8px] font-bold">
                <span className="text-cyan-300">SHIP SPEED</span>
                <div className="flex-1 mx-2 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-cyan-500/30">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full" style={{ width: `${identity.stats.shipSpeed}%` }} />
                </div>
                <span className="text-cyan-400 font-mono">{identity.stats.shipSpeed}/100</span>
              </div>

              <div className="flex items-center justify-between text-[8px] font-bold">
                <span className="text-pink-300">COFFEE CODE</span>
                <div className="flex-1 mx-2 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-pink-500/30">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full" style={{ width: `${identity.stats.coffeeCodeRatio}%` }} />
                </div>
                <span className="text-pink-400 font-mono">{identity.stats.coffeeCodeRatio}%</span>
              </div>

              <div className="flex items-center justify-between text-[8px] font-bold">
                <span className="text-yellow-300">VIBE SCORE</span>
                <div className="flex-1 mx-2 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-yellow-500/30">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full" style={{ width: `${identity.stats.vibeScore ?? 98}%` }} />
                </div>
                <span className="text-yellow-400 font-mono">{identity.stats.vibeScore ?? 98}%</span>
              </div>
            </div>

            {/* Cyber QR Target Code & Terminal ID Footer */}
            <div className="flex items-center justify-between border-t border-cyan-500/40 pt-2 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.5)]">
                  <QRCodeSVG value={qrValue} size={46} bgColor="#FFFFFF" fgColor="#070C16" level="M" />
                </div>
                <div className="space-y-0.5 text-[8px]">
                  <p className="text-cyan-400 font-bold uppercase">SYS_ID // {identity.serialNumber}</p>
                  <p className="text-slate-300">LOC: <strong className="text-white">VAGATOR_GOA</strong></p>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <span className="px-2.5 py-1 bg-cyan-400 text-black text-[9px] font-black uppercase rounded shadow-[0_0_10px_rgba(0,242,254,0.6)] inline-block">
                  #CYBERGOA26
                </span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5">
        <button onClick={handleDownload} disabled={isExporting}
          className="w-full sm:w-1/2 px-4 py-3 bg-[#FFE600] hover:bg-[#FF007F] text-[#063D21] hover:text-white font-hh-title font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center space-x-2">
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'EXPORTING 3X PNG...' : 'DOWNLOAD 3X PNG'}</span>
        </button>

        <button onClick={handleShareText}
          className="w-full sm:w-1/2 px-4 py-3 bg-[#063D21] hover:bg-[#12844C] text-[#FFE600] font-hh-mono font-bold text-xs uppercase tracking-wider border-2 border-[#FFE600] shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center space-x-2">
          {copiedText ? <Check className="w-4 h-4 text-[#FFE600]" /> : <Share2 className="w-4 h-4 text-[#FF007F]" />}
          <span>{copiedText ? 'COPIED!' : 'COPY SHARE TEXT'}</span>
        </button>
      </div>

      {/* Direct Social Media Share Buttons */}
      <div className="grid grid-cols-2 gap-2 font-hh-mono text-xs">
        <a
          href={getTwitterShareUrl(identity)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          className="py-2.5 px-3 bg-black hover:bg-slate-900 text-white font-bold rounded-xl border border-slate-700 text-center flex items-center justify-center space-x-1.5 shadow"
        >
          <span>🐦 SHARE ON X</span>
        </a>
        <a
          href={getLinkedInShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          className="py-2.5 px-3 bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold rounded-xl border border-blue-400 text-center flex items-center justify-center space-x-1.5 shadow"
        >
          <span>💼 SHARE LINKEDIN</span>
        </a>
      </div>

      {/* Add to Squad */}
      {onAddToSquad && (
        <button
          onClick={() => { playClickSound(); onAddToSquad(identity); }}
          className="w-full px-5 py-2.5 bg-[#FF007F] hover:bg-[#FFE600] text-white hover:text-black font-hh-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center space-x-2">
          <span>+ ADD TO SQUAD POSTER</span>
        </button>
      )}
    </div>
  );
};
