import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ProjectCardProps } from "@/lib/types"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { track } from "@vercel/analytics"

export function ProjectCard({
  name,
  description,
  image,
  url
}: ProjectCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    card.style.background = `radial-gradient(600px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.15), transparent 40%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = '';
  };

  const handleClick = () => {
    track('Project_Card_Clicked', {
      project: name,
      url: url
    });
    window.open(url, '_blank');
  };

  // Check if image is a URL or local path
  const isExternalImage = image.startsWith('http://') || image.startsWith('https://');
  const imageSrc = isExternalImage ? image : `/${image}`;

  return (
    <Card
      className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 ease-out cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden group hover:border-blue-200/50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized={!isExternalImage}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <ExternalLink className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  )
}
