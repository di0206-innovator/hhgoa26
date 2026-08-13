import React, { useState } from 'react';
import { 
  User, Link2, Palette, Sliders, Tag, Sparkles, Upload, Check, 
  Code, Globe, MessageSquare, MapPin, Building, Briefcase, Zap, Plus, X
} from 'lucide-react';
import type { BuilderIdentity, FrameTheme, ColorPalette, PhotoFilter, QrTarget, Sticker } from '../types';
import { COLOR_PALETTES, PHOTO_FILTERS, SERIOUS_STICKERS, MEME_STICKERS, PRESET_AVATARS } from '../data/archetypes';
import { playClickSound, playChimeSound } from '../utils/audio';


interface CardEditorPanelProps {
  identity: BuilderIdentity;
  onUpdateIdentity: (updated: BuilderIdentity) => void;
}

export const CardEditorPanel: React.FC<CardEditorPanelProps> = ({ identity, onUpdateIdentity }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'stats' | 'stickers'>('profile');
  const [customBadgeText, setCustomBadgeText] = useState('');
  const [customBadgeColor] = useState('bg-gradient-to-r from-purple-600 to-pink-600 text-white');

  const updateField = <K extends keyof BuilderIdentity>(key: K, value: BuilderIdentity[K]) => {
    onUpdateIdentity({ ...identity, [key]: value });
  };

  const updateStats = (statKey: string, val: any) => {
    onUpdateIdentity({
      ...identity,
      stats: {
        ...identity.stats,
        [statKey]: val
      }
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField('avatarUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleSticker = (sticker: Sticker) => {
    playClickSound();
    const exists = identity.stickers.some(s => s.id === sticker.id);
    if (exists) {
      updateField('stickers', identity.stickers.filter(s => s.id !== sticker.id));
    } else {
      if (identity.stickers.length < 5) {
        playChimeSound();
        updateField('stickers', [...identity.stickers, sticker]);
      }
    }
  };

  const handleAddCustomBadge = () => {
    if (!customBadgeText.trim()) return;
    playChimeSound();
    const newBadge: Sticker = {
      id: `custom_${Date.now()}`,
      label: customBadgeText.trim(),
      category: 'custom',
      color: customBadgeColor
    };
    updateField('stickers', [...identity.stickers.slice(0, 4), newBadge]);
    setCustomBadgeText('');
  };

  const handleRemoveSticker = (id: string) => {
    playClickSound();
    updateField('stickers', identity.stickers.filter(s => s.id !== id));
  };

  return (
    <div className="bg-[#063D21] rounded-3xl p-5 border-4 border-[#FFE600] shadow-[8px_8px_0px_#042E18] space-y-4 text-white font-hh-mono">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#FFE600] pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#FFE600]" />
          <h3 className="font-hh-title font-black text-xl text-[#FFE600] uppercase tracking-wide">
            LIVE CARD CUSTOMIZER
          </h3>
        </div>
        <span className="text-[10px] bg-[#FFE600] text-[#063D21] px-2 py-0.5 font-bold uppercase rounded">
          REAL-TIME PREVIEW
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-[#0B6638] p-1 rounded-xl border border-[#FFE600]/30 text-xs">
        <button
          onClick={() => { playClickSound(); setActiveTab('profile'); }}
          className={`py-2 rounded-lg font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 uppercase transition-all ${
            activeTab === 'profile' ? 'bg-[#FFE600] text-[#063D21] shadow' : 'text-slate-200 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-xs">Info</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('theme'); }}
          className={`py-2 rounded-lg font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 uppercase transition-all ${
            activeTab === 'theme' ? 'bg-[#FFE600] text-[#063D21] shadow' : 'text-slate-200 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-xs">Style</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('stats'); }}
          className={`py-2 rounded-lg font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 uppercase transition-all ${
            activeTab === 'stats' ? 'bg-[#FFE600] text-[#063D21] shadow' : 'text-slate-200 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-xs">Stats</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('stickers'); }}
          className={`py-2 rounded-lg font-bold flex flex-col sm:flex-row items-center justify-center space-x-1 uppercase transition-all ${
            activeTab === 'stickers' ? 'bg-[#FFE600] text-[#063D21] shadow' : 'text-slate-200 hover:text-white'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-xs">Badges</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & SOCIALS */}
      {activeTab === 'profile' && (
        <div className="space-y-3 pt-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1">Full Name / Callsign</label>
              <input
                type="text"
                value={identity.name}
                onChange={e => updateField('name', e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white focus:outline-none focus:border-[#FF007F]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1">X / Twitter (@handle)</label>
              <input
                type="text"
                value={identity.twitterHandle || identity.handle}
                onChange={e => {
                  const val = e.target.value.replace(/^@/, '');
                  updateField('twitterHandle', val);
                  updateField('handle', val);
                }}
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white focus:outline-none focus:border-[#FF007F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <Link2 className="w-3 h-3 text-[#FF007F]" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                value={identity.linkedinUrl}
                onChange={e => updateField('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white placeholder-amber-100/40 focus:outline-none focus:border-[#FF007F]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <Code className="w-3 h-3 text-[#FF007F]" />
                <span>GitHub Handle</span>
              </label>
              <input
                type="text"
                value={identity.githubHandle || ''}
                onChange={e => updateField('githubHandle', e.target.value.replace(/^@/, ''))}
                placeholder="e.g. octocat"
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white placeholder-amber-100/40 focus:outline-none focus:border-[#FF007F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <Globe className="w-3 h-3 text-[#FF007F]" />
                <span>Portfolio / Website</span>
              </label>
              <input
                type="url"
                value={identity.portfolioUrl || ''}
                onChange={e => updateField('portfolioUrl', e.target.value)}
                placeholder="https://yourname.dev"
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white placeholder-amber-100/40 focus:outline-none focus:border-[#FF007F]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <MessageSquare className="w-3 h-3 text-[#FF007F]" />
                <span>Discord Handle</span>
              </label>
              <input
                type="text"
                value={identity.discordHandle || ''}
                onChange={e => updateField('discordHandle', e.target.value)}
                placeholder="username#0000"
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white placeholder-amber-100/40 focus:outline-none focus:border-[#FF007F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <Building className="w-3 h-3 text-[#FF007F]" />
                <span>College / Organization</span>
              </label>
              <input
                type="text"
                value={identity.college}
                onChange={e => updateField('college', e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white focus:outline-none focus:border-[#FF007F]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#FF007F]" />
                <span>Home City</span>
              </label>
              <input
                type="text"
                value={identity.city}
                onChange={e => updateField('city', e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white focus:outline-none focus:border-[#FF007F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <Briefcase className="w-3 h-3 text-[#FF007F]" />
                <span>What I Do (Tagline)</span>
              </label>
              <input
                type="text"
                value={identity.whatIDo}
                onChange={e => updateField('whatIDo', e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white focus:outline-none focus:border-[#FF007F]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase mb-1 flex items-center space-x-1">
                <Zap className="w-3 h-3 text-[#FF007F]" />
                <span>Currently Shipping</span>
              </label>
              <input
                type="text"
                value={identity.currentlyShipping}
                onChange={e => updateField('currentlyShipping', e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white focus:outline-none focus:border-[#FF007F]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STYLES & PALETTES */}
      {activeTab === 'theme' && (
        <div className="space-y-4 pt-1 text-xs">
          
          {/* Frame Theme Selector */}
          <div>
            <label className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1.5">Card Frame Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'official_lanyard', label: '🪪 Official Lanyard' },
                { id: 'boarding_pass', label: '✈️ Boarding Pass' },
                { id: 'vintage_poster', label: '🌴 Vintage Poster' },
                { id: 'cyber_neon', label: '⚡ Cyber Neon VIP' }
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => { playClickSound(); updateField('frameTheme', theme.id as FrameTheme); }}
                  className={`p-2.5 rounded-xl border-2 font-bold uppercase text-center transition-all ${
                    identity.frameTheme === theme.id
                      ? 'bg-[#FFE600] text-[#063D21] border-black shadow'
                      : 'bg-[#0B6638] border-[#FFE600]/40 text-white hover:border-[#FFE600]'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette Accent Selector */}
          <div>
            <label className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1.5">Accent Color Palette</label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_PALETTES.map(p => {
                const isSelected = (identity.colorPalette || 'goa_sunset') === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => { playClickSound(); updateField('colorPalette', p.id as ColorPalette); }}
                    className={`p-2 rounded-xl border-2 text-[10px] font-bold uppercase text-center transition-all flex flex-col items-center space-y-1 ${
                      isSelected ? 'border-[#FFE600] bg-[#0B6638] shadow scale-105' : 'border-[#FFE600]/20 bg-[#0B6638]/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: p.primary }} />
                      <span className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: p.secondary }} />
                    </div>
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* QR Destination Selector */}
          <div>
            <label className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1.5">QR Code Link Destination</label>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {[
                { id: 'linkedin', label: 'LinkedIn' },
                { id: 'twitter', label: 'X/Twitter' },
                { id: 'github', label: 'GitHub' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'custom', label: 'Custom URL' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => { playClickSound(); updateField('qrTarget', t.id as QrTarget); }}
                  className={`py-1.5 px-2 rounded text-[10px] font-bold uppercase border transition-all ${
                    (identity.qrTarget || 'linkedin') === t.id
                      ? 'bg-[#FF007F] text-white border-black shadow'
                      : 'bg-[#0B6638] text-slate-300 border-[#FFE600]/30'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {identity.qrTarget === 'custom' && (
              <input
                type="url"
                value={identity.customQrUrl || ''}
                onChange={e => updateField('customQrUrl', e.target.value)}
                placeholder="https://yourcustomlink.com"
                className="w-full px-3 py-2 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white placeholder-amber-100/40 text-xs focus:outline-none focus:border-[#FF007F]"
              />
            )}
          </div>

        </div>
      )}

      {/* TAB 3: STATS & PHOTO */}
      {activeTab === 'stats' && (
        <div className="space-y-4 pt-1 text-xs">
          
          {/* Avatar Photo & Filter */}
          <div className="space-y-2">
            <label className="text-[10px] text-[#FFE600] font-bold uppercase block">Avatar Photo &amp; Filter</label>
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFE600] bg-black flex-shrink-0">
                <img
                  src={identity.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  style={{ filter: PHOTO_FILTERS.find(f => f.id === identity.photoFilter)?.css || 'none' }}
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#0B6638] border border-[#FFE600] text-[#FFE600] hover:bg-[#FF007F] hover:text-white cursor-pointer text-[10px] font-bold uppercase transition-colors">
                  <Upload className="w-3 h-3" />
                  <span>Upload Photo</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>

                {/* Preset Avatars Row */}
                <div className="flex items-center space-x-1 pt-1">
                  {PRESET_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => { playClickSound(); updateField('avatarUrl', url); }}
                      className={`w-6 h-6 rounded-md overflow-hidden border ${identity.avatarUrl === url ? 'border-[#FFE600] scale-110' : 'border-transparent opacity-60'}`}
                    >
                      <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo Filter Buttons */}
            <div>
              <span className="text-[9px] text-amber-200 uppercase font-bold block mb-1">Photo Filter Effects</span>
              <div className="flex flex-wrap gap-1.5">
                {PHOTO_FILTERS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => { playClickSound(); updateField('photoFilter', f.id as PhotoFilter); }}
                    className={`px-2 py-1 rounded text-[9px] font-bold uppercase border transition-all ${
                      (identity.photoFilter || 'none') === f.id
                        ? 'bg-[#FFE600] text-[#063D21] border-black font-black'
                        : 'bg-[#0B6638] text-slate-300 border-[#FFE600]/30'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stat Sliders */}
          <div className="space-y-3 pt-2 border-t border-[#FFE600]/30">
            <div>
              <div className="flex justify-between text-[10px] text-[#FFE600] font-bold uppercase mb-1">
                <span>🚀 Ship Speed</span>
                <span>{identity.stats.shipSpeed}/100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={identity.stats.shipSpeed}
                onChange={e => updateStats('shipSpeed', Number(e.target.value))}
                className="w-full accent-[#FFE600]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-[#FFE600] font-bold uppercase mb-1">
                <span>☕ Coffee Code Ratio</span>
                <span>{identity.stats.coffeeCodeRatio}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={identity.stats.coffeeCodeRatio}
                onChange={e => updateStats('coffeeCodeRatio', Number(e.target.value))}
                className="w-full accent-[#FFE600]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-[#FFE600] font-bold uppercase mb-1">
                <span>🌊 Vibe &amp; Energy Score</span>
                <span>{identity.stats.vibeScore ?? 95}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={identity.stats.vibeScore ?? 95}
                onChange={e => updateStats('vibeScore', Number(e.target.value))}
                className="w-full accent-[#FF007F]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1">☀️ Sun Resistance</label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Moderate', 'Immunity'].map(r => (
                  <button
                    key={r}
                    onClick={() => { playClickSound(); updateStats('sunResistance', r); }}
                    className={`py-1.5 rounded text-[10px] font-bold uppercase border transition-all ${
                      identity.stats.sunResistance === r
                        ? 'bg-[#FF007F] text-white border-black shadow'
                        : 'bg-[#0B6638] text-slate-300 border-[#FFE600]/30'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: BADGES & CUSTOM STICKERS */}
      {activeTab === 'stickers' && (
        <div className="space-y-4 pt-1 text-xs">
          
          {/* Active Badges */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#FFE600] font-bold uppercase">Active Pinned Badges ({identity.stickers.length}/5)</span>
              <span className="text-[9px] text-amber-200">Will render on your card!</span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-xl bg-[#0B6638] border border-[#FFE600]/40">
              {identity.stickers.map(s => (
                <span
                  key={s.id}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-black flex items-center space-x-1 shadow ${s.color}`}
                >
                  <span>{s.label}</span>
                  <button onClick={() => handleRemoveSticker(s.id)} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {identity.stickers.length === 0 && (
                <span className="text-[10px] text-amber-200/60 italic">No badges pinned yet. Select from below or create custom badge!</span>
              )}
            </div>
          </div>

          {/* Create Custom Text Badge */}
          <div className="space-y-2 pt-2 border-t border-[#FFE600]/30">
            <span className="text-[10px] text-[#FF007F] font-bold uppercase flex items-center space-x-1">
              <Plus className="w-3.5 h-3.5 text-[#FF007F]" />
              <span>Create Custom Badge</span>
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={customBadgeText}
                onChange={e => setCustomBadgeText(e.target.value)}
                placeholder="e.g. 🤖 AI Wrangler"
                className="flex-1 px-3 py-1.5 rounded bg-[#0B6638] border border-[#FFE600]/60 text-white placeholder-amber-100/40 text-xs focus:outline-none focus:border-[#FF007F]"
              />
              <button
                onClick={handleAddCustomBadge}
                className="px-3 py-1.5 bg-[#FFE600] hover:bg-[#FF007F] text-[#063D21] hover:text-white font-bold text-xs uppercase rounded border border-black shadow transition-all"
              >
                Add
              </button>
            </div>
          </div>

          {/* Serious Stickers */}
          <div>
            <span className="text-[10px] text-[#FFE600] font-bold uppercase block mb-1">High-Status Serious Badges</span>
            <div className="flex flex-wrap gap-1.5">
              {SERIOUS_STICKERS.map(s => {
                const isSelected = identity.stickers.some(st => st.id === s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSticker(s)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border transition-all flex items-center space-x-1 ${
                      isSelected ? 'bg-[#FFE600] text-black border-black shadow' : 'bg-[#0B6638] text-slate-200 border-[#FFE600]/30'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-black" />}
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meme Stickers */}
          <div>
            <span className="text-[10px] text-[#FF007F] font-bold uppercase block mb-1">Relatable Goa &amp; Hacker Memes</span>
            <div className="flex flex-wrap gap-1.5">
              {MEME_STICKERS.map(s => {
                const isSelected = identity.stickers.some(st => st.id === s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSticker(s)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border transition-all flex items-center space-x-1 ${
                      isSelected ? 'bg-[#FF007F] text-white border-black shadow' : 'bg-[#0B6638] text-slate-200 border-[#FFE600]/30'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
