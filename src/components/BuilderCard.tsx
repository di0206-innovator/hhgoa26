import React, { useState, useRef } from 'react';
import { Download, Share2, Check, Link2, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderIdentity, FrameTheme } from '../types';
import { downloadCardAsPng, copySocialShareText } from '../utils/export';
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

  const qrValue = identity.linkedinUrl 
    ? identity.linkedinUrl 
    : identity.twitterHandle 
      ? `https://x.com/${identity.twitterHandle}` 
      : `https://hhgoa.com`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      rotateX: ((y - centerY) / centerY) * -8,
      rotateY: ((x - centerX) / centerX) * 8
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

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      
      {/* Frame Theme Switcher */}
      <div className="flex items-center justify-center space-x-2 bg-[#063D21] p-1.5 rounded-xl border-2 border-[#FFE600]">
        <button onClick={() => handleFrameChange('official_lanyard')}
          className={`px-3 py-1.5 rounded font-hh-mono font-bold text-[11px] uppercase transition-all ${frameTheme === 'official_lanyard' ? 'bg-[#FFE600] text-black shadow' : 'text-slate-200 hover:text-[#FFE600]'}`}>
          🪪 Official Lanyard
        </button>
        <button onClick={() => handleFrameChange('boarding_pass')}
          className={`px-3 py-1.5 rounded font-hh-mono font-bold text-[11px] uppercase transition-all ${frameTheme === 'boarding_pass' ? 'bg-[#FF007F] text-white shadow' : 'text-slate-200 hover:text-[#FFE600]'}`}>
          ✈️ Boarding Pass
        </button>
        <button onClick={() => handleFrameChange('vintage_poster')}
          className={`px-3 py-1.5 rounded font-hh-mono font-bold text-[11px] uppercase transition-all ${frameTheme === 'vintage_poster' ? 'bg-[#FAF7EC] text-[#063D21] border border-[#063D21]' : 'text-slate-200 hover:text-[#FFE600]'}`}>
          🌴 Vintage Poster
        </button>
      </div>

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
        className="relative w-full overflow-hidden shadow-2xl"
      >
        {/* ═══════════════════════════════════════════════════════ */}
        {/* THEME 1: OFFICIAL LANYARD (inspired by Aritra's card) */}
        {/* ═══════════════════════════════════════════════════════ */}
        {frameTheme === 'official_lanyard' && (
          <div className="bg-[#0B6638] rounded-3xl border-[6px] border-[#063D21] p-0 overflow-hidden" style={{ aspectRatio: '3/4.2' }}>
            {/* Lanyard Hole */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-4 bg-[#063D21] rounded-full border-2 border-[#0B6638] shadow-inner" />
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
            <div className="flex justify-center px-6 pb-3">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-t-full rounded-b-lg overflow-hidden border-4 border-[#FFE600] shadow-lg bg-black">
                <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Name in Yellow Box */}
            <div className="mx-5 px-4 py-2 bg-[#FFE600] border-3 border-[#063D21] rounded-lg text-center shadow">
              <h3 className="font-hh-title font-black text-xl sm:text-2xl text-[#063D21] uppercase tracking-wide truncate">
                {identity.name}
              </h3>
            </div>

            {/* Role Badge - Hot Pink */}
            <div className="flex justify-center pt-2 pb-1">
              <span className="px-5 py-1.5 bg-[#FF007F] text-white font-hh-title font-black text-sm uppercase tracking-wider rounded border-2 border-black shadow flex items-center space-x-1.5">
                <span>✦</span>
                <span>{identity.archetypeTitle.toUpperCase()}</span>
                <span>✦</span>
              </span>
            </div>

            {/* Organization & Builder ID */}
            <div className="text-center px-5 pt-1 pb-2">
              <p className="font-hh-mono text-[11px] text-amber-200 font-bold uppercase tracking-wider">
                {identity.college} &nbsp;•&nbsp; {identity.serialNumber}
              </p>
            </div>

            {/* QR Code Section */}
            <div className="flex justify-center pb-4 pt-1">
              <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-[#063D21]">
                <QRCodeSVG
                  value={qrValue}
                  size={80}
                  bgColor="#FFFFFF"
                  fgColor="#063D21"
                  level="M"
                  includeMargin={false}
                />
                <p className="text-center font-hh-mono text-[8px] text-[#063D21] font-bold uppercase pt-1">
                  {identity.linkedinUrl ? 'LINKEDIN' : 'SCAN ME'}
                </p>
              </div>
            </div>

            {/* Bottom Decorative Band */}
            <div className="hh-pattern-band h-4 w-full" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* THEME 2: BOARDING PASS (inspired by Amarendra's card)     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {frameTheme === 'boarding_pass' && (
          <div className="bg-[#042E18] rounded-2xl border-2 border-[#12844C] overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {/* Top Header Bar */}
            <div className="bg-[#063D21] px-4 py-2 flex items-center justify-between border-b border-[#12844C]">
              <div className="flex items-center space-x-2">
                <span className="font-hh-title font-black text-sm text-white uppercase tracking-tight">
                  HACKER <span className="font-hh-hindi text-[#FF007F]">गोवा</span> HOUSE
                </span>
                <span className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] font-hh-mono font-bold text-[9px] rounded border border-black">GOA 2026</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
                <span className="font-hh-mono text-[10px] text-[#FFE600] font-bold uppercase">BOARDING PASS</span>
              </div>
              <span className="font-hh-mono text-[10px] text-amber-300 font-bold">HH GOA 26</span>
            </div>

            <div className="flex h-full">
              {/* Left Section - Boarding Info */}
              <div className="flex-1 p-4 space-y-3">
                {/* FROM → TO */}
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-[9px] font-hh-mono text-amber-400 uppercase font-bold">FROM</span>
                    <h4 className="font-hh-title font-black text-xl text-white uppercase leading-tight">{identity.city || 'INDIA'}</h4>
                    <span className="text-[9px] font-hh-mono text-amber-400 uppercase">INDIA</span>
                  </div>
                  <div className="flex-shrink-0 text-center px-2">
                    <div className="w-10 h-10 rounded-full bg-[#FFE600] flex items-center justify-center mx-auto border border-black">
                      <span className="text-lg">🌅</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-hh-mono text-amber-400 uppercase font-bold">TO</span>
                    <h4 className="font-hh-title font-black text-xl text-[#FFE600] uppercase leading-tight">GOA</h4>
                    <span className="text-[9px] font-hh-mono text-amber-400 uppercase">HACKER HOUSE GOA 2026</span>
                  </div>
                </div>

                {/* Photo + Name Row */}
                <div className="flex items-start space-x-3 pt-1">
                  <div className="relative">
                    <img src={identity.avatarUrl} alt={identity.name}
                      className="w-16 h-16 rounded-lg object-cover border-2 border-[#12844C] shadow bg-black" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div>
                      <span className="text-[8px] font-hh-mono text-[#FF007F] uppercase font-bold">NAME</span>
                      <h3 className="font-hh-title font-black text-base text-white uppercase truncate leading-tight">{identity.name}</h3>
                    </div>
                    <div>
                      <span className="text-[8px] font-hh-mono text-[#FF007F] uppercase font-bold">COLLEGE</span>
                      <p className="font-hh-title font-bold text-xs text-amber-100 uppercase truncate leading-tight">{identity.college}</p>
                    </div>
                  </div>
                </div>

                {/* What I Do + Tech Stack */}
                <div className="flex items-start space-x-4 pt-0.5">
                  <div className="min-w-0">
                    <span className="text-[8px] font-hh-mono text-[#FF007F] uppercase font-bold">WHAT I DO</span>
                    <p className="font-hh-mono text-[10px] text-amber-100 uppercase font-bold truncate">{identity.whatIDo}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[8px] font-hh-mono text-[#FF007F] uppercase font-bold">TECH STACK</span>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {identity.techStack.slice(0, 4).map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-[#12844C] text-amber-100 text-[9px] font-hh-mono font-bold rounded border border-[#FFE600]/30 uppercase">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flight / Date / Seat Row */}
                <div className="flex items-center space-x-6 pt-1 border-t border-[#12844C]">
                  <div>
                    <span className="text-[8px] font-hh-mono text-amber-400 uppercase font-bold">FLIGHT</span>
                    <p className="font-hh-mono text-xs text-white font-bold">HH2626</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-hh-mono text-amber-400 uppercase font-bold">DATE</span>
                    <p className="font-hh-mono text-xs text-white font-bold">28 OCT - 31 OCT 2026</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-hh-mono text-amber-400 uppercase font-bold">SEAT</span>
                    <p className="font-hh-mono text-xs text-white font-bold">BUILDER 1A</p>
                  </div>
                </div>

                {/* Barcode + Serial */}
                <div className="flex items-center justify-between pt-1">
                  <div className="tracking-[3px] font-hh-mono text-[11px] text-amber-400 font-bold">|||||| | |||| ||| ||| || ||||</div>
                  <div className="flex items-center space-x-2">
                    <span className="font-hh-mono text-[10px] text-amber-300 font-bold">{identity.serialNumber}</span>
                    <span className="px-2 py-0.5 bg-[#FF007F] text-white font-hh-mono text-[9px] font-bold rounded">#FrameInGoa</span>
                  </div>
                </div>
              </div>

              {/* Right Tear-Off Section */}
              <div className="w-36 bg-[#063D21] border-l-2 border-dashed border-[#12844C] p-3 flex flex-col items-center justify-between text-center">
                <div className="space-y-1">
                  <span className="text-[9px] font-hh-mono text-[#FFE600] uppercase font-bold">GOA</span>
                  <h4 className="font-hh-title font-black text-sm text-white uppercase">DESTINATION</h4>
                </div>

                <div className="space-y-2">
                  <div className="px-3 py-1.5 bg-[#0B6638] border border-[#FFE600] rounded text-center">
                    <span className="font-hh-mono text-[10px] text-[#FFE600] font-bold uppercase">LET'S BUILD</span>
                    <p className="font-hh-mono text-[8px] text-amber-200 uppercase italic">AT SUNRISE</p>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-1.5 rounded shadow border border-[#12844C]">
                    <QRCodeSVG value={qrValue} size={60} bgColor="#FFFFFF" fgColor="#063D21" level="M" />
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <div className="px-2 py-1 bg-[#FFE600] text-[#063D21] rounded font-hh-mono text-[8px] font-black uppercase border border-black">
                    ✦ 2026 ✦ HH GOA ✦
                  </div>
                  <div className="px-2 py-1 bg-[#063D21] border border-[#FFE600] rounded font-hh-mono text-[8px] font-bold text-[#FFE600] uppercase">
                    BUILDER PASS
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-hh-mono text-amber-300 font-bold">
                    <span>CLASS: {identity.archetypeTitle.split(' ')[0].toUpperCase()}</span>
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
          <div className="bg-[#FAF7EC] rounded-3xl border-[6px] border-[#063D21] p-5 text-[#063D21] overflow-hidden" style={{ aspectRatio: '3/4' }}>
            
            {/* Top Badges Row */}
            <div className="flex items-start justify-between mb-2">
              {/* GOA INDIA Stamp */}
              <div className="w-14 h-14 border-2 border-[#063D21] rounded p-1 text-center flex flex-col items-center justify-center">
                <span className="font-hh-title font-black text-[10px] uppercase leading-tight">GOA</span>
                <span className="font-hh-mono text-[8px] uppercase text-[#FF007F] font-bold">INDIA</span>
                <span className="text-sm">🌅</span>
              </div>

              {/* HH GOA 2026 Center Badge */}
              <div className="px-3 py-1.5 bg-[#FF007F] text-white rounded border-2 border-[#063D21] shadow text-center">
                <span className="font-hh-title font-black text-xs uppercase leading-tight">HH<br/>GOA</span>
                <div className="font-hh-mono text-[10px] font-bold bg-[#FFE600] text-[#063D21] px-2 rounded mt-0.5">2026</div>
              </div>

              {/* Built in Goa Seal */}
              <div className="w-14 h-14 border-2 border-[#063D21] rounded-full flex flex-col items-center justify-center text-center">
                <span className="font-hh-mono text-[7px] uppercase font-bold leading-tight">BUILT IN GOA</span>
                <span className="text-xs">🌴</span>
                <span className="font-hh-mono text-[7px] uppercase font-bold leading-tight">SHIP FROM<br/>PARADISE</span>
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
            <div className="flex items-center gap-2 mb-3">
              {/* Left Date Vertical */}
              <div className="flex flex-col items-center space-y-0.5">
                <span className="font-hh-mono text-[8px] font-bold uppercase writing-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  28 - 31 OCT 2026
                </span>
              </div>

              {/* Left Signs */}
              <div className="space-y-1 flex-shrink-0">
                <div className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] font-hh-mono text-[9px] font-black uppercase rounded border border-[#063D21]">BUILD</div>
                <div className="px-2 py-0.5 bg-[#FF007F] text-white font-hh-mono text-[9px] font-black uppercase rounded border border-[#063D21]">SHIP</div>
                <div className="px-2 py-0.5 bg-[#FFE600] text-[#063D21] font-hh-mono text-[9px] font-black uppercase rounded border border-[#063D21]">REPEAT</div>
              </div>

              {/* Center Photo Circle */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#FFE600] shadow-lg bg-black mx-auto" style={{ boxShadow: '0 0 0 3px #FF007F, 0 0 0 6px #FFE600' }}>
                    <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Right Elements */}
              <div className="space-y-1 flex-shrink-0 text-right">
                <div className="px-2 py-1 bg-[#FFE600] text-[#063D21] font-hh-mono text-[8px] font-black uppercase rounded border border-[#063D21]">LET'S<br/>BUILD!</div>
                <div className="font-hh-mono text-lg text-[#063D21] font-bold">&lt;/&gt;</div>
              </div>

              {/* Right Vertical Label */}
              <div className="flex flex-col items-center">
                <span className="font-hh-mono text-[8px] font-bold uppercase" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  GOA, INDIA
                </span>
              </div>
            </div>

            {/* Name Banner */}
            <div className="bg-[#FFE600] border-2 border-[#063D21] rounded-lg px-4 py-2 text-center mb-2 shadow">
              <h3 className="font-hh-title font-black text-xl sm:text-2xl text-[#063D21] uppercase tracking-wide truncate">{identity.name}</h3>
            </div>

            {/* Role Banner - Pink */}
            <div className="flex justify-center mb-2">
              <span className="px-5 py-1 bg-[#FF007F] text-white font-hh-title font-black text-sm uppercase tracking-wider rounded-full border-2 border-[#063D21] shadow">
                ⚡ {identity.archetypeTitle.toUpperCase()} ⚡
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2 border-2 border-[#063D21] rounded text-center">
                <span className="text-[8px] font-hh-mono font-bold text-[#FF007F] uppercase">✦ BUILDER CLASS ✦</span>
                <p className="font-hh-title font-black text-xs uppercase leading-tight pt-0.5">{identity.archetypeTitle}</p>
              </div>
              <div className="p-2 border-2 border-[#063D21] rounded text-center">
                <span className="text-[8px] font-hh-mono font-bold text-[#FF007F] uppercase">✦ BEACH BAG ✦</span>
                <div className="space-y-0.5 pt-0.5">
                  <p className="text-[9px] font-hh-mono font-bold">🥥 {identity.goaFuel.split(' ')[0]}</p>
                  <p className="text-[9px] font-hh-mono font-bold">💻 VS Code</p>
                  <p className="text-[9px] font-hh-mono font-bold">🎧 Lo-Fi Beats</p>
                </div>
              </div>
              <div className="p-2 border-2 border-[#063D21] rounded text-center">
                <span className="text-[8px] font-hh-mono font-bold text-[#FF007F] uppercase">✦ CURRENTLY SHIPPING ✦</span>
                <p className="font-hh-title font-black text-xs uppercase leading-tight pt-0.5">{identity.currentlyShipping}</p>
              </div>
            </div>

            {/* Bottom: QR + ID + Barcode */}
            <div className="flex items-end justify-between border-t-2 border-[#063D21] pt-2">
              {/* QR Code */}
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1.5 rounded border-2 border-[#063D21] shadow">
                  <QRCodeSVG value={qrValue} size={52} bgColor="#FFFFFF" fgColor="#063D21" level="M" />
                </div>
                <div className="space-y-0.5">
                  {identity.linkedinUrl && (
                    <span className="px-1.5 py-0.5 bg-[#063D21] text-[#FFE600] font-hh-mono text-[8px] font-bold uppercase rounded flex items-center space-x-1">
                      <Link2 className="w-2.5 h-2.5" />
                      <span>LINKEDIN</span>
                    </span>
                  )}
                  <p className="font-hh-mono text-[8px] font-bold text-[#063D21]">BUILDER ID</p>
                  <p className="font-hh-mono text-[9px] font-bold text-[#063D21]">{identity.serialNumber}</p>
                </div>
              </div>

              {/* Barcode */}
              <div className="text-right space-y-0.5">
                <div className="tracking-[3px] font-hh-mono text-[10px] text-[#063D21] font-bold">||||| | |||| |||</div>
              </div>
            </div>

            {/* #FRAMEINGOA Footer */}
            <div className="mt-2 flex justify-center">
              <span className="px-6 py-1.5 bg-[#FF007F] text-white font-hh-title font-black text-sm uppercase tracking-wider rounded-full border-2 border-[#063D21] shadow">
                #FRAMEINGOA
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button onClick={handleDownload} disabled={isExporting}
          className="w-full sm:w-1/2 px-5 py-3 bg-[#FFE600] hover:bg-[#FF007F] text-[#063D21] hover:text-white font-hh-title font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-2">
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'EXPORTING...' : 'DOWNLOAD CARD'}</span>
        </button>

        <button onClick={handleShareText}
          className="w-full sm:w-1/2 px-5 py-3 bg-[#063D21] hover:bg-[#12844C] text-[#FFE600] font-hh-mono font-bold text-xs uppercase tracking-wider border-2 border-[#FFE600] shadow-[4px_4px_0px_#000000] transition-all flex items-center justify-center space-x-2">
          {copiedText ? <Check className="w-4 h-4 text-[#FFE600]" /> : <Share2 className="w-4 h-4 text-[#FF007F]" />}
          <span>{copiedText ? 'COPIED!' : 'COPY SHARE TEXT'}</span>
        </button>
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
