import { LucideIcon } from "lucide-react"

// Company Data Types
export interface ContactInfo {
  email: string
  phone: string
  phoneFormatted: string
}

export interface SocialMedia {
  // facebook: string
  instagram: string
  // github: string
}

export interface Stats {
  projects: string
  experience: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  color: string
  features: string[]
  buttonText?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
}

export interface Reference {
  name: string
  testimonial: string
}

export interface ContactCard {
  title: string
  content: string
  icon: string
  backgroundColor: string
  hoverBackgroundColor: string
  href?: string
  isClickable?: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface WhyChooseUsItem {
  title: string
  description: string
  icon: string
  color: string
}

export interface Project {
  id: string
  name: string
  description: string
  image: string
  url: string
}

export interface SEOData {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
}

export interface CompanyData {
  name: string
  fullName: string
  description: string
  shortDescription: string
  location: string
  founded: string
  website: string
  contact: ContactInfo
  social: SocialMedia
  technologies: string[]
  designTools: string[]
  services: Service[]
  navigation: NavigationItem[]
  references: Reference[]
  contactCards: ContactCard[]
  socialLinks: SocialLink[]
  whyChooseUs: WhyChooseUsItem[]
  projects: Project[]
  seo: SEOData
}

// Component Props Types
export interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  backgroundColor: string
  hoverBackgroundColor: string
  features: string[]
  featureIcons: LucideIcon[]
  onButtonClick: () => void
  buttonText?: string
  serviceId?: string
}

export interface ContactCardProps {
  title: string
  content: string
  icon: LucideIcon
  backgroundColor: string
  hoverBackgroundColor: string
  href?: string
  className?: string
  isClickable?: boolean
}

export interface ReferenceCardProps {
  name: string
  testimonial: string
}

export interface StatItemProps {
  value: string
  label: string
}

export interface NavigationButtonProps {
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
  className?: string
  icon?: LucideIcon
  variant?: "desktop" | "mobile"
}

export interface SocialLinksProps {
  links: SocialLink[]
  className?: string
  linkClassName?: string
}

export interface FeatureItem {
  title: string
  description: string
  icon: LucideIcon
  color: string
}

export interface FeatureGridProps {
  features: FeatureItem[]
  className?: string
}

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "minimal"
  showText?: boolean
  className?: string
  onClick?: () => void
}

// Service Helper Types
export interface ServiceData {
  id: string
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  backgroundColor: string
  hoverBackgroundColor: string
  features: string[]
  featureIcons: LucideIcon[]
  color: string
  buttonText?: string
}

export interface ProjectCardProps {
  name: string
  description: string
  image: string
  url: string
}

// Color Classes Type
export interface ColorClasses {
  background: string
  hoverBackground: string
  text: string
  hoverText: string
} 