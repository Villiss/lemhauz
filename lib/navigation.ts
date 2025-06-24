// Utility funkcie pre navigáciu
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Fixed offset pre floating navbar - väčší offset aby content nebol pod navbarom
    const floatingNavbarOffset = 120; // Konzistentný offset pre všetky veľkosti
    const offsetTop = element.offsetTop - floatingNavbarOffset;
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

export const createScrollHandler = (sectionId: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToSection(sectionId);
}

export const createEmailHandler = (email: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  window.location.href = `mailto:${email}`;
} 