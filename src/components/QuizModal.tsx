import React, { useState } from 'react';
import { X, Sparkles, Upload, Check, Bot, Terminal, Coffee, Flame, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BuilderIdentity, ArchetypeId, GoaAura, FrameTheme } from '../types';
import { ARCHETYPES, PRESET_AVATARS, SERIOUS_STICKERS, MEME_STICKERS } from '../data/archetypes';
import { playClickSound, playStampSound } from '../utils/audio';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIdentityForged: (identity: BuilderIdentity) => void;
}

const TECH_OPTIONS = [
  'AI Agents', 'Python', 'Rust', 'Solana', 'Next.js', 
  'PyTorch', 'Figma', 'Web3', 'Go', 'Docker', 
  'GraphQL', 'Tailwind', 'PostgreSQL', 'LangChain'
];

const SCENARIO_QUESTIONS = [
  {
    id: 'agent_wrangler',
    text: 'A) Spawn 12 autonomous AI agents to debug the backend while I get chai.',
    icon: Bot,
    archetype: 'agent_wrangler' as ArchetypeId
  },
  {
    id: 'startup_alchemist',
    text: 'B) Pivot the product to a slide deck and convince judges it’s live AI.',
    icon: Sparkles,
    archetype: 'startup_alchemist' as ArchetypeId
  },
  {
    id: 'systems_architect',
    text: 'C) Rewrite the entire microservice from scratch in Rust before dawn.',
    icon: Terminal,
    archetype: 'systems_architect' as ArchetypeId
  },
  {
    id: 'product_pirate',
    text: 'D) Mock all API responses in hardcoded JSON and ship the frontend in 30 mins.',
    icon: Flame,
    archetype: 'product_pirate' as ArchetypeId
  }
];

