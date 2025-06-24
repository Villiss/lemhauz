import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import type { ReferenceCardProps } from "@/lib/types"

export function ReferenceCard({ name, testimonial }: ReferenceCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Len dynamické podsvittenie s purple tónom
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    
    card.style.background = `radial-gradient(600px circle at ${lightX}% ${lightY}%, rgba(147, 51, 234, 0.12), transparent 40%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = '';
  };

  return (
    <Card 
      className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 h-full group hover:border-purple-200/50 transform hover:-translate-y-2 hover:scale-105"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Testimonial */}
        <div className="flex-1 mb-6">
          <Quote className="h-5 w-5 text-blue-500 mb-3 transition-all duration-300 group-hover:text-purple-500 group-hover:scale-110" />
          <p className="text-slate-700 leading-relaxed italic text-lg group-hover:text-slate-800 transition-colors duration-300">
            "{testimonial}"
          </p>
        </div>

        {/* Author */}
        <div className="border-t border-white/30 pt-4">
          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{name}</p>
        </div>
      </CardContent>
    </Card>
  )
} 