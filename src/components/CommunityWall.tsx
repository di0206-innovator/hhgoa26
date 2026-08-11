import React, { useState } from 'react';
import { Users, Terminal, Sparkles, Link2, MapPin, Building } from 'lucide-react';
import type { BuilderIdentity } from '../types';
import { ARCHETYPES } from '../data/archetypes';
import { playClickSound } from '../utils/audio';

interface CommunityWallProps {
  builders: BuilderIdentity[];
  onSelectBuilder: (builder: BuilderIdentity) => void;
  onOpenQuiz: () => void;
}

export const CommunityWall: React.FC<CommunityWallProps> = ({ builders, onSelectBuilder, onOpenQuiz }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredBuilders = selectedFilter === 'all'
    ? builders
    : builders.filter(b => b.archetypeId === selectedFilter);

  return (
    <section id="community" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-[#063D21] border-t-4 border-b-4 border-[#FFE600] rounded-3xl p-6 sm:p-12 my-12 shadow-2xl">
      
      {/* Section Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#0B6638] border-2 border-[#FFE600] text-[#FFE600] text-xs font-hh-mono font-bold uppercase rounded">
          <Users className="w-4 h-4 text-[#FF007F]" />
          <span>LIVE COMMUNITY TICKER • HACKER HOUSE GOA 2026</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-hh-title font-black text-[#FFE600] uppercase tracking-tight">
          HALL OF <span className="text-[#FF007F]">FORGED BUILDERS</span>
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base font-hh-mono text-amber-100">
          Explore newly forged identities. Click any card to view and download their full passport.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => { playClickSound(); setSelectedFilter('all'); }}
          className={`px-4 py-2 rounded font-hh-mono font-bold text-xs uppercase transition-all ${
            selectedFilter === 'all'
              ? 'bg-[#FFE600] text-black border-2 border-black shadow'
              : 'bg-[#0B6638] text-slate-200 border border-[#FFE600]/40 hover:border-[#FFE600]'
          }`}
        >
          ALL ({builders.length})
        </button>

        {Object.values(ARCHETYPES).map(arch => (
          <button
            key={arch.id}
            onClick={() => { playClickSound(); setSelectedFilter(arch.id); }}
            className={`px-3 py-2 rounded font-hh-mono font-bold text-xs uppercase transition-all ${
              selectedFilter === arch.id
                ? 'bg-[#FF007F] text-white border-2 border-black shadow'
                : 'bg-[#0B6638] text-slate-200 border border-[#FFE600]/40 hover:border-[#FFE600]'
            }`}
          >
            {arch.title}
          </button>
        ))}
      </div>

      {/* Community Grid */}
      {filteredBuilders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBuilders.map(builder => (
            <div
              key={builder.id}
              onClick={() => { playClickSound(); onSelectBuilder(builder); }}
              className="bg-[#FAF7EC] text-[#063D21] rounded-2xl p-5 border-3 border-[#063D21] space-y-3 hover:border-[#FF007F] transition-all cursor-pointer group hover:scale-[1.02] shadow-[6px_6px_0px_#FFE600]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between text-[10px] font-hh-mono font-bold">
                <span className="bg-[#FF007F] text-white px-2 py-0.5 rounded">{builder.serialNumber}</span>
                <span>{builder.createdAt}</span>
              </div>

              {/* Avatar & Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={builder.avatarUrl}
                  alt={builder.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#063D21]"
                />
                <div className="min-w-0">
                  <h4 className="font-hh-title font-black text-lg text-[#063D21] truncate uppercase">
                    {builder.name}
                  </h4>
                  <p className="text-[11px] font-hh-mono font-bold opacity-70 truncate">@{builder.handle}</p>
                </div>
              </div>

              {/* Archetype Title */}
              <div className="px-3 py-1 rounded bg-[#063D21] text-[#FFE600] text-xs font-hh-mono font-bold text-center uppercase">
                {builder.archetypeTitle}
              </div>

              {/* College & City */}
              {(builder.college || builder.city) && (
                <div className="space-y-0.5 text-[10px] font-hh-mono font-bold text-[#063D21]/80">
                  {builder.college && (
                    <div className="flex items-center space-x-1">
                      <Building className="w-3 h-3 text-[#FF007F]" />
                      <span className="truncate">{builder.college}</span>
                    </div>
                  )}
                  {builder.city && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#FF007F]" />
                      <span>{builder.city} → GOA</span>
                    </div>
                  )}
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center space-x-2 pt-1 border-t border-[#063D21]/20">
                {builder.linkedinUrl && (
                  <a href={builder.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-1 rounded bg-[#063D21] text-[#FFE600] hover:bg-[#FF007F] transition-colors">
                    <Link2 className="w-3.5 h-3.5" />
                  </a>
                )}
                <div className="flex-1 flex justify-between text-[10px] font-hh-mono font-bold">
                  <span>Ship: <span className="text-[#FF007F]">{builder.stats.shipSpeed}</span></span>
                  <span className="text-[#063D21]/60">Click to view →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-[#0B6638] border-3 border-[#FFE600] text-center space-y-4 max-w-lg mx-auto shadow-[6px_6px_0px_#042E18]">
          <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-black mx-auto flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-hh-title font-black text-2xl text-[#FFE600] uppercase">No Identities Forged Yet</h3>
          <p className="text-xs text-amber-100 font-hh-mono">
            Be the first builder to forge an official HH Goa '26 Builder Passport!
          </p>
          <button
            onClick={() => { playClickSound(); onOpenQuiz(); }}
            className="px-6 py-3 bg-[#FF007F] text-white font-hh-title font-black text-base tracking-wider uppercase border-2 border-black shadow-[4px_4px_0px_#000000]"
          >
            FORGE FIRST PASSPORT NOW
          </button>
        </div>
      )}

      {/* Archetype Showcase */}
      <div id="archetypes" className="pt-12 space-y-8 border-t-4 border-[#FFE600]">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-hh-mono font-bold text-[#FFE600] uppercase">
            <Terminal className="w-4 h-4" />
            <span>THE 8 MASTER BUILDER ARCHETYPES</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-hh-title font-black text-[#FFE600] uppercase">
            EXPLORE THE ARCHETYPE SPECTRUM
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(ARCHETYPES).map(arch => (
            <div key={arch.id} className="p-6 rounded-2xl bg-[#FAF7EC] text-[#063D21] border-3 border-[#063D21] space-y-3 shadow-[6px_6px_0px_#FFE600]">
              <div className="w-10 h-10 rounded bg-[#FF007F] text-white flex items-center justify-center font-bold text-lg border border-black">
                ⚡
              </div>
              <h4 className="font-hh-title font-black text-2xl uppercase">{arch.title}</h4>
              <p className="text-xs font-hh-mono italic font-bold text-[#FF007F]">"{arch.tagline}"</p>
              <p className="text-xs font-hh-mono leading-relaxed">{arch.description}</p>
              
              <div className="pt-2 border-t-2 border-[#063D21]/20 space-y-1 text-[11px] font-hh-mono font-bold">
                <div>
                  <span className="text-[#FF007F]">PRIMARY:</span> {arch.primaryAttribute}
                </div>
                <div>
                  <span className="text-[#063D21]">FLAW:</span> {arch.signatureFlaw}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
