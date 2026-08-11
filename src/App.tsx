import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuizModal } from './components/QuizModal';
import { BuilderCard } from './components/BuilderCard';
import { StickerCustomizer } from './components/StickerCustomizer';
import { SquadPoster } from './components/SquadPoster';
import { CommunityWall } from './components/CommunityWall';
import { Footer } from './components/Footer';
import type { BuilderIdentity, Sticker } from './types';
import { playClickSound } from './utils/audio';
import { Sparkles, RefreshCw, PlusCircle } from 'lucide-react';

const STORAGE_KEYS = {
  USER_IDENTITY: 'forge_goa_user_identity',
  COMMUNITY_BUILDERS: 'forge_goa_community_builders',
  SQUAD_MEMBERS: 'forge_goa_squad_members'
};

export function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Load from localStorage or initialize empty
  const [userIdentity, setUserIdentity] = useState<BuilderIdentity | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_IDENTITY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [communityBuilders, setCommunityBuilders] = useState<BuilderIdentity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMUNITY_BUILDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [squadMembers, setSquadMembers] = useState<BuilderIdentity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SQUAD_MEMBERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      if (userIdentity) {
        localStorage.setItem(STORAGE_KEYS.USER_IDENTITY, JSON.stringify(userIdentity));
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [userIdentity]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_BUILDERS, JSON.stringify(communityBuilders));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [communityBuilders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SQUAD_MEMBERS, JSON.stringify(squadMembers));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [squadMembers]);

  const handleIdentityForged = (newIdentity: BuilderIdentity) => {
    setUserIdentity(newIdentity);
    
    setCommunityBuilders(prev => {
      const exists = prev.some(b => b.id === newIdentity.id);
      return exists ? prev.map(b => b.id === newIdentity.id ? newIdentity : b) : [newIdentity, ...prev];
    });

    setSquadMembers(prev => {
      if (prev.length < 4 && !prev.some(m => m.id === newIdentity.id)) {
        return [...prev, newIdentity];
      }
      return prev;
    });
  };

  const handleUpdateIdentityStickers = (newStickers: Sticker[]) => {
    if (userIdentity) {
      const updated = { ...userIdentity, stickers: newStickers };
      setUserIdentity(updated);
      setCommunityBuilders(prev => prev.map(b => b.id === updated.id ? updated : b));
      setSquadMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
    }
  };

  const handleAddToSquad = (identity: BuilderIdentity) => {
    if (squadMembers.length < 4 && !squadMembers.some(m => m.id === identity.id)) {
      setSquadMembers([...squadMembers, identity]);
    }
  };

  const handleRemoveSquadMember = (id: string) => {
    setSquadMembers(squadMembers.filter(m => m.id !== id));
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B6638] text-[#FAF7EC] selection:bg-[#FFE600] selection:text-black flex flex-col justify-between">
      
      {/* Top Header */}
      <Header
        onOpenQuiz={() => setIsQuizOpen(true)}
        onScrollToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      <main className="flex-grow space-y-16">
        
        {/* Hero Section */}
        <section id="hero">
          <Hero
            onOpenQuiz={() => setIsQuizOpen(true)}
            onExploreArchetypes={() => handleScrollToSection('archetypes')}
            forgedCount={communityBuilders.length}
          />
        </section>

        {/* Active Builder Identity Studio Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#063D21] border-2 border-[#FFE600] text-[#FFE600] text-xs font-hh-mono font-bold uppercase rounded">
              <Sparkles className="w-4 h-4 text-[#FF007F]" />
              <span>BUILDER IDENTITY PASSPORT STUDIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-hh-title font-black text-[#FFE600] uppercase tracking-tight">
              YOUR FORGED <span className="text-[#FF007F]">BUILDER PASSPORT</span>
            </h2>
            <p className="text-sm font-hh-mono text-amber-100 max-w-md mx-auto">
              Customize frame theme &amp; badges, download high-res cards, and build your squad.
            </p>
          </div>

          {userIdentity ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Card Canvas Left Column */}
              <div className="lg:col-span-6">
                <BuilderCard
                  identity={userIdentity}
                  onUpdateIdentity={setUserIdentity}
                  onAddToSquad={handleAddToSquad}
                />
              </div>

              {/* Sticker Customizer & Actions Right Column */}
              <div className="lg:col-span-6 space-y-6">
                <StickerCustomizer
                  identity={userIdentity}
                  onUpdateStickers={handleUpdateIdentityStickers}
                />

                {/* Re-forge Button */}
                <button
                  onClick={() => { playClickSound(); setIsQuizOpen(true); }}
                  className="w-full py-3.5 bg-[#063D21] hover:bg-[#12844C] text-[#FFE600] font-hh-mono font-bold text-xs uppercase tracking-wider border-2 border-[#FFE600] shadow-[4px_4px_0px_#000000] flex items-center justify-center space-x-2 transition-all"
                >
                  <RefreshCw className="w-4 h-4 text-[#FF007F]" />
                  <span>RE-FORGE IDENTITY WITH NEW ANSWERS / PHOTO</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-12 sm:p-16 rounded-3xl bg-[#063D21] border-4 border-[#FFE600] text-center space-y-6 max-w-2xl mx-auto shadow-[10px_10px_0px_#042E18]">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE600] text-[#063D21] mx-auto flex items-center justify-center shadow-xl border-2 border-black">
                <PlusCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-hh-title font-black text-3xl text-[#FFE600] uppercase">NO PASSPORT FORGED YET</h3>
                <p className="text-xs sm:text-sm text-amber-100 font-hh-mono leading-relaxed">
                  Start the 4-step identity ritual to discover your builder class, generate your verified HH Goa '26 passport card, and unlock squad mode.
                </p>
              </div>
              <button
                onClick={() => { playClickSound(); setIsQuizOpen(true); }}
                className="px-8 py-4 bg-[#FF007F] hover:bg-[#FFE600] text-white hover:text-black font-hh-title font-black text-xl uppercase tracking-wider border-3 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center space-x-2"
              >
                <Sparkles className="w-6 h-6 text-[#FFE600] fill-current" />
                <span>FORGE MY BUILDER PASSPORT NOW</span>
              </button>
            </div>
          )}
        </section>

        {/* Squad Poster Section (Capped at 4) */}
        <SquadPoster
          currentIdentity={userIdentity}
          squadMembers={squadMembers}
          availableCommunityBuilders={communityBuilders}
          onRemoveMember={handleRemoveSquadMember}
          onAddMember={handleAddToSquad}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Live Community Wall */}
        <CommunityWall
          builders={communityBuilders}
          onSelectBuilder={builder => {
            setUserIdentity(builder);
            handleScrollToSection('hero');
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 4-Step Identity Ritual Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onIdentityForged={handleIdentityForged}
      />

    </div>
  );
}

export default App;
