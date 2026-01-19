"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/logo"
import { ServiceCard } from "@/components/ServiceCard"
import { ContactCard } from "@/components/ContactCard"
import { NavigationButton } from "@/components/NavigationButton"
import { SocialLinks } from "@/components/SocialLinks"
import { ReferenceCard } from "@/components/ReferenceCard"
import { FeatureGrid } from "@/components/FeatureGrid"
import { ContactFormDark } from "@/components/ContactFormDark"
import { ProjectCard } from "@/components/ProjectCard"
import {
  ArrowRight,
  Code,
  Users,
  Mail,
  Menu,
  Phone,
  MapPin
} from "lucide-react"
import Image from "next/image"
import { companyData, MAINTENANCE_MODE } from "@/lib/data"
import { scrollToSection, createScrollHandler, createEmailHandler } from "@/lib/navigation"
import { getServiceData, getServiceIcon } from "@/lib/serviceHelpers"
import React, { useEffect, useState } from "react"
import { track } from "@vercel/analytics"

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  // Navbar mouse tracking
  const [navbarMousePosition, setNavbarMousePosition] = useState({ x: 0, y: 0 });
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);
  // Mobile sheet state
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // Maintenance scroll button visibility
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hideScrollButton, setHideScrollButton] = useState(false);
  // Tracking states
  const [hasTrackedDeepScroll, setHasTrackedDeepScroll] = useState(false);
  const [lastTrackedSection, setLastTrackedSection] = useState<string>('');

  useEffect(() => {
    // Track page load
    track('Page_Loaded', { page: 'homepage' });
    
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Track scroll milestones
      if (progress > 50 && !hasTrackedDeepScroll) {
        track('Scroll_Milestone', { percentage: 50 });
        setHasTrackedDeepScroll(true);
      }

      // Track section viewing based on scroll position
      const sections = ['hero', 'sluzby', 'o-nas', 'kontakt'];
      const currentSection = Math.floor((progress / 100) * sections.length);
      const sectionName = sections[currentSection];
      
      if (sectionName && sectionName !== lastTrackedSection) {
        track('Section_Viewed', { section: sectionName });
        setLastTrackedSection(sectionName);
      }

      // V maintenance móde sleduj pozíciu contact formu
      if (MAINTENANCE_MODE) {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
          const contactFormRect = contactForm.getBoundingClientRect();
          const isNearContactForm = contactFormRect.top < window.innerHeight * 0.8;
          setHideScrollButton(isNearContactForm);
        }
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [hasTrackedDeepScroll, lastTrackedSection]);

  // Show scroll button after 3 seconds in maintenance mode
  useEffect(() => {
    if (MAINTENANCE_MODE) {
      const timer = setTimeout(() => {
        setShowScrollButton(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavbarMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setNavbarMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Handler for mobile navigation that scrolls first then closes sheet
  const createMobileScrollHandler = (sectionId: string) => {
    return () => {
      track('Mobile_Navigation_Clicked', { destination: sectionId });
      scrollToSection(sectionId); // Scroll first
      setTimeout(() => {
        setIsSheetOpen(false); // Then close the sheet after a short delay
      }, 200); // Small delay to let user see the scroll
    };
  };

  const handleMobileMenuOpen = () => {
    track('Mobile_Menu_Opened');
    setIsSheetOpen(true);
  };

  // Ak je maintenance mode aktívny, zobraz maintenance stránku s tmavým pozadím
  if (MAINTENANCE_MODE) {
    return (
      <>
        {/* Maintenance Hero s tmavým pozadím */}
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          {/* Grid pattern pozadie */}
          <div className="absolute inset-0 opacity-40" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E\")"}}></div>
          
          <div className="container mx-auto px-4 py-16 relative z-10 flex items-center justify-center min-h-screen">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div 
                    className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight cursor-pointer inline-block"
                    style={{
                      background: 'linear-gradient(45deg, #ffffff, #ffffff)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      transition: 'background 0.3s ease-out'
                    }}
                    onMouseMove={(e) => {
                      const text = e.currentTarget;
                      const rect = text.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      const lightX = (x / rect.width) * 100;
                      const lightY = (y / rect.height) * 100;
                      
                      text.style.background = `radial-gradient(300px circle at ${lightX}% ${lightY}%, #3b82f6, #9333ea, #ffffff)`;
                      text.style.webkitBackgroundClip = 'text';
                      text.style.backgroundClip = 'text';
                    }}
                    onMouseLeave={(e) => {
                      const text = e.currentTarget;
                      text.style.background = 'linear-gradient(45deg, #ffffff, #ffffff)';
                      text.style.webkitBackgroundClip = 'text';
                      text.style.backgroundClip = 'text';
                    }}
                  >
                    LEMHAUZ
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Momentálne na stránke <span className="text-blue-400">pracujeme</span>
                  </h1>
                  <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                    Naša stránka sa práve vylepšuje! Čoskoro budeme späť s novým obsahom a funkciami. 
                    Ak máte nejaké otázky alebo potrebujete okamžitú pomoc, neváhajte nás kontaktovať.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
                  <div 
                    className="space-y-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default group relative overflow-hidden"
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      const lightX = (x / rect.width) * 100;
                      const lightY = (y / rect.height) * 100;
                      
                      card.style.background = `radial-gradient(400px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.15), rgba(255, 255, 255, 0.05))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="text-3xl font-bold text-blue-400">💻</div>
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">Vylepšujeme</h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Nové funkcie a obsah</p>
                  </div>
                  <div 
                    className="space-y-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default group relative overflow-hidden"
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      const lightX = (x / rect.width) * 100;
                      const lightY = (y / rect.height) * 100;
                      
                      card.style.background = `radial-gradient(400px circle at ${lightX}% ${lightY}%, rgba(147, 51, 234, 0.15), rgba(255, 255, 255, 0.05))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="text-3xl font-bold text-purple-400">⚡</div>
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">Optimalizujeme</h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Rýchlosť a výkon</p>
                  </div>
                  <div 
                    className="space-y-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default group relative overflow-hidden"
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      const lightX = (x / rect.width) * 100;
                      const lightY = (y / rect.height) * 100;
                      
                      card.style.background = `radial-gradient(400px circle at ${lightX}% ${lightY}%, rgba(34, 197, 94, 0.15), rgba(255, 255, 255, 0.05))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <div className="text-3xl font-bold text-green-400">🎨</div>
                    <h3 className="font-semibold text-white group-hover:text-green-300 transition-colors duration-300">Modernizujeme</h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Dizajn a UX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Button */}
          {showScrollButton && (
            <div 
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500"
              style={{
                opacity: hideScrollButton ? 0 : 1,
                transform: `translate(-50%, ${hideScrollButton ? '20px' : '0'}) scale(${hideScrollButton ? 0.9 : 1})`,
                pointerEvents: hideScrollButton ? 'none' : 'auto'
              }}
            >
              <button
                onClick={() => {
                  const contactForm = document.querySelector('#contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group relative p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 animate-bounce hover:animate-none overflow-hidden"
                style={{
                  animation: showScrollButton ? 'fadeInUp 1s ease-out forwards' : undefined,
                }}
                onMouseMove={(e) => {
                  const button = e.currentTarget;
                  const rect = button.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  const lightX = (x / rect.width) * 100;
                  const lightY = (y / rect.height) * 100;
                  
                  button.style.background = `radial-gradient(200px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(255, 255, 255, 0.1))`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full"></div>
                <ArrowRight className="h-6 w-6 text-white transform rotate-90 group-hover:text-blue-300 transition-all duration-300 relative z-10" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              </button>
            </div>
          )}

        {/* Contact Form - zachovaný s pridaným id */}
        <div id="contact-form">
          <ContactFormDark />
        </div>
        
        {/* Spacing pod contact formom */}
        <div className="py-16"></div>
        </div>
        
      </>
    );
  }

  // Normálny obsah stránky
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-[100]">
        <div className="container mx-auto max-w-6xl">
          <div 
            className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl shadow-black/5 relative overflow-hidden transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, ${0.7 + scrollProgress * 0.001}) 0%, 
                rgba(59, 130, 246, ${0.05 + scrollProgress * 0.002}) ${scrollProgress}%, 
                rgba(147, 51, 234, ${0.05 + scrollProgress * 0.002}) 100%)`,
              backdropFilter: `blur(${12 + scrollProgress * 0.1}px)`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${0.05 + scrollProgress * 0.002}), 
                         0 0 ${20 + scrollProgress * 0.5}px rgba(59, 130, 246, ${scrollProgress * 0.002})`
            }}
            onMouseMove={handleNavbarMouseMove}
            onMouseEnter={() => setIsNavbarHovered(true)}
            onMouseLeave={() => setIsNavbarHovered(false)}
          >
            {/* Mouse tracking highlight */}
            {isNavbarHovered && (
              <div
                className="absolute pointer-events-none transition-opacity duration-300 ease-out"
                style={{
                  left: navbarMousePosition.x,
                  top: navbarMousePosition.y,
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 30%, transparent 70%)`,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: isNavbarHovered ? 1 : 0,
                }}
              />
            )}
            {/* Parallax Background Elements */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500"
              style={{ 
                opacity: scrollProgress * 0.01,
                transform: `translateX(${scrollProgress * -0.5}px)`
              }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-400/3 to-blue-400/3 opacity-0 transition-opacity duration-500"
              style={{ 
                opacity: scrollProgress * 0.008,
                transform: `translateX(${scrollProgress * 0.3}px) translateY(${scrollProgress * -0.1}px)`
              }}
            />
            
            {/* Animated Particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  transform: `translateX(${scrollProgress * (i % 2 === 0 ? 0.8 : -0.6)}px) translateY(${scrollProgress * (i % 3 === 0 ? -0.4 : 0.3)}px)`,
                  opacity: scrollProgress * 0.02,
                  transition: 'all 0.3s ease-out'
                }}
              />
            ))}
            <div className="flex items-center justify-between h-16 px-6">
            <Logo 
              size="md" 
                variant="minimal"
              onClick={() => scrollToSection('hero')}
                className="hover:scale-110 transition-all duration-300 hover:rotate-3"
            />
            
            {/* Desktop Navigation */}
              <div 
                className="hidden md:flex items-center space-x-1 relative"
                onMouseLeave={(e) => {
                  const blob = e.currentTarget.querySelector('.nav-blob') as HTMLElement;
                  const blobOverlay = e.currentTarget.querySelector('.nav-blob-overlay') as HTMLElement;
                  if (blob) blob.style.opacity = '0';
                  if (blobOverlay) blobOverlay.style.opacity = '0';
                }}
              >
                {/* Animated background blob */}
                <div className="absolute inset-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                  <div className="absolute bg-gradient-to-r from-blue-500/90 to-purple-600/90 rounded-xl backdrop-blur-sm transition-all duration-500 ease-out transform scale-95"></div>
                  <div className="absolute bg-white/20 rounded-xl transition-all duration-500 ease-out"></div>
                </div>
                
                {companyData.navigation.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative group"
                    onMouseEnter={(e) => {
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        const blob = parent.querySelector('.nav-blob') as HTMLElement;
                        const blobOverlay = parent.querySelector('.nav-blob-overlay') as HTMLElement;
                        if (blob && blobOverlay) {
                          const rect = target.getBoundingClientRect();
                          const parentRect = parent.getBoundingClientRect();
                          const left = rect.left - parentRect.left;
                          const width = rect.width;
                          const height = rect.height;
                          
                          blob.style.left = `${left}px`;
                          blob.style.width = `${width}px`;
                          blob.style.height = `${height}px`;
                          blob.style.opacity = '1';
                          
                          blobOverlay.style.left = `${left}px`;
                          blobOverlay.style.width = `${width}px`;
                          blobOverlay.style.height = `${height}px`;
                          blobOverlay.style.opacity = '1';
                        }
                      }
                    }}
                  >
                    <NavigationButton
                      onClick={createScrollHandler(item.id)}
                      className="relative px-5 py-2.5 rounded-xl text-slate-700 hover:text-white transition-all duration-300 font-medium z-10"
                    >
                      <span className="relative z-10">{item.label}</span>
                    </NavigationButton>
                  </div>
                ))}
                
                {/* Floating blob that follows mouse */}
                <div 
                  className="nav-blob absolute bg-gradient-to-r from-blue-500/90 to-purple-600/90 rounded-xl backdrop-blur-sm transition-all duration-500 ease-out opacity-0 pointer-events-none"
                  style={{ top: '0px' }}
                ></div>
                <div 
                  className="nav-blob-overlay absolute bg-white/20 rounded-xl transition-all duration-500 ease-out opacity-0 pointer-events-none"
                  style={{ top: '0px' }}
                ></div>
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:scale-110 transition-all duration-300">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl p-6 border-l border-white/30 z-[150]">
                  <SheetTitle className="sr-only">Hlavné menu</SheetTitle>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center pb-6 border-b">
                        <div className="rounded-xl p-2">
                        <div className="flex items-center space-x-2">
                          <Logo 
                            size="sm" 
                              variant="minimal"
                            onClick={createMobileScrollHandler('hero')}
                          />
                            <div className="text-base font-bold text-slate-900 tracking-tight">
                            LEMHAUZ
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <nav className="flex-1 pt-6">
                      <div className="space-y-6">
                        <div className="space-y-3">
                            {companyData.navigation.map((item) => (
                              <NavigationButton
                                key={item.id}
                                onClick={createMobileScrollHandler(item.id)}
                                variant="mobile"
                                icon={getServiceIcon(item.icon)}
                              >
                                {item.label}
                              </NavigationButton>
                            ))}
                        </div>
                        
                        <div className="border-t pt-6">
                          <Button 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-500 group relative overflow-hidden"
                            onClick={createMobileScrollHandler('kontakt')}
                          >
                            <ArrowRight className="mr-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                            <span className="relative z-10">Začať projekt</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                          </Button>
                        </div>
                        
                        <div className="border-t pt-6">
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-900">Kontakt</h4>
                            <div className="space-y-2 text-sm text-slate-600">
                                                              <a href={`mailto:${companyData.contact.email}`} className="flex items-center space-x-2 hover:text-white cursor-pointer group transition-all duration-500 rounded-lg p-2 -m-2 transform hover:scale-105 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-lg"></div>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                                <Mail className="h-4 w-4 transition-all duration-300 group-hover:scale-110 relative z-10" />
                                <span className="transition-all duration-300 group-hover:translate-x-1 relative z-10">{companyData.contact.email}</span>
                              </a>
                              <a href={`tel:${companyData.contact.phoneFormatted}`} className="flex items-center space-x-2 hover:text-white cursor-pointer group transition-all duration-500 rounded-lg p-2 -m-2 transform hover:scale-105 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 to-blue-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-lg"></div>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                                <Phone className="h-4 w-4 transition-all duration-300 group-hover:scale-110 relative z-10" />
                                <span className="transition-all duration-300 group-hover:translate-x-1 relative z-10">{companyData.contact.phone}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </nav>
                    
                    <div className="border-t pt-6">
                      <SocialLinks 
                        links={companyData.socialLinks}
                        className="flex justify-center space-x-2"
                        linkClassName="text-slate-400 hover:text-white transition-all duration-500 cursor-pointer transform hover:scale-110 font-medium p-2 rounded-lg relative group"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <Button 
                className="hidden md:block bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 transform group relative overflow-hidden"
                onClick={createScrollHandler('kontakt')}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:text-white">Začať projekt</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">✨</div>
            </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-first lg:order-first">
              <div className="space-y-4">
                <div className="text-center lg:text-left">
                  <div 
                    className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight cursor-pointer py-2 rounded-lg inline-block"
                    style={{
                      background: 'linear-gradient(45deg, #1e293b, #1e293b)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      transition: 'background 0.3s ease-out'
                    }}
                    onMouseMove={(e) => {
                      const text = e.currentTarget;
                      const rect = text.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      const lightX = (x / rect.width) * 100;
                      const lightY = (y / rect.height) * 100;
                      
                      text.style.background = `radial-gradient(300px circle at ${lightX}% ${lightY}%, #3b82f6, #9333ea, #1e293b)`;
                      text.style.webkitBackgroundClip = 'text';
                      text.style.backgroundClip = 'text';
                    }}
                    onMouseLeave={(e) => {
                      const text = e.currentTarget;
                      text.style.background = 'linear-gradient(45deg, #1e293b, #1e293b)';
                      text.style.webkitBackgroundClip = 'text';
                      text.style.backgroundClip = 'text';
                    }}
                    onClick={() => scrollToSection('hero')}
                  >
                    LEMHAUZ
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  {companyData.shortDescription.split('úspech')[0]}<span className="text-blue-600">úspech</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  {companyData.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/25 text-sm sm:text-base px-4 sm:px-6 transform hover:scale-105 transition-all duration-500 border-0 backdrop-blur-sm relative overflow-hidden group"
                  onClick={createScrollHandler('sluzby')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <span className="relative z-10">Preskúmajte naše služby</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/70 backdrop-blur-xl text-slate-700 border-white/40 hover:text-white hover:border-blue-200 text-sm sm:text-base px-4 sm:px-6 transform hover:scale-105 transition-all duration-500 hover:shadow-xl relative overflow-hidden group"
                  onClick={createScrollHandler('kontakt')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <span className="relative z-10">Kontaktujte nás</span>
                </Button>
              </div>
            </div>
            <div className="relative order-last lg:order-last">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Moderný IT tím spolupracujúci na vývoji softvéru v profesionálnom workspace"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[4/3]"
                  onError={(e) => {
                    e.currentTarget.src = "/hero-workspace.svg";
                    e.currentTarget.alt = "Moderný vývojársky workspace s laptopom, kódom a kávou";
                  }}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-48 h-48 lg:w-72 lg:h-72 bg-blue-100 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 lg:w-72 lg:h-72 bg-purple-100 rounded-full blur-3xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="py-20 bg-gradient-to-br from-slate-50/50 via-white/30 to-blue-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900">Komplexné IT riešenia</h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Dostanete kompletné IT riešenia od vývoja aplikácií až po podnikovú architektúru a motokárovú akadémiu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyData.services.map((service) => {
              const serviceData = getServiceData(service)
              return (
                <div key={service.id}>
                  <ServiceCard
                    title={serviceData.title}
                    description={serviceData.description}
                    icon={serviceData.icon}
                    iconColor={serviceData.iconColor}
                    backgroundColor={serviceData.backgroundColor}
                    hoverBackgroundColor={serviceData.hoverBackgroundColor}
                    features={serviceData.features}
                    featureIcons={serviceData.featureIcons}
                    onButtonClick={() => scrollToSection('kontakt')}
                  />
                </div>
              )
            })}
          </div>

          {/* Projects Grid */}
          <div className="mt-20">
            <div className="text-center space-y-4 mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Naše projekty</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Pozrite si ukážky našich realizovaných projektov
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyData.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  image={project.image}
                  url={project.url}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className="py-20 bg-gradient-to-br from-white/50 via-purple-50/30 to-slate-50/40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-last lg:order-first">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Vaši partneri pre technológie a dizajn</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Spolupracujete s tímom skúsených vývojárov a dizajnérov s viac ako 3 rokmi praxe v oblasti IT riešení. 
                  Dostanete komplexné služby od moderných aplikácií, webových stránok až po grafický dizajn a podnikovú architektúru.
                </p>
                <p>
                  Okrem IT služieb vám ponúkame aj motokárovú akadémiu s profesionálnym tréningom jazdy. 
                  Naša vízia je jasná - vytvárame riešenia a poskytujeme služby, ktoré vám pomôžu rásť a dosiahnuť úspech.
                </p>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Profesionálny tím IT vývojárov a dizajnérov spolupracujúcich v modernom office prostredí"
                className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3]"
                onError={(e) => {
                  e.currentTarget.src = "/about-team.svg";
                  e.currentTarget.alt = "Tím vývojárov a dizajnérov pracujúcich v modernom prostredí";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* <section id="referencie" className="py-20 bg-gradient-to-br from-slate-50/40 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900">Projekty</h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Objavte naše projekty
            </p>
          </div>

          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyData.references.map((reference) => (
                <ReferenceCard
                  key={reference.name}
                  name={reference.name}
                  testimonial={reference.testimonial}
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Prečo si vybrať nás?</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Získajte výhodu našich technických znalostí a kreatívneho prístupu pre váš úspech
              </p>
            </div>
            <FeatureGrid 
              features={companyData.whyChooseUs.map(feature => ({
                ...feature,
                icon: getServiceIcon(feature.icon)
              }))} 
            />
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="kontakt" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white">Začnime spoluprácu</h2>
            <p className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto">
              Máte projekt alebo nápad? Povedzme si o vašich potrebách a nájdeme najlepšie riešenie
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyData.contactCards.map((card, index) => (
              <ContactCard
                key={card.title}
                title={card.title}
                content={card.content}
                icon={getServiceIcon(card.icon)}
                backgroundColor={card.backgroundColor}
                hoverBackgroundColor={card.hoverBackgroundColor}
                href={card.href}
                className={index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
                isClickable={card.isClickable !== false}
              />
            ))}
          </div>

          <div className="mt-16">
            <ContactFormDark />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
                <Logo 
                  size="md"
                variant="default"
                className="rounded-lg hover:scale-110 hover:rotate-2 transition-all duration-300 opacity-80 group-hover:opacity-100"
                />
              <div className="text-xl font-bold text-white/80 group-hover:text-white tracking-tight transition-all duration-300">
                  LEMHAUZ
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
              <div className="text-slate-400 text-sm sm:text-base">© {new Date().getFullYear()} {companyData.fullName}. Všetky práva vyhradené.</div>
              <SocialLinks 
                links={companyData.socialLinks} 
                linkClassName="text-slate-400 hover:text-blue-400 transition-all duration-300 cursor-pointer transform hover:scale-125 hover:-translate-y-2 font-medium relative group"
                className="flex justify-center space-x-6"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
