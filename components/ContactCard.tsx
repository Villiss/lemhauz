import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ContactCardProps } from "@/lib/types"

export function ContactCard({
  title,
  content,
  icon: Icon,
  backgroundColor,
  hoverBackgroundColor,
  href,
  className = "",
  isClickable = true
}: ContactCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Len dynamické podsvittenie s bielym tónom pre tmavé pozadie
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    
    card.style.background = `radial-gradient(400px circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.15), transparent 40%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = '';
  };

  const cardContent = (
    <Card 
      className={cn(
        "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out h-full group transform hover:scale-105 hover:-translate-y-2",
        isClickable && "cursor-pointer hover:border-white/40",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="p-6 text-center space-y-4">
        <div className={cn(
          "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-3 shadow-2xl relative overflow-hidden",
          backgroundColor,
          hoverBackgroundColor
        )}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <Icon className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-110 relative z-10" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return (
      <a href={href} className="block transform transition-transform duration-300 hover:scale-105">
        {cardContent}
      </a>
    )
  }

  return cardContent
} 