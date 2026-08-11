import type { ArchetypeId, Sticker } from '../types';

export interface ArchetypeDetails {
  id: ArchetypeId;
  title: string;
  tagline: string;
  primaryAttribute: string;
  signatureFlaw: string;
  complementaryClass: string;
  baseShipSpeed: number;
  baseCoffeeRatio: number;
  sunResistance: 'Low' | 'Moderate' | 'Immunity';
  colorGradient: string;
  iconName: string;
  description: string;
}

export const ARCHETYPES: Record<ArchetypeId, ArchetypeDetails> = {
  agent_wrangler: {
    id: 'agent_wrangler',
    title: 'Agent Wrangler',
    tagline: 'I don’t write code, I prompt autonomous swarms.',
    primaryAttribute: 'Autonomous Execution & Multi-Agent Logic',
    signatureFlaw: '99% of API budget spent on zero-shot reasoning',
    complementaryClass: 'Startup Alchemist',
    baseShipSpeed: 95,
    baseCoffeeRatio: 80,
    sunResistance: 'Moderate',
    colorGradient: 'from-amber-500 via-orange-600 to-rose-600',
    iconName: 'Bot',
    description: 'Master of AI swarms and autonomous workflows. Orchestrates 10 LLMs simultaneously while enjoying cold brew.'
  },
  startup_alchemist: {
    id: 'startup_alchemist',
    title: 'Startup Alchemist',
    tagline: 'Pitch deck compiled 3 hours before the MVP.',
    primaryAttribute: 'Charisma, Hype & Total Conviction',
    signatureFlaw: 'Pivots product direction 4 times during hack night',
    complementaryClass: 'Systems Architect',
    baseShipSpeed: 90,
    baseCoffeeRatio: 75,
    sunResistance: 'Immunity',
    colorGradient: 'from-purple-500 via-pink-500 to-rose-500',
    iconName: 'Sparkles',
    description: 'Turns raw hackathon ideas into VC-worthy stories. Can talk any judge into believing a hardcoded JSON mock is live AI.'
  },
  systems_architect: {
    id: 'systems_architect',
    title: 'Systems Architect',
    tagline: 'Overengineering is my primary love language.',
    primaryAttribute: 'Rust, Memory Safety & Low Latency',
    signatureFlaw: 'Refuses to use standard ORMs or easy APIs',
    complementaryClass: 'Product Pirate',
    baseShipSpeed: 78,
    baseCoffeeRatio: 92,
    sunResistance: 'Low',
    colorGradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    iconName: 'Cpu',
    description: 'Builds fault-tolerant microservices for a 24-hour hackathon project. Spends 8 hours optimizing memory allocation.'
  },
  midnight_hacker: {
    id: 'midnight_hacker',
    title: 'Midnight Hacker',
    tagline: 'Sunlight is a critical performance bottleneck.',
    primaryAttribute: '4:00 AM Flow State & Clutch Bug Fixing',
    signatureFlaw: 'Requires minimum 5 Red Bulls per coding session',
    complementaryClass: 'Agent Wrangler',
    baseShipSpeed: 88,
    baseCoffeeRatio: 98,
    sunResistance: 'Low',
    colorGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    iconName: 'Moon',
    description: 'Dormant during sunlight hours. Becomes a coding god between midnight and dawn. Ships peak features while everyone sleeps.'
  },
  product_pirate: {
    id: 'product_pirate',
    title: 'Product Pirate',
    tagline: 'Steals UI patterns, ships in under 2 hours.',
    primaryAttribute: 'Speed to Market & Uncompromising UX',
    signatureFlaw: 'Ignores 90% of edge-case error boundaries',
    complementaryClass: 'Systems Architect',
    baseShipSpeed: 99,
    baseCoffeeRatio: 70,
    sunResistance: 'Immunity',
    colorGradient: 'from-amber-400 via-red-500 to-pink-600',
    iconName: 'Zap',
    description: 'The fastest builder in the room. Uses component libraries like a weapon and delivers butter-smooth interfaces in record time.'
  },
  protocol_prophet: {
    id: 'protocol_prophet',
    title: 'Protocol Prophet',
    tagline: 'Explaining Zero-Knowledge proofs on Vagator beach.',
    primaryAttribute: 'Cryptography, Consensus & Decentralization',
    signatureFlaw: 'Answers every simple question with "Read the whitepaper"',
    complementaryClass: 'Product Pirate',
    baseShipSpeed: 82,
    baseCoffeeRatio: 85,
    sunResistance: 'Moderate',
    colorGradient: 'from-indigo-500 via-purple-600 to-pink-600',
    iconName: 'Globe',
    description: 'Thinks in smart contracts, merkle trees, and cryptographic proofs. Loves decentralized infrastructure and beach debates.'
  },
  chaos_engineer: {
    id: 'chaos_engineer',
    title: 'Chaos Engineer',
    tagline: 'It worked on local. Pushing direct to prod.',
    primaryAttribute: 'Fearless Iteration & Live Production Testing',
    signatureFlaw: 'Has 47 uncommitted git stashes',
    complementaryClass: 'Builder Monk',
    baseShipSpeed: 92,
    baseCoffeeRatio: 88,
    sunResistance: 'Immunity',
    colorGradient: 'from-rose-500 via-red-600 to-amber-600',
    iconName: 'Flame',
    description: 'Embraces production instability. Tests code by deploying straight to main and watching the console logs light up.'
  },
  builder_monk: {
    id: 'builder_monk',
    title: 'Builder Monk',
    tagline: 'Clean architecture, zero noise, deep focus.',
    primaryAttribute: 'Unbroken Focus & Pristine Code Hygiene',
    signatureFlaw: 'Will rewrite standard libraries from scratch',
    complementaryClass: 'Chaos Engineer',
    baseShipSpeed: 85,
    baseCoffeeRatio: 65,
    sunResistance: 'Moderate',
    colorGradient: 'from-teal-400 via-emerald-600 to-blue-600',
    iconName: 'Compass',
    description: 'Quiet, methodical, and immune to hackathon chaos. Writes unit tests even during 24-hour sprints.'
  }
};

