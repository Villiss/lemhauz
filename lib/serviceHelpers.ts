import { 
  Code, 
  Palette, 
  Building2, 
  Users, 
  Smartphone, 
  Globe, 
  Layers,
  Mail,
  Phone,
  MapPin,
  Zap,
  Shield,
  DollarSign,
  Heart,
  Star
} from "lucide-react"
import { getColorClasses } from "./data"
import type { Service, ServiceData } from "./types"

export const iconMap = {
  Code,
  Palette,
  Building2,
  Users,
  Smartphone,
  Globe,
  Layers,
  Mail,
  Phone,
  MapPin,
  Zap,
  Shield,
  DollarSign,
  Heart,
  Star
}

export const serviceFeatureIcons = {
  development: [Smartphone, Globe, Layers],
  design: [Building2, Palette, Layers],
  architecture: [Layers, Users, Building2],
  motokart: [Users, Building2, Layers]
}

export const getServiceIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Code
}

export const getServiceData = (service: Service) => {
  const colors = getColorClasses(service.color)
  return {
    ...service,
    icon: getServiceIcon(service.icon),
    iconColor: colors.text + " " + colors.hoverText,
    backgroundColor: colors.background,
    hoverBackgroundColor: colors.hoverBackground,
    featureIcons: serviceFeatureIcons[service.id as keyof typeof serviceFeatureIcons] || [Layers, Layers, Layers]
  }
} 