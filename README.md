# 🏢 Lemhauz - Digitálne riešenia pre váš úspech

<div align="center">
  <img src="/app/icon1.png" alt="Lemhauz Logo" width="120" height="120"/>
  
  **Moderná webová prezentácia pre IT riešenia a motokárovú akadémiu**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

## 📋 O projekte

Lemhauz je moderná, responzívna webová stránka vytvorená pre IT spoločnosť špecializujúcu sa na:

- 💻 **Vývoj aplikácií & webov** - Mobilné aplikácie a webové stránky
- 🎨 **Grafický dizajn** - Firemná identita a vizuálna komunikácia  
- 🏗️ **Podniková architektúra** - IT procesy a systémové riešenia
- 🏎️ **Motokárová akadémia** - Profesionálny tréning jazdy

## ✨ Kľúčové funkcie

- 🎨 **Moderný dizajn** s gradient pozadiami a glass-morphism efektmi
- 📱 **Plne responzívne** rozloženie pre všetky zariadenia
- ⚡ **Optimalizované výkony** s Next.js 15 a React 19
- 🌈 **Interaktívne animácie** a hover efekty
- 📧 **Kontaktné formuláre** s automatickým routingom
- 🔍 **SEO optimalizované** s Open Graph meta tagmi
- 🌐 **Slovenská lokalizácia**

## 🛠️ Technológie

### Frontend
- **Next.js 15.3.4** - React framework s App Router
- **React 19** - Používateľské rozhranie
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Komponenty
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Moderné SVG ikony
- **Class Variance Authority** - Conditional CSS classes
- **Tailwind Merge** - Optimalizácia CSS tried

### Vývojové nástroje
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📦 Inštalácia

### Predpoklady
- Node.js 18+ 
- npm, yarn, pnpm alebo bun

### Kroky

1. **Klonujte repozitár**
```bash
git clone https://github.com/lemhauz/lemhauz.git
cd lemhauz
```

2. **Nainštalujte závislosti**
```bash
npm install
# alebo
yarn install
# alebo
pnpm install
# alebo
bun install
```

3. **Spustite vývojový server**
```bash
npm run dev
# alebo
yarn dev
# alebo
pnpm dev
# alebo
bun dev
```

4. **Otvorte prehliadač**
Prejdite na [http://localhost:3000](http://localhost:3000)

## 🚀 Dostupné scripty

```bash
npm run dev      # Spustí vývojový server
npm run build    # Vytvorí produkčnú verziu
npm run start    # Spustí produkčný server
npm run lint     # Spustí ESLint kontrolu
```

## 📁 Štruktúra projektu

```
lemhauz/
├── app/                    # Next.js App Router
│   ├── globals.css        # Globálne štýly
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Hlavná stránka
│   └── manifest.json      # PWA manifest
├── components/            # React komponenty
│   ├── ui/               # UI primitives
│   ├── ContactCard.tsx   # Kontaktné karty
│   ├── FeatureGrid.tsx   # Grid pre funkcie
│   ├── ServiceCard.tsx   # Karty služieb
│   └── ...
├── lib/                  # Utility funkcie a dáta
│   ├── data.ts          # Firemné dáta
│   ├── types.ts         # TypeScript typy
│   ├── utils.ts         # Helper funkcie
│   └── navigation.ts    # Navigačné funkcie
├── hooks/               # Custom React hooks
├── public/              # Statické súbory
└── ...
```

## 🎨 Dizajnový systém

### Farby
- **Primárne**: Blue (#3B82F6) a Purple (#8B5CF6) gradienty
- **Sekundárne**: Slate pre text a pozadia
- **Akcentové**: Farebné varianty pre rôzne služby

### Typografia
- **Geist Sans** - Moderný sans-serif font
- **Geist Mono** - Monospace pre kód

### Komponenty
- Glass-morphism karty s backdrop blur
- Gradient pozadia a hover efekty
- Responzívne grid layouty
- Interaktívne navigačné prvky

## 📱 Responzívnosť

- **Mobile First** prístup
- **Breakpointy**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible grids** s automatickým prispôsobovaním
- **Touch-friendly** interakcie

## 🔧 Konfigurácia

### Environment Variables
Vytvorte `.env.local` súbor pre lokálne nastavenia:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=info@lemhauz.com
```

### Tailwind CSS
Konfigurácia v `tailwind.config.js` s custom témou a animáciami.

## 🌐 Deployment

### Vercel (Odporúčané)
1. Push kód na GitHub
2. Pripojte repozitár na [Vercel](https://vercel.com)
3. Automatické deployment pri každom push

### Iné platformy
```bash
npm run build    # Vytvorí optimalizovanú verziu
npm run start    # Spustí produkčný server
```

## 🤝 Prispievanie

1. Fork repozitár
2. Vytvorte feature branch (`git checkout -b feature/amazing-feature`)
3. Commit zmeny (`git commit -m 'Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing-feature`)
5. Otvorte Pull Request

## 📄 Licencia

Tento projekt je licencovaný pod MIT License - pozrite si [LICENSE](LICENSE) súbor pre detaily.

## 📞 Kontakt

**Lemhauz s.r.o.**
- 📧 Email: info@lemhauz.sk
- 📱 Telefón: +421 902 890 544
- 🌐 Web: [lemhauz.sk](https://lemhauz.sk)
- 📍 Lokalita: Bratislava, Slovensko

---

<div align="center">
  <strong>Vytvorené s ❤️ tímom Lemhauz</strong>
  <br>
  <em>Digitálne riešenia pre váš úspech</em>
</div>
# lemhauz