const GOA_FUELS = [
  { id: 'tender_coconut', label: 'Tender Coconut + Espresso', aura: 'Sunset Hacker' as GoaAura },
  { id: 'filter_coffee', label: 'South Indian Filter Coffee', aura: 'Night-Owl Waver' as GoaAura },
  { id: 'red_bull', label: 'Double Red Bull & Cold Brew', aura: 'Shack Squatter' as GoaAura },
  { id: 'feni', label: 'Local Cashew Feni & Tonic', aura: 'Scooter Nomad' as GoaAura }
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onIdentityForged }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(PRESET_AVATARS[0]);
  const [selectedTech, setSelectedTech] = useState<string[]>(['AI Agents', 'Next.js']);
  const [selectedScenario, setSelectedScenario] = useState<ArchetypeId>('agent_wrangler');
  const [selectedFuel, setSelectedFuel] = useState(GOA_FUELS[0]);
  const [isForging, setIsForging] = useState(false);
  const [forgeStatusText, setForgeStatusText] = useState('Synthesizing Tech Stack...');

  if (!isOpen) return null;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleTech = (tech: string) => {
    playClickSound();
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else if (selectedTech.length < 5) {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleCompleteForge = () => {
    playClickSound();
    setIsForging(true);

    const statusSteps = [
      'Synthesizing Tech Stack...',
      'Evaluating 4 AM Hackathon Traits...',
      'Calculating Goa Sun Resistance...',
      'Applying Holographic Sunset Mesh...'
    ];

    statusSteps.forEach((status, idx) => {
      setTimeout(() => {
        setForgeStatusText(status);
      }, (idx + 1) * 450);
    });

    setTimeout(() => {
      const arch = ARCHETYPES[selectedScenario] || ARCHETYPES.agent_wrangler;
      const serialNum = `HHG-2026-#${Math.floor(100 + Math.random() * 899)}`;
      
      const newIdentity: BuilderIdentity = {
        id: `id_${Date.now()}`,
        serialNumber: serialNum,
        name: name.trim() || 'Hacker Hero',
        handle: handle.trim().replace(/^@/, '') || 'builder',
        avatarUrl,
        archetypeId: arch.id,
        archetypeTitle: arch.title,
        archetypeTagline: arch.tagline,
        primaryAttribute: arch.primaryAttribute,
        signatureFlaw: arch.signatureFlaw,
        goaAura: selectedFuel.aura,
        techStack: selectedTech.length > 0 ? selectedTech : ['Full-Stack', 'AI'],
        goaFuel: selectedFuel.label,
        stats: {
          shipSpeed: Math.min(100, arch.baseShipSpeed + Math.floor(Math.random() * 5)),
          coffeeCodeRatio: Math.min(100, arch.baseCoffeeRatio + Math.floor(Math.random() * 5)),
          sunResistance: arch.sunResistance,
          survivalOdds: Number((97.5 + Math.random() * 2.4).toFixed(1))
        },
        stickers: [SERIOUS_STICKERS[0], MEME_STICKERS[0]],
        frameTheme: 'sunset_glass' as FrameTheme,
        createdAt: 'Just now'
      };

      setIsForging(false);
      playStampSound();
      
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      onIdentityForged(newIdentity);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#063D21] rounded-3xl p-6 sm:p-8 border-4 border-[#FFE600] shadow-[10px_10px_0px_#000000] overflow-hidden text-white">
        
        {/* Modal Close Button */}
        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-5 right-5 p-2 rounded bg-[#FF007F] text-white hover:bg-black transition-colors border border-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Forging Overlay */}
        {isForging ? (
          <div className="py-16 text-center space-y-6 animate-pulse">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-[#FFE600] text-[#063D21] border-3 border-black flex items-center justify-center shadow-xl animate-spin">
              <Sparkles className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-hh-title font-black text-3xl text-[#FFE600] uppercase">FORGING PASSPORT...</h3>
              <p className="font-hh-mono text-sm text-[#FF007F] font-bold">{forgeStatusText}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between border-b-2 border-[#FFE600] pb-4">
              <div>
                <span className="text-xs font-hh-mono uppercase text-[#FFE600] font-bold">RITUAL STEP {step} OF 4</span>
                <h2 className="font-hh-title font-black text-2xl sm:text-3xl text-white uppercase">
                  {step === 1 && 'Hacker Persona & Photo'}
                  {step === 2 && 'Primary Tech Arsenal'}
                  {step === 3 && 'The 4 AM Hack Night Test'}
                  {step === 4 && 'Goa Vibe & Fuel Source'}
                </h2>
              </div>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4].map(s => (
                  <div
                    key={s}
                    className={`w-6 sm:w-8 h-2.5 rounded transition-all ${
                      s <= step ? 'bg-[#FFE600]' : 'bg-[#0B6638]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Name, Handle & Photo */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-hh-mono text-[#FFE600] font-bold uppercase">YOUR NAME / CALLSIGN</label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded bg-[#0B6638] border-2 border-[#FFE600] text-white placeholder-amber-200/50 focus:outline-none focus:border-[#FF007F] font-hh-mono text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-hh-mono text-[#FFE600] font-bold uppercase">TWITTER / X HANDLE</label>
                    <input
                      type="text"
                      placeholder="@alex_hacks"
                      value={handle}
                      onChange={e => setHandle(e.target.value)}
                      className="w-full px-4 py-3 rounded bg-[#0B6638] border-2 border-[#FFE600] text-white placeholder-amber-200/50 focus:outline-none focus:border-[#FF007F] font-hh-mono text-sm"
                    />
                  </div>
                </div>

                {/* Avatar Picker & File Upload */}
                <div className="space-y-3">
                  <label className="text-xs font-hh-mono text-[#FFE600] font-bold uppercase">BUILDER PHOTO / AVATAR</label>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-20 h-20 rounded-xl object-cover border-3 border-[#FFE600] shadow-md bg-black"
                    />

                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-[#0B6638] border-2 border-[#FFE600] hover:bg-[#FF007F] hover:text-white cursor-pointer text-xs font-hh-mono font-bold text-[#FFE600] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>UPLOAD CUSTOM PHOTO</span>
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                      <p className="text-[11px] text-amber-200 font-hh-mono">Or select a preset avatar below:</p>
                    </div>
                  </div>

                  {/* Preset Avatars */}
                  <div className="flex items-center space-x-3 pt-2">
                    {PRESET_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => { playClickSound(); setAvatarUrl(url); }}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          avatarUrl === url ? 'border-[#FFE600] scale-105 shadow-md bg-[#FFE600]' : 'border-transparent opacity-60 hover:opacity-100 bg-black'
                        }`}
                      >
                        <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Tech Arsenal */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs font-hh-mono text-amber-100 uppercase">Select up to 5 core technologies in your arsenal:</p>
                <div className="flex flex-wrap gap-2.5">
                  {TECH_OPTIONS.map(tech => {
                    const isSelected = selectedTech.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-4 py-2.5 rounded font-hh-mono font-bold text-xs uppercase border-2 transition-all flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-[#FFE600] text-[#063D21] border-black shadow'
                            : 'bg-[#0B6638] border-[#FFE600]/40 text-slate-200 hover:border-[#FFE600]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{tech}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: 4 AM Scenario */}
            {step === 3 && (
              <div className="space-y-3 font-hh-mono">
                <p className="text-xs text-amber-100">
                  <strong className="text-[#FFE600] uppercase">Scenario:</strong> It's 4:00 AM at Hacker House Goa. Demo is in 4 hours. Your main API drops 500 errors. What do you do?
                </p>
                <div className="space-y-2.5">
                  {SCENARIO_QUESTIONS.map(q => {
                    const Icon = q.icon;
                    const isSelected = selectedScenario === q.archetype;
                    return (
                      <div
                        key={q.id}
                        onClick={() => { playClickSound(); setSelectedScenario(q.archetype); }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                          isSelected
                            ? 'bg-[#0B6638] border-[#FFE600] text-white shadow-[4px_4px_0px_#000000]'
                            : 'bg-[#0B6638]/40 border-[#FFE600]/40 text-slate-200 hover:border-[#FFE600]'
                        }`}
                      >
                        <div className={`p-2 rounded ${isSelected ? 'bg-[#FF007F] text-white' : 'bg-[#063D21] text-amber-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs sm:text-sm font-bold pt-1 leading-relaxed">{q.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Goa Fuel */}
            {step === 4 && (
              <div className="space-y-4 font-hh-mono">
                <p className="text-xs text-amber-100 uppercase">Choose your primary fuel &amp; aura source during hack night:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOA_FUELS.map(fuel => {
                    const isSelected = selectedFuel.id === fuel.id;
                    return (
                      <div
                        key={fuel.id}
                        onClick={() => { playClickSound(); setSelectedFuel(fuel); }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-1 ${
                          isSelected
                            ? 'bg-[#0B6638] border-[#FF007F] text-white shadow-[4px_4px_0px_#000000]'
                            : 'bg-[#0B6638]/40 border-[#FFE600]/40 text-slate-200 hover:border-[#FFE600]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Coffee className={`w-4 h-4 ${isSelected ? 'text-[#FF007F]' : 'text-[#FFE600]'}`} />
                          <span className="text-xs font-bold text-[#FFE600] uppercase">{fuel.aura}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{fuel.label}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-[#FFE600]">
              {step > 1 ? (
                <button
                  onClick={() => { playClickSound(); setStep(step - 1); }}
                  className="px-4 py-2 rounded text-xs font-hh-mono font-bold text-amber-200 hover:text-white flex items-center space-x-1 uppercase"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={() => { playClickSound(); setStep(step + 1); }}
                  className="px-6 py-3 bg-[#FFE600] hover:bg-[#FF007F] text-[#063D21] hover:text-white font-hh-title font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] flex items-center space-x-1.5 transition-all"
                >
                  <span>NEXT RITUAL STEP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCompleteForge}
                  className="px-8 py-3 bg-[#FF007F] hover:bg-[#FFE600] text-white hover:text-black font-hh-title font-black text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] flex items-center space-x-2 transition-all"
                >
                  <Sparkles className="w-5 h-5 fill-current text-[#FFE600]" />
                  <span>FORGE PASSPORT NOW</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
