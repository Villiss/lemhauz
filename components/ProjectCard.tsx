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
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 ease-out md:transform md:hover:-translate-y-2 md:hover:shadow-2xl"
      onClick={handleClick}
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-cover md:transition-transform md:duration-500 md:group-hover:scale-110 rounded-2xl"
        unoptimized={!isExternalImage}
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";
        }}
      />
      {/* Solid caption bar, dark text — no gradient over the photo */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm p-4 rounded-b-2xl transition-colors duration-300 group-hover:bg-white">
        <h3 className="text-base font-semibold text-slate-900">
          {name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform md:translate-x-4 group-hover:translate-x-0">
        <ExternalLink className="h-4 w-4 text-blue-600" />
      </div>
    </div>
  )
}
