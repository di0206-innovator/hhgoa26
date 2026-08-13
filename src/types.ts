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

export type FrameTheme = 'official_lanyard' | 'boarding_pass' | 'vintage_poster' | 'cyber_neon';

export type ColorPalette = 'goa_sunset' | 'cyber_pink' | 'neon_mint' | 'solar_gold' | 'deep_emerald' | 'electric_blue';

export type PhotoFilter = 'none' | 'cyber_glow' | 'sunset_warmth' | 'retro_sepia' | 'neon_contrast';

export type QrTarget = 'linkedin' | 'twitter' | 'github' | 'portfolio' | 'custom';

export interface Sticker {
  id: string;
  label: string;
  category: 'serious' | 'meme' | 'custom';
  color: string;
}

export interface BuilderIdentity {
  id: string;
  serialNumber: string; // e.g. "HHG-2026-#042"
  name: string;
  handle: string; // X/Twitter handle
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
    vibeScore?: number; // 0 - 100% custom 4th stat
  };
  stickers: Sticker[];
  frameTheme: FrameTheme;
  createdAt: string;
  // v2 Social & Bio fields
  linkedinUrl: string;        // LinkedIn profile URL for QR code
  twitterHandle: string;      // @handle for X/Twitter
  githubHandle?: string;     // @handle for GitHub
  portfolioUrl?: string;     // Personal website/portfolio
  discordHandle?: string;    // Discord username
  college: string;            // College / Organization name
  city: string;               // Home city (FROM field on boarding pass)
  whatIDo: string;            // Short tagline e.g. "Blockchain, AI, Cybersecurity"
  currentlyShipping: string;  // "Building the Future" / custom text
  // Card Customizations
  colorPalette?: ColorPalette;
  photoFilter?: PhotoFilter;
  qrTarget?: QrTarget;
  customQrUrl?: string;
}

export interface Squad {
  id: string;
  squadName: string;
  squadTagline: string;
  members: BuilderIdentity[];
  totalShipSpeed: number;
  synergyPerk: string;
}

