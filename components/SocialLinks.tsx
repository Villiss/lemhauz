import { Facebook, Instagram, Github } from "lucide-react"
import type { SocialLinksProps } from "@/lib/types"

const iconMap = {
  // Facebook,
  Instagram, 
  // Github
}

export function SocialLinks({ 
  links, 
  className = "flex justify-center space-x-4",
  linkClassName = "text-slate-400 hover:text-white transition-all duration-500 cursor-pointer transform hover:scale-110 hover:-translate-y-1 font-medium relative overflow-hidden group p-2 rounded-lg"
}: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap]
        return (
          <a 
            key={link.name}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={linkClassName}
            title={link.name}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100 rounded-lg"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
            <Icon className="h-5 w-5 relative z-10" />
          </a>
        )
      })}
    </div>
  )
} 