import { toPng } from 'html-to-image';
import type { BuilderIdentity } from '../types';

export async function downloadCardAsPng(elementId: string, filename: string): Promise<boolean> {
  try {
    const node = document.getElementById(elementId);
    if (!node) {
      console.error(`Element #${elementId} not found`);
      return false;
    }

    const dataUrl = await toPng(node, {
      quality: 0.98,
      pixelRatio: 3, // High-res export for social posting
      cacheBust: true,
      filter: (domNode) => {
        if (domNode instanceof HTMLElement && domNode.classList.contains('no-export')) {
          return false;
        }
        return true;
      }
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Error exporting PNG image:', error);
    return false;
  }
}

export function copySocialShareText(identity: BuilderIdentity): string {
  const linkedinLine = identity.linkedinUrl ? `\n🔗 LinkedIn: ${identity.linkedinUrl}` : '';
  const twitterLine = identity.twitterHandle ? `\n🐦 X: @${identity.twitterHandle}` : '';
  const collegeLine = identity.college ? `\n🏛️ ${identity.college}` : '';

  const shareText = `⚡ I just forged my Builder Identity for Hacker House Goa 2026!

🏆 Builder Class: ${identity.archetypeTitle}
🆔 Pass: ${identity.serialNumber}
🚀 Ship Speed: ${identity.stats.shipSpeed}/100
💼 ${identity.whatIDo || identity.primaryAttribute}${collegeLine}${linkedinLine}${twitterLine}

Forge your identity & build your squad at Forge Goa! 🌴
#FrameInGoa #HHGoa26 #HackerHouseGoa #BuildOrDie`;

  navigator.clipboard.writeText(shareText);
  return shareText;
}

export function getTwitterShareUrl(identity: BuilderIdentity): string {
  const text = encodeURIComponent(
    `⚡ Just forged my Builder Identity for @HackerHouseGoa 2026!\n\n🏆 ${identity.archetypeTitle} | 🚀 Ship Speed: ${identity.stats.shipSpeed}/100\n🆔 ${identity.serialNumber}\n\n#FrameInGoa #HHGoa26 #BuildOrDie`
  );
  return `https://twitter.com/intent/tweet?text=${text}`;
}

export function getLinkedInShareUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://hhgoa.com')}`;
}
