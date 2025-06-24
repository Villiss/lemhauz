"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/logo"
import { ServiceCard } from "@/components/ServiceCard"
import { ContactCard } from "@/components/ContactCard"
import { StatItem } from "@/components/StatItem"
import { NavigationButton } from "@/components/NavigationButton"
import { SocialLinks } from "@/components/SocialLinks"
import { ReferenceCard } from "@/components/ReferenceCard"
import { FeatureGrid } from "@/components/FeatureGrid"
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
import { companyData } from "@/lib/data"
import { scrollToSection, createScrollHandler, createEmailHandler } from "@/lib/navigation"
import { getServiceData, getServiceIcon } from "@/lib/serviceHelpers"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  // Navbar mouse tracking
  const [navbarMousePosition, setNavbarMousePosition] = useState({ x: 0, y: 0 });
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const handleNavbarMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setNavbarMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
              <Sheet>
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
                            onClick={() => scrollToSection('hero')}
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
                                onClick={createScrollHandler(item.id)}
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
                            onClick={createScrollHandler('kontakt')}
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
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <Logo 
                    size="lg"
                    variant="minimal"
                    showText={false}
                    className="hover:scale-110 hover:rotate-2 transition-all duration-300"
                  />
                  <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    LEMHAUZ
                  </div>
                </div>
                <Badge variant="outline" className="bg-white/70 backdrop-blur-sm text-slate-700 border-white/40 shadow-lg">
                  IT Riešenia & Dizajn
                </Badge>
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
                            <div className="flex items-center space-x-4 sm:space-x-8 pt-4">
                <StatItem value={companyData.stats.projects} label="Projektov" />
                <StatItem value={companyData.stats.experience} label="Roky skúseností" />
              </div>
            </div>
            <div className="relative order-last lg:order-last">
              <div className="relative z-10">
                <Image
                  src="/hero-workspace.svg"
                  alt="Moderný vývojársky workspace s laptopom, kódom a kávou"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl w-full h-auto"
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
            <Badge variant="outline" className="bg-white/70 backdrop-blur-sm text-slate-700 border-white/40 shadow-lg">
              Naše služby
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900">Komplexné IT riešenia</h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Dostanete kompletné IT riešenia od vývoja aplikácií až po podnikovú architektúru a motokárovú akadémiu
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {companyData.services.map((service) => {
              const serviceData = getServiceData(service)
              return (
                <ServiceCard
                  key={service.id}
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
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className="py-20 bg-gradient-to-br from-white/50 via-purple-50/30 to-slate-50/40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-last lg:order-first">
              <Badge variant="outline" className="bg-white/70 backdrop-blur-sm text-slate-700 border-white/40 shadow-lg">
                O nás
              </Badge>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Technológie</h4>
                  <div className="flex flex-wrap gap-2">
                    {companyData.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-white/70 backdrop-blur-sm border border-white/30 hover:scale-105 transition-all duration-300 cursor-default shadow-md relative overflow-hidden group"
                        onMouseMove={(e) => {
                          const badge = e.currentTarget;
                          const rect = badge.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          const lightX = (x / rect.width) * 100;
                          const lightY = (y / rect.height) * 100;
                          badge.style.background = `radial-gradient(200px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.15), transparent 60%)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '';
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Dizajn</h4>
                  <div className="flex flex-wrap gap-2">
                    {companyData.designTools.map((tool) => (
                      <Badge 
                        key={tool} 
                        variant="secondary" 
                        className="bg-white/70 backdrop-blur-sm border border-white/30 hover:scale-105 transition-all duration-300 cursor-default shadow-md relative overflow-hidden group"
                        onMouseMove={(e) => {
                          const badge = e.currentTarget;
                          const rect = badge.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          const lightX = (x / rect.width) * 100;
                          const lightY = (y / rect.height) * 100;
                          badge.style.background = `radial-gradient(200px circle at ${lightX}% ${lightY}%, rgba(147, 51, 234, 0.15), transparent 60%)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '';
                        }}
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <Image
                src="/about-team.svg"
                alt="Tím vývojárov a dizajnérov pracujúcich v modernom prostredí"
                width={400}
                height={500}
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="referencie" className="py-20 bg-gradient-to-br from-slate-50/40 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="bg-white/70 backdrop-blur-sm text-slate-700 border-white/40 shadow-lg">
              Referencie
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900">Úspešné projekty</h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Objavte naše úspešné projekty a prečítajte si, čo o nás hovoria spokojní klienti
            </p>
          </div>

          {/* References Grid */}
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

          {/* Why Choose Us Grid */}
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
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
              Kontakt
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white">Začnime spoluprácu</h2>
            <p className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto">
              Máte projekt alebo nápad? Povedzme si o vašich potrebách a nájdeme najlepšie riešenie
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

                      <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 text-sm sm:text-base px-6 sm:px-8 py-4 transform hover:scale-110 transition-all duration-500 group relative overflow-hidden"
              onClick={createEmailHandler(companyData.contact.email)}
            >
              <span className="relative z-10 font-semibold">Začnime projekt</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
            </Button>
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
