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
      className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-500 ease-out md:transform md:hover:-translate-y-2 md:hover:shadow-2xl"
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform-none md:transform md:translate-x-4 md:group-hover:translate-x-0">
        <ExternalLink className="h-4 w-4 text-blue-600" />
      </div>
    </div>
  )
}
