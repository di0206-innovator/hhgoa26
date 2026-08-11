import React from 'react';
import { Tag, Sparkles, Check, Flame } from 'lucide-react';
import type { BuilderIdentity, Sticker } from '../types';
import { SERIOUS_STICKERS, MEME_STICKERS } from '../data/archetypes';
import { playClickSound, playChimeSound } from '../utils/audio';

interface StickerCustomizerProps {
  identity: BuilderIdentity;
  onUpdateStickers: (newStickers: Sticker[]) => void;
}

export const StickerCustomizer: React.FC<StickerCustomizerProps> = ({ identity, onUpdateStickers }) => {
  const currentStickerIds = identity.stickers.map(s => s.id);

  const toggleSticker = (sticker: Sticker) => {
    playClickSound();
    if (currentStickerIds.includes(sticker.id)) {
      const updated = identity.stickers.filter(s => s.id !== sticker.id);
      onUpdateStickers(updated);
    } else {
      if (identity.stickers.length < 4) {
        playChimeSound();
        onUpdateStickers([...identity.stickers, sticker]);
      }
    }
  };

  return (
    <div className="bg-[#063D21] rounded-2xl p-6 border-3 border-[#FFE600] space-y-5 shadow-[6px_6px_0px_#042E18]">
      <div className="flex items-center justify-between border-b-2 border-[#FFE600] pb-3">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-[#FFE600]" />
          <h3 className="font-hh-title font-black text-xl text-[#FFE600] uppercase tracking-wide">Sticker &amp; Badge Customizer</h3>
        </div>
        <span className="text-xs font-hh-mono font-bold text-amber-200">
          {identity.stickers.length}/4 BADGES SELECTED
        </span>
      </div>

      {/* Serious Badges Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-hh-mono font-bold text-[#FF007F] uppercase">
          <Sparkles className="w-4 h-4 text-[#FF007F]" />
          <span>High-Status Serious Badges</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SERIOUS_STICKERS.map(sticker => {
            const isSelected = currentStickerIds.includes(sticker.id);
            return (
              <button
                key={sticker.id}
                onClick={() => toggleSticker(sticker)}
                className={`px-3 py-1.5 rounded font-hh-mono font-bold text-xs border-2 uppercase transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#FFE600] text-black border-black shadow'
                    : 'bg-[#0B6638] text-slate-200 border-[#FFE600]/40 hover:border-[#FFE600]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                <span>{sticker.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meme Badges Section */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center space-x-1.5 text-xs font-hh-mono font-bold text-[#FFE600] uppercase">
          <Flame className="w-4 h-4 text-[#FFE600]" />
          <span>Relatable Goa &amp; Hacker Memes</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {MEME_STICKERS.map(sticker => {
            const isSelected = currentStickerIds.includes(sticker.id);
            return (
              <button
                key={sticker.id}
                onClick={() => toggleSticker(sticker)}
                className={`px-3 py-1.5 rounded font-hh-mono font-bold text-xs border-2 uppercase transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#FF007F] text-white border-black shadow'
                    : 'bg-[#0B6638] text-slate-200 border-[#FFE600]/40 hover:border-[#FFE600]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                <span>{sticker.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
