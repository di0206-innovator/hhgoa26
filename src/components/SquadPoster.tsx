import React, { useState } from 'react';
import { Shield, Plus, Download, Sparkles, Trash2 } from 'lucide-react';
import type { BuilderIdentity } from '../types';
import { downloadCardAsPng } from '../utils/export';
import { playClickSound, playStampSound } from '../utils/audio';

interface SquadPosterProps {
  currentIdentity?: BuilderIdentity | null;
  squadMembers: BuilderIdentity[];
  availableCommunityBuilders?: BuilderIdentity[];
  onRemoveMember: (id: string) => void;
  onAddMember: (identity: BuilderIdentity) => void;
  onOpenQuiz: () => void;
}

export const SquadPoster: React.FC<SquadPosterProps> = ({
  currentIdentity,
  squadMembers,
  availableCommunityBuilders = [],
  onRemoveMember,
  onAddMember,
  onOpenQuiz
}) => {
  const [squadName, setSquadName] = useState('Goa Cyber Syndicate');
  const [squadTagline, setSquadTagline] = useState('Shipped at 4 AM in Arambol');
  const [isExporting, setIsExporting] = useState(false);

  const allMembers = [...squadMembers];
  if (currentIdentity && !allMembers.some(m => m.id === currentIdentity.id) && allMembers.length < 4) {
    allMembers.unshift(currentIdentity);
  }

  const totalShipSpeed = allMembers.reduce((acc, m) => acc + m.stats.shipSpeed, 0);
  const avgCoffeeRatio = allMembers.length > 0 ? Math.round(allMembers.reduce((acc, m) => acc + m.stats.coffeeCodeRatio, 0) / allMembers.length) : 0;

  const getSynergyPerk = () => {
    if (allMembers.length === 4) return '⚡ +100% SHIP SPEED & UNLIMITED RED BULL BUDGET';
    if (allMembers.length === 3) return '🚀 +75% AI TOKEN ACCELERATION & ZERO MEMORY LEAKS';
    if (allMembers.length === 2) return '🔥 +50% PITCH DECK HYPE & RAPID MVP PROTOTYPING';
    return '🌱 SOLO BUILDER MODE (FORGE 3 CO-FOUNDERS TO UNLOCK SQUAD SYNERGY)';
  };

  const handleDownloadSquad = async () => {
    playStampSound();
    setIsExporting(true);
    await downloadCardAsPng('squad_poster_canvas', `${squadName.replace(/\s+/g, '_')}_HHGoa26_Squad`);
    setIsExporting(false);
  };

  const addableBuilders = availableCommunityBuilders.filter(b => !allMembers.some(m => m.id === b.id));

  return (
    <section id="squad" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#063D21] border-2 border-[#FFE600] text-[#FFE600] text-xs font-hh-mono font-bold uppercase rounded">
          <Shield className="w-4 h-4 text-[#FF007F]" />
          <span>MULTIPLAYER SQUAD MODE • CAPPED AT 4 BUILDERS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-hh-title font-black text-[#FFE600] uppercase tracking-tight">
          BUILD YOUR <span className="text-[#FF007F]">HACK SQUAD POSTER</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base font-hh-mono text-amber-100">
          Merge up to 4 builder identities into an epic team poster for Hacker House Goa 2026.
        </p>
      </div>

      {/* Bamboo Bar & Squad Config (Matching Screenshot 2) */}
      <div className="bg-[#063D21] rounded-2xl p-6 border-3 border-[#FFE600] shadow-[6px_6px_0px_#042E18] grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-1.5">
          <label className="text-xs font-hh-mono font-bold text-[#FFE600] uppercase">SQUAD NAME</label>
          <input
            type="text"
            value={squadName}
            onChange={e => setSquadName(e.target.value)}
            className="w-full px-4 py-2.5 rounded bg-[#0B6638] border-2 border-[#FFE600] text-white font-hh-title font-bold text-xl focus:outline-none focus:border-[#FF007F]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-hh-mono font-bold text-[#FFE600] uppercase">SQUAD MOTTO / TAGLINE</label>
          <input
            type="text"
            value={squadTagline}
            onChange={e => setSquadTagline(e.target.value)}
            className="w-full px-4 py-2.5 rounded bg-[#0B6638] border-2 border-[#FFE600] text-white font-hh-mono text-xs focus:outline-none focus:border-[#FF007F]"
          />
        </div>
      </div>

      {/* Squad Poster Canvas Area */}
      <div
        id="squad_poster_canvas"
        className="bg-[#0B6638] rounded-3xl p-6 sm:p-8 border-4 border-[#FFE600] shadow-[10px_10px_0px_#042E18] space-y-6 relative overflow-hidden"
      >
        {/* Bamboo Trim Header (Matching Screenshot 2) */}
        <div className="hh-bamboo-bar h-4 rounded-full w-full shadow" />

        {/* Poster Top Banner */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between border-b-2 border-[#FFE600] pb-6 gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="px-3 py-1 bg-[#FF007F] text-white font-hh-mono font-bold text-xs uppercase rounded border border-black">
                HH GOA '26 OFFICIAL SQUAD
              </span>
              <span className="text-xs font-hh-mono font-bold text-[#FFE600]">
                {allMembers.length}/4 MEMBERS
              </span>
            </div>
            <h3 className="font-hh-title font-black text-3xl sm:text-5xl text-[#FFE600] mt-1 uppercase">
              {squadName}
            </h3>
            <p className="text-xs font-hh-mono italic text-amber-100">"{squadTagline}"</p>
          </div>

          {/* Combined Team Stats Badge */}
          <div className="p-4 rounded bg-[#063D21] border-2 border-[#FFE600] space-y-1 text-center min-w-[200px] shadow-[4px_4px_0px_#000000]">
            <div className="text-[10px] font-hh-mono text-amber-200 uppercase font-bold">TEAM COMBINED SHIP POWER</div>
            <div className="font-hh-title font-black text-3xl text-[#FFE600]">{totalShipSpeed} PTS</div>
            <div className="text-[11px] font-hh-mono text-[#FF007F] font-bold">AVG COFFEE/CODE: {avgCoffeeRatio}%</div>
          </div>
        </div>

        {/* Members Grid (1 to 4 Members) */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allMembers.map((member, idx) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-[#063D21] border-2 border-[#FFE600] space-y-3 relative group hover:border-[#FF007F] transition-all shadow-[4px_4px_0px_#000000]"
            >
              {/* Member Slot Badge & Delete */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-hh-mono font-bold bg-[#FF007F] text-white px-2 py-0.5 rounded">
                  SLOT 0{idx + 1}
                </span>
                <button
                  onClick={() => { playClickSound(); onRemoveMember(member.id); }}
                  className="p-1 rounded bg-[#FF007F] text-white hover:bg-black transition-all"
                  title="Remove from squad"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Avatar & Class */}
              <div className="flex items-center space-x-3">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-12 h-12 rounded-lg object-cover border-2 border-[#FFE600]"
                />
                <div className="min-w-0">
                  <h4 className="font-hh-title font-bold text-base text-[#FFE600] truncate">{member.name}</h4>
                  <p className="text-[11px] font-hh-mono text-amber-200 truncate">@{member.handle}</p>
                </div>
              </div>

              {/* Archetype & Stats */}
              <div className="space-y-1 text-[11px] font-hh-mono border-t border-[#FFE600]/30 pt-2 text-slate-100">
                <div className="text-[#FFE600] font-bold uppercase">{member.archetypeTitle}</div>
                <div className="flex justify-between">
                  <span>Ship Speed:</span>
                  <span className="text-[#FFE600] font-bold">{member.stats.shipSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aura:</span>
                  <span className="text-[#FF007F] font-bold truncate">{member.goaAura}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Empty Member Slots */}
          {Array.from({ length: 4 - allMembers.length }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => { playClickSound(); onOpenQuiz(); }}
              className="p-6 rounded-xl border-3 border-dashed border-[#FFE600]/60 hover:border-[#FF007F] bg-[#063D21]/40 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer group transition-all min-h-[180px]"
            >
              <div className="w-10 h-10 rounded bg-[#FFE600] text-[#063D21] flex items-center justify-center font-bold">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xs font-hh-mono font-bold text-[#FFE600] group-hover:text-white uppercase">
                ADD SQUAD MEMBER
              </span>
              <span className="text-[10px] text-amber-100 font-hh-mono">Forge Identity for Slot 0{allMembers.length + idx + 1}</span>
            </div>
          ))}
        </div>

        {/* Squad Synergy Banner Footer */}
        <div className="relative p-4 rounded bg-[#063D21] border-2 border-[#FF007F] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-hh-mono text-[#FFE600]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#FF007F]" />
            <span className="font-bold">TEAM SYNERGY PERK:</span>
            <span>{getSynergyPerk()}</span>
          </div>
          <span className="text-[10px] text-amber-100">FORGE GOA // HHG-2026 OFFICIAL SQUAD</span>
        </div>

      </div>

      {/* Add Teammates Quick Bar */}
      {addableBuilders.length > 0 && (
        <div className="bg-[#063D21] rounded-2xl p-4 border-2 border-[#FFE600] space-y-3">
          <div className="flex items-center justify-between text-xs font-hh-mono text-amber-200">
            <span>ADD FORGED BUILDERS TO YOUR SQUAD:</span>
            <span>CAPPED AT 4 MEMBERS</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {addableBuilders.map(b => (
              <button
                key={b.id}
                disabled={allMembers.length >= 4}
                onClick={() => { playClickSound(); onAddMember(b); }}
                className="px-3 py-1.5 rounded bg-[#0B6638] text-white text-xs font-hh-mono font-bold border border-[#FFE600] hover:bg-[#FF007F] transition-all flex items-center space-x-2"
              >
                <img src={b.avatarUrl} alt={b.name} className="w-4 h-4 rounded-full object-cover" />
                <span>+ {b.name} ({b.archetypeTitle})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Download Squad Poster Button */}
      <div className="text-center">
        <button
          onClick={handleDownloadSquad}
          disabled={isExporting || allMembers.length === 0}
          className="px-8 py-4 bg-[#FF007F] hover:bg-[#FFE600] text-white hover:text-black font-hh-title font-black text-xl uppercase border-3 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center space-x-3 disabled:opacity-50"
        >
          <Download className="w-6 h-6" />
          <span>{isExporting ? 'EXPORTING SQUAD POSTER...' : 'DOWNLOAD 4-PERSON SQUAD POSTER (PNG)'}</span>
        </button>
      </div>

    </section>
  );
};
