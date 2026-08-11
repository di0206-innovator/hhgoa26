export type ArchetypeId = 
  | 'agent_wrangler' 
  | 'startup_alchemist' 
  | 'systems_architect' 
  | 'midnight_hacker' 
  | 'product_pirate' 
  | 'protocol_prophet' 
  | 'chaos_engineer' 
  | 'builder_monk';

export type GoaAura = 'Sunset Hacker' | 'Shack Squatter' | 'Scooter Nomad' | 'Night-Owl Waver';

export type FrameTheme = 'sunset_glass' | 'terminal_retro' | 'lanyard_badge';

export interface Sticker {
  id: string;
  label: string;
  category: 'serious' | 'meme';
  color: string;
}

export interface BuilderIdentity {
  id: string;
  serialNumber: string; // e.g. "HHG-2026-#042"
  name: string;
  handle: string;
  avatarUrl: string;
  archetypeId: ArchetypeId;
  archetypeTitle: string;
  archetypeTagline: string;
  primaryAttribute: string;
  signatureFlaw: string;
  goaAura: GoaAura;
  techStack: string[];
  goaFuel: string;
  stats: {
    shipSpeed: number; // 0 - 100
    coffeeCodeRatio: number; // 0 - 100%
    sunResistance: string; // "Low" | "Moderate" | "Immunity"
    survivalOdds: number; // e.g. 99.4%
  };
  stickers: Sticker[];
  frameTheme: FrameTheme;
  createdAt: string;
}

export interface Squad {
  id: string;
  squadName: string;
  squadTagline: string;
  members: BuilderIdentity[];
  totalShipSpeed: number;
  synergyPerk: string;
}
