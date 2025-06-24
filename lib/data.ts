import type { CompanyData } from "./types"

export const companyData: CompanyData = {
  name: "Lemhauz",
  fullName: "Lemhauz s.r.o.",
  description: "Špecializujeme sa na vývoj moderných aplikácií, webových stránok a grafický dizajn. Naša vášeň je vytvárať riešenia, ktoré pomáhajú firmám rásť a byť úspešné.",
  shortDescription: "Vytvárame digitálne riešenia pre váš úspech",
  location: "Bratislava, Slovensko",
  founded: "2021",
  
  contact: {
    email: "info@lemhauz.com",
    phone: "+421 917 123 456",
    phoneFormatted: "+421917123456",
  },
  
  social: {
    facebook: "https://facebook.com/lemhauz",
    instagram: "https://instagram.com/lemhauz",
    github: "https://github.com/lemhauz"
  },
  
  website: "https://lemhauz.sk",
  
  stats: {
    projects: "50+",
    experience: "3+",
  },
  
  technologies: [
    "React",
    "Next.js", 
    "TypeScript",
    "Node.js",
    "Python"
  ],
  
  designTools: [
    "Figma",
    "Adobe Creative Suite",
    "Sketch",
    "Principle"
  ],
  
  services: [
    {
      id: "development",
      title: "Vývoj aplikácií & webov",
      description: "Získajte moderné mobilné aplikácie a responzívne webové stránky postavené na najnovších technológiách",
      icon: "Code",
      color: "blue",
      features: [
        "iOS & Android aplikácie",
        "Responzívne webové stránky", 
        "E-commerce riešenia"
      ]
    },
    {
      id: "design",
      title: "Grafický dizajn",
      description: "Vytvoríme vám jedinečnú firemnú identitu a vizuálnu komunikáciu, ktorá osloví vašich zákazníkov",
      icon: "Palette",
      color: "purple", 
      features: [
        "Firemná identita",
        "Logo dizajn",
        "Marketingové materiály"
      ]
    },
    {
      id: "architecture",
      title: "Podniková architektúra",
      description: "Optimalizujeme vaše IT procesy a navrhneme architektúru, ktorá zlepší efektivitu vašej firmy",
      icon: "Building2",
      color: "green",
      features: [
        "Systémová architektúra",
        "Procesné optimalizácie", 
        "IT stratégie"
      ]
    },
    {
      id: "motokart",
      title: "Motokárová akadémia", 
      description: "Zažite adrenalín a zdokonaľte svoje jazdné schopnosti v našej profesionálnej motokárovej akadémii",
      icon: "Users",
      color: "orange",
      features: [
        "Individuálne tréningy",
        "Skupinové kurzy",
        "Pokročilé techniky"
      ]
    }
  ],
  
  navigation: [
    { id: "sluzby", label: "Služby", icon: "Code" },
    { id: "o-nas", label: "O nás", icon: "Users" },
    { id: "referencie", label: "Referencie", icon: "Star" },
    { id: "kontakt", label: "Kontakt", icon: "Mail" }
  ],
  
  contactCards: [
    {
      title: "Email",
      content: "info@lemhauz.com",
      icon: "Mail",
      backgroundColor: "bg-gradient-to-br from-blue-600 to-blue-700",
      hoverBackgroundColor: "group-hover:from-blue-500 group-hover:to-blue-600",
      href: "mailto:info@lemhauz.com"
    },
    {
      title: "Telefón", 
      content: "+421 917 123 456",
      icon: "Phone",
      backgroundColor: "bg-gradient-to-br from-green-600 to-green-700",
      hoverBackgroundColor: "group-hover:from-green-500 group-hover:to-green-600",
      href: "tel:+421917123456"
    },
    {
      title: "Lokalita",
      content: "Bratislava, Slovensko", 
      icon: "MapPin",
      backgroundColor: "bg-gradient-to-br from-purple-600 to-purple-700",
      hoverBackgroundColor: "group-hover:from-purple-500 group-hover:to-purple-600",
      isClickable: false
    }
  ],
  
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com/lemhauz", icon: "Facebook" },
    { name: "Instagram", url: "https://instagram.com/lemhauz", icon: "Instagram" },
    { name: "GitHub", url: "https://github.com/lemhauz", icon: "Github" }
  ],

  references: [
    {
      name: "Martin Novák, TechStart s.r.o.",
      testimonial: "Lemhauz vytvoril presne to, čo sme potrebovali. Profesionálny prístup a kvalitné riešenie nás úplne presvedčili. Odporúčame všetkým!"
    },
    {
      name: "Dr. Jana Kováčová, Zdravie Plus",
      testimonial: "Fantastická práca! Aplikácia je intuitívna a našim pacientom sa veľmi páči. Vývojový proces bol hladký a komunikácia výborná."
    },
    {
      name: "Peter Svoboda, Creative Agency",
      testimonial: "Kreatívny prístup a pozornosť k detailom. Nová identita perfektne vystihuje našu firmu a web je jednoducho úžasný."
    },
    {
      name: "Tomáš Horák, Automotive Pro",
      testimonial: "Profesionálne riešenie ktoré nám ušetrilo množstvo času a peňazí. Systém je spoľahlivý a ľahko použiteľný."
    },
    {
      name: "Lucia Bartošová, ModernHome",
      testimonial: "Výnimočná kvalita práce a dodržanie termínov. Lemhauz predčil naše očakávania a výsledok je presne to, čo sme si predstavovali."
    },
    {
      name: "Michal Čierny, SportClub",
      testimonial: "Komunikácia na vysokej úrovni, rýchle riešenie problémov a profesionálny prístup. Určite budeme spolupracovať aj v budúcnosti."
    }
  ],

  whyChooseUs: [
    {
      title: "Moderné technológie",
      description: "Používame najnovšie a overené technológie aby vaše riešenia boli budúcnosť-proof a výkonné.",
      icon: "Code",
      color: "blue"
    },
    {
      title: "Rýchle dodanie",
      description: "Agilný prístup k vývoju umožňuje rýchle iterácie a včasné dodanie funkčných riešení.",
      icon: "Zap",
      color: "yellow"
    },
    {
      title: "24/7 Podpora",
      description: "Poskytujeme kompletnú podporu a údržbu aj po dokončení projektu pre váš pokojný spánok.",
      icon: "Shield",
      color: "green"
    },
    {
      title: "Transparentné ceny",
      description: "Jasné a férové cenníky bez skrytých poplatkov. Dostanete presne to, za čo platíte.",
      icon: "DollarSign",
      color: "purple"
    },
    {
      title: "Osobný prístup",
      description: "Každý projekt je jedinečný. Venujeme mu plnú pozornosť a prispôsobujeme sa vašim potrebám.",
      icon: "Heart",
      color: "red"
    },
    {
      title: "Dlhodobé partnerstvo",
      description: "Nehľadáme jednorázové zákazky, ale dlhodobé partnerstvá pre vzájomný rast a úspech.",
      icon: "Users",
      color: "orange"
    }
  ],
  
  seo: {
    title: "Lemhauz - IT Riešenia, Vývoj Aplikácií & Motokárová Akadémia",
    description: "Specializujeme sa na vývoj mobilných aplikácií, webových stránok, grafický dizajn a podnikovú architektúru. Okrem toho prevadzujeme motokárovú akadémiu v Bratislave, Slovensko.",
    keywords: "vývoj aplikácií, webové stránky, grafický dizajn, podniková architektúra, motokárová akadémia, React, Next.js, IT riešenia, Bratislava, Slovensko",
    ogTitle: "Lemhauz - IT Riešenia & Motokárová Akadémia",
    ogDescription: "Vytvárame digitálne riešenia pre váš úspech. Vývoj aplikácií, webov, dizajn a motokárová akadémia.",
  }
}

export const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      background: "bg-blue-100",
      hoverBackground: "group-hover:bg-blue-200", 
      text: "text-blue-600",
      hoverText: "group-hover:text-blue-700"
    },
    purple: {
      background: "bg-purple-100",
      hoverBackground: "group-hover:bg-purple-200",
      text: "text-purple-600", 
      hoverText: "group-hover:text-purple-700"
    },
    green: {
      background: "bg-green-100",
      hoverBackground: "group-hover:bg-green-200",
      text: "text-green-600",
      hoverText: "group-hover:text-green-700"
    },
    orange: {
      background: "bg-orange-100", 
      hoverBackground: "group-hover:bg-orange-200",
      text: "text-orange-600",
      hoverText: "group-hover:text-orange-700"
    }
  }
  
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
} 