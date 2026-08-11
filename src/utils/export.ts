import { toPng } from 'html-to-image';

export async function downloadCardAsPng(elementId: string, filename: string): Promise<boolean> {
  try {
    const node = document.getElementById(elementId);
    if (!node) {
      console.error(`Element #${elementId} not found`);
      return false;
    }

    const dataUrl = await toPng(node, {
      quality: 0.98,
      pixelRatio: 2,
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

export function copySocialShareText(_identityName: string, archetypeTitle: string, serialNumber: string): string {
  const shareText = `⚡ I just forged my Builder Identity for Hacker House Goa 2026!

🏆 Archetype: ${archetypeTitle}
🆔 Pass: ${serialNumber}
🌊 Vibe: Hacker House Goa '26 Verified

Forge your identity & build your squad at Forge Goa! 🌴🚀
#HHGoa26 #HackerHouseGoa #BuildOrDie`;

  navigator.clipboard.writeText(shareText);
  return shareText;
}