export const SERIOUS_STICKERS: Sticker[] = [
  { id: 's1', label: 'AI Native', category: 'serious', color: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' },
  { id: 's2', label: 'Full-Stack Architect', category: 'serious', color: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' },
  { id: 's3', label: 'Kernel Hacker', category: 'serious', color: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' },
  { id: 's4', label: '10x Builder', category: 'serious', color: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white' },
  { id: 's5', label: 'Zero-Shot Founder', category: 'serious', color: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white' },
  { id: 's6', label: 'Solana / Web3', category: 'serious', color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
  { id: 's7', label: 'Systems Engineer', category: 'serious', color: 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white' },
  { id: 's8', label: 'Hackathon Veteran', category: 'serious', color: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold' }
];

export const MEME_STICKERS: Sticker[] = [
  { id: 'm1', label: 'Shack Wi-Fi Survivor', category: 'meme', color: 'bg-emerald-950 border border-emerald-500 text-emerald-400' },
  { id: 'm2', label: 'Feni-Fueled Logic', category: 'meme', color: 'bg-purple-950 border border-purple-500 text-purple-300' },
  { id: 'm3', label: '4 AM Calangute Coder', category: 'meme', color: 'bg-rose-950 border border-rose-500 text-rose-300' },
  { id: 'm4', label: 'No Sunscreen Just Code', category: 'meme', color: 'bg-amber-950 border border-amber-500 text-amber-300' },
  { id: 'm5', label: 'Arambol Prompt Engineer', category: 'meme', color: 'bg-cyan-950 border border-cyan-500 text-cyan-300' },
  { id: 'm6', label: 'Red Bull & Coconut', category: 'meme', color: 'bg-blue-950 border border-blue-500 text-blue-300' },
  { id: 'm7', label: 'It Works On Local', category: 'meme', color: 'bg-red-950 border border-red-500 text-red-300' },
  { id: 'm8', label: 'Sunlight Is Bottleneck', category: 'meme', color: 'bg-indigo-950 border border-indigo-500 text-indigo-300' }
];

export const PRESET_AVATARS = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FF5E36"/><stop offset="100%" stop-color="%238A2BE2"/></linearGradient></defs><rect width="200" height="200" rx="40" fill="url(%23g1)"/><circle cx="100" cy="80" r="35" fill="%23000" opacity="0.25"/><circle cx="100" cy="75" r="30" fill="%23FFF"/><path d="M45,165 C45,120 155,120 155,165" fill="%23FFF"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%238A2BE2"/><stop offset="100%" stop-color="%2300F2FE"/></linearGradient></defs><rect width="200" height="200" rx="40" fill="url(%23g2)"/><circle cx="100" cy="80" r="35" fill="%23000" opacity="0.25"/><circle cx="100" cy="75" r="30" fill="%23FFF"/><path d="M45,165 C45,120 155,120 155,165" fill="%23FFF"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2300F2FE"/><stop offset="100%" stop-color="%2310B981"/></linearGradient></defs><rect width="200" height="200" rx="40" fill="url(%23g3)"/><circle cx="100" cy="80" r="35" fill="%23000" opacity="0.25"/><circle cx="100" cy="75" r="30" fill="%23FFF"/><path d="M45,165 C45,120 155,120 155,165" fill="%23FFF"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23F59E0B"/><stop offset="100%" stop-color="%23EF4444"/></linearGradient></defs><rect width="200" height="200" rx="40" fill="url(%23g4)"/><circle cx="100" cy="80" r="35" fill="%23000" opacity="0.25"/><circle cx="100" cy="75" r="30" fill="%23FFF"/><path d="M45,165 C45,120 155,120 155,165" fill="%23FFF"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23EC4899"/><stop offset="100%" stop-color="%238A2BE2"/></linearGradient></defs><rect width="200" height="200" rx="40" fill="url(%23g5)"/><circle cx="100" cy="80" r="35" fill="%23000" opacity="0.25"/><circle cx="100" cy="75" r="30" fill="%23FFF"/><path d="M45,165 C45,120 155,120 155,165" fill="%23FFF"/></svg>'
];
