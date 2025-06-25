import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ServiceCardProps } from "@/lib/types"
import { track } from "@vercel/analytics"

export function ServiceCard({
  title,
  description,
  icon: Icon,
  iconColor,
  backgroundColor,
  hoverBackgroundColor,
  features,
  featureIcons,
  onButtonClick,
  serviceId
}: ServiceCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Len dynamické podsvittenie
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    
    card.style.background = `radial-gradient(600px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.15), transparent 40%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = '';
  };

  const handleServiceCardClick = () => {
    track('Service_Card_Clicked', { 
      service: serviceId || title.toLowerCase().replace(/\s+/g, '-'),
      service_title: title
    });
  };

  const handleFeatureHover = (feature: string) => {
    track('Service_Feature_Hovered', { 
      service: serviceId || title.toLowerCase().replace(/\s+/g, '-'),
      feature: feature
    });
  };

  const handleCTAClick = () => {
    track('Service_CTA_Clicked', { 
      service: serviceId || title.toLowerCase().replace(/\s+/g, '-'),
      cta_text: 'Začať projekt'
    });
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <Card 
      className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 ease-out cursor-pointer transform hover:-translate-y-3 hover:scale-105 h-full flex flex-col group hover:border-blue-200/50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleServiceCardClick}
    >
      <CardHeader className="space-y-4 flex flex-col p-6">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-3 shadow-lg",
          backgroundColor,
          hoverBackgroundColor
        )}>
          <Icon className={cn("h-6 w-6 transition-all duration-500 group-hover:scale-110", iconColor)} />
        </div>
        <CardTitle className="text-lg leading-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300 min-h-[3rem]">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600 text-sm leading-relaxed flex-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6 pt-0">
        <div className="space-y-2 flex-1 mb-4">
          {features.map((feature, index) => {
            const FeatureIcon = featureIcons[index]
            return (
              <div 
                key={feature} 
                className="flex items-center space-x-2 group/feature"
                onMouseEnter={() => handleFeatureHover(feature)}
              >
                <FeatureIcon className="h-4 w-4 text-slate-400 group-hover/feature:text-blue-500 transition-colors duration-300" />
                <span className="text-sm text-slate-600 group-hover/feature:text-slate-800 transition-colors duration-300">{feature}</span>
              </div>
            )
          })}
        </div>
        <Button 
          variant="outline" 
          className="w-full bg-white/70 backdrop-blur-sm text-slate-700 border-white/40 hover:text-white hover:border-transparent text-sm sm:text-base transform hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl mt-auto relative overflow-hidden group"
          onClick={handleCTAClick}
        >
          <span className="relative z-10 transition-all duration-300">Začať projekt</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </Button>
      </CardContent>
    </Card>
  )
} 