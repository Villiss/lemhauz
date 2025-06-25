# Custom Analytics Events - Lemhauz Website

Tento dokument obsahuje prehľad všetkých implementovaných custom events pre sledovanie správania používateľov na webstránke Lemhauz.

## 📊 Kategórie Events

### 🏠 Page & Navigation Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Page_Loaded` | `page: string` | Načítanie stránky |
| `Section_Viewed` | `section: string` | Zobrazenie sekcie (hero, sluzby, o-nas, referencie, kontakt) |
| `Mobile_Menu_Opened` | - | Otvorenie mobilného menu |
| `Mobile_Navigation_Clicked` | `destination: string` | Kliknutie na navigáciu v mobile menu |
| `Scroll_Milestone` | `percentage: number` | Dosiahnutie scroll milestone (50%, 75%, 100%) |

### 📧 Contact Form Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Contact_Form_Started` | - | Začatie vyplňovania formulára |
| `Contact_Form_Field_Focused` | `field: string` | Zameranie na pole formulára |
| `Contact_Form_Submitted` | `subject_category: string` | Odoslanie formulára |
| `Contact_Form_Success` | `subject_category: string` | Úspešné odoslanie |
| `Contact_Form_Error` | `error_type: string, error_message: string` | Chyba pri odosielaní |

**Subject Categories:** `web-development`, `graphic-design`, `motokart`, `enterprise-architecture`, `other`

### 🔧 Service Interaction Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Service_Card_Clicked` | `service: string, service_title: string` | Kliknutie na kartu služby |
| `Service_Feature_Hovered` | `service: string, feature: string` | Hover nad funkcionalitou služby |
| `Service_CTA_Clicked` | `service: string, cta_text: string` | Kliknutie na "Začať projekt" |

**Service IDs:** `development`, `design`, `architecture`, `motokart`

### 📞 Contact Interaction Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Contact_Card_Clicked` | `type: string, content: string, has_href: boolean` | Kliknutie na kontaktnú kartu |
| `Contact_Link_Clicked` | `type: string, href: string` | Kliknutie na kontaktný link |

**Contact Types:** `email`, `telefón`, `lokalita`

### 📱 Social Media Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Social_Link_Clicked` | `platform: string` | Kliknutie na sociálnu sieť |

**Platforms:** `facebook`, `instagram`, `github`

### 👥 References Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Reference_Viewed` | `client: string` | Zobrazenie referencie |
| `All_References_Viewed` | - | Zobrazenie všetkých referencií |

### 🏎️ Motokart Special Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Motokart_Interest_Shown` | - | Prejavenie záujmu o motokáry |
| `Motokart_Feature_Clicked` | `feature: string` | Kliknutie na funkciu motokár |
| `Motokart_Inquiry_Started` | - | Začatie dopyttu na motokáry |

### ⏱️ Engagement Events

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Time_Spent` | `duration: string` | Čas strávený na stránke |
| `Deep_Scroll_Achieved` | - | Hlboký scroll |

**Duration Categories:** `0-30s`, `30s-1m`, `1m-5m`, `5m+`

### 🎯 Interactive Elements

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Logo_Clicked` | - | Kliknutie na logo |
| `CTA_Button_Clicked` | `button_text: string, location: string` | Kliknutie na CTA tlačidlo |
| `Interactive_Element_Hovered` | `element: string` | Hover nad interaktívnym elementom |

### 💼 Business Insights

| Event Name | Properties | Popis |
|------------|------------|--------|
| `Service_Inquiry` | `service_type: string` | Dopyt po službe |
| `Lead_Generated` | `source: string` | Generovanie leadu |
| `Quote_Requested` | `service_type: string` | Požiadavka o cenovú ponuku |

## 🎯 Najdôležitejšie Events pre Business Insights

### 🏆 Top Priority Events
1. **`Contact_Form_Success`** - najdôležitejší conversion event
2. **`Service_CTA_Clicked`** - záujem o služby
3. **`Contact_Link_Clicked`** - priamy kontakt
4. **`Service_Card_Clicked`** - záujem o konkrétne služby

### 📈 Growth Tracking
- **`Page_Loaded`** - návštevnosť
- **`Section_Viewed`** - engagement s obsahom
- **`Scroll_Milestone`** - kvalita návštev
- **`Time_Spent`** - hĺbka záujmu

### 🎯 Lead Quality
- **Subject categories** v contact forme pomôžu identifikovať najžiadanejšie služby
- **`Motokart_*` events** pre špeciálnu službu
- **Service interactions** pre optimalizáciu obsahu

## 📊 Odporúčané Dashboard Metrics

### KPIs
- **Conversion Rate**: `Contact_Form_Success` / `Page_Loaded`
- **Service Interest**: `Service_CTA_Clicked` / `Service_Card_Clicked`
- **Engagement Rate**: `Scroll_Milestone(50%)` / `Page_Loaded`

### Segmentácia
- **Po službách**: Najžiadanejšie služby podľa CTA klikov
- **Po platformách**: Mobile vs Desktop engagement
- **Po zdrojoch**: Organický vs platený traffic behavior

## 🔧 Implementácia

Events sú implementované pomocí `@vercel/analytics` a organizované v `lib/analytics.ts` pre lepšiu udržateľnosť kódu.

Použitie:
```typescript
import { Analytics } from '@/lib/analytics';

// Sledovanie kontaktného formulára
Analytics.contactForm.success('web-development');

// Sledovanie služieb
Analytics.service.cardClicked('development', 'Vývoj aplikácií & webov');
``` 