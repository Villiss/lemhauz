import { track } from '@vercel/analytics';

// Tracking event definitions pre Lemhauz website
export const Analytics = {
  // Page tracking
  pageLoad: (page: string) => {
    track('Page_Loaded', { page });
  },

  // Navigation tracking
  sectionViewed: (section: string) => {
    track('Section_Viewed', { section });
  },

  mobileMenuOpened: () => {
    track('Mobile_Menu_Opened');
  },

  mobileNavigation: (destination: string) => {
    track('Mobile_Navigation_Clicked', { destination });
  },

  // Contact form tracking
  contactForm: {
    started: () => track('Contact_Form_Started'),
    fieldFocused: (field: string) => track('Contact_Form_Field_Focused', { field }),
    submitted: (subjectCategory: string) => track('Contact_Form_Submitted', { subject_category: subjectCategory }),
    success: (subjectCategory: string) => track('Contact_Form_Success', { subject_category: subjectCategory }),
    error: (errorType: string, errorMessage?: string) => 
      track('Contact_Form_Error', { 
        error_type: errorType, 
        error_message: errorMessage || 'unknown_error' 
      })
  },

  // Service interactions
  service: {
    cardClicked: (serviceId: string, serviceTitle: string) => 
      track('Service_Card_Clicked', { service: serviceId, service_title: serviceTitle }),
    featureHovered: (serviceId: string, feature: string) => 
      track('Service_Feature_Hovered', { service: serviceId, feature }),
    ctaClicked: (serviceId: string) => 
      track('Service_CTA_Clicked', { service: serviceId, cta_text: 'Začať projekt' })
  },

  // Contact interactions
  contact: {
    cardClicked: (type: string, content: string, hasHref: boolean) => 
      track('Contact_Card_Clicked', { type, content, has_href: hasHref }),
    linkClicked: (type: string, href: string) => 
      track('Contact_Link_Clicked', { type, href })
  },

  // Social media tracking
  social: {
    linkClicked: (platform: string) => track('Social_Link_Clicked', { platform })
  },

  // References tracking
  references: {
    viewed: (clientName: string) => track('Reference_Viewed', { client: clientName }),
    allViewed: () => track('All_References_Viewed')
  },

  // Scroll and engagement tracking
  engagement: {
    scrollMilestone: (percentage: number) => track('Scroll_Milestone', { percentage }),
    deepScroll: () => track('Deep_Scroll_Achieved'),
    timeSpent: (duration: string) => track('Time_Spent', { duration })
  },

  // Special Lemhauz events - Motokart academy
  motokart: {
    interestShown: () => track('Motokart_Interest_Shown'),
    featureClicked: (feature: string) => track('Motokart_Feature_Clicked', { feature }),
    inquiryStarted: () => track('Motokart_Inquiry_Started')
  },

  // Interactive elements
  interactive: {
    logoClicked: () => track('Logo_Clicked'),
    ctaClicked: (ctaText: string, location: string) => 
      track('CTA_Button_Clicked', { button_text: ctaText, location }),
    hoverEffectTriggered: (element: string) => 
      track('Interactive_Element_Hovered', { element })
  },

  // Business insights
  business: {
    serviceInquiry: (serviceType: string) => 
      track('Service_Inquiry', { service_type: serviceType }),
    leadGenerated: (source: string) => 
      track('Lead_Generated', { source }),
    quoteRequested: (serviceType: string) => 
      track('Quote_Requested', { service_type: serviceType })
  }
};

// Helper funkcie pre kategorizáciu
export const categorizeSubject = (subject: string): string => {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('web') || lowerSubject.includes('aplikáci') || lowerSubject.includes('vývoj')) {
    return 'web-development';
  }
  if (lowerSubject.includes('design') || lowerSubject.includes('grafick') || lowerSubject.includes('logo')) {
    return 'graphic-design';
  }
  if (lowerSubject.includes('motokár') || lowerSubject.includes('akadémi') || lowerSubject.includes('tréning')) {
    return 'motokart';
  }
  if (lowerSubject.includes('architektúr') || lowerSubject.includes('podnikové') || lowerSubject.includes('optimalizáci')) {
    return 'enterprise-architecture';
  }
  
  return 'other';
};

// Time tracking helper
export const startTimeTracking = () => {
  const startTime = Date.now();
  
  return {
    stop: () => {
      const duration = Date.now() - startTime;
      const minutes = Math.floor(duration / 60000);
      
      let durationCategory = '0-30s';
      if (duration > 30000 && duration <= 60000) durationCategory = '30s-1m';
      else if (duration > 60000 && duration <= 300000) durationCategory = '1m-5m';
      else if (duration > 300000) durationCategory = '5m+';
      
      Analytics.engagement.timeSpent(durationCategory);
    }
  };
}; 