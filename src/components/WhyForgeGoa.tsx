import React from 'react';
import { Trophy } from 'lucide-react';

export const WhyForgeGoa: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden space-y-8">
        
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>WINNER-GRADE PRODUCT STRATEGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white">
            WHY <span className="goa-text-gradient">FORGE GOA</span> STANDS OUT
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Reframing a standard frame generator challenge into an unforgettable social ritual.
          </p>
        </div>

        {/* Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Standard Submission */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-rose-400 font-mono font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>MOST OPEN TRIALS SUBMISSIONS</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-300">Generic Frame Generator</h3>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>❌ Upload Photo → Overlay Frame PNG → Download</li>
              <li>❌ Dwell time under 15 seconds</li>
              <li>❌ Zero social viral loops or team participation</li>
              <li>❌ Feels like a basic utility assignment</li>
            </ul>
          </div>

          {/* Forge Goa */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/50 space-y-4 shadow-xl shadow-amber-500/10">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>FORGE GOA EXPERIENCE</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Hacker Identity Platform</h3>
            <ul className="space-y-2 text-xs font-mono text-amber-200">
              <li>✅ 4-Step Interactive Identity Ritual &amp; RPG Archetypes</li>
              <li>✅ 3D Holographic Goa Sunset Cards &amp; Sticker Customizer</li>
              <li>✅ 4-Person Multiplayer Squad Poster Builder</li>
              <li>✅ Native viral flex loops across X, Instagram &amp; Discord</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
