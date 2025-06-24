import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { FeatureGridProps, FeatureItem } from "@/lib/types"

export function FeatureGrid({ features, className }: FeatureGridProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      red: "bg-red-50 text-red-600 border-red-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200"
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Len dynamické podsvittenie
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    
    card.style.background = `radial-gradient(500px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.1), transparent 40%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = '';
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
      {features.map((feature, index) => {
        const Icon = feature.icon
        const colorClasses = getColorClasses(feature.color)
        
        return (
          <Card 
            key={index}
            className="border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 hover:scale-105 group hover:border-blue-200/50"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-125 group-hover:rotate-3 shadow-lg",
                  colorClasses
                )}>
                  <Icon className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 