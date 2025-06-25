import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { LogoProps } from "@/lib/types"

export const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  variant = "default",
  showText = false,
  className,
  onClick
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10",
    xl: "h-12 w-12"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg",
    xl: "text-xl"
  }

  const getLogoSrc = () => {
    switch (variant) {
      case "minimal":
        return "/2.png"  // čierne logo pre minimálny variant
      default:
        return "/1.png"  // biele logo pre modré pozadie
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case "minimal":
        return "text-slate-600"
      default:
        return "text-white"
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    const logoContainer = e.currentTarget;
    const logoImg = logoContainer.querySelector('img');
    const rect = logoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    
    // Podsvietenie pozadia
    logoContainer.style.background = `radial-gradient(200px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.15), transparent 60%)`;
    
    // Farebný efekt na samotný obrázok
    if (logoImg) {
      const strength = Math.min(1, Math.max(0, 1 - Math.sqrt(Math.pow(lightX - 50, 2) + Math.pow(lightY - 50, 2)) / 50));
      const hue = lightX < 50 ? 200 : 260; // modrá vs fialová
      logoImg.style.filter = `hue-rotate(${hue}deg) saturate(${1 + strength * 2}) brightness(${1 + strength * 0.3})`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    const logoContainer = e.currentTarget;
    const logoImg = logoContainer.querySelector('img');
    logoContainer.style.background = '';
    if (logoImg) {
      logoImg.style.filter = '';
    }
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center transition-all duration-500 cursor-pointer relative overflow-hidden",
        "hover:scale-110 hover:rotate-3 hover:shadow-xl",
        showText ? "flex-col space-y-2" : "justify-center",
        onClick && "hover:opacity-95"
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        className
      )}>
        <Image
          src={getLogoSrc()}
          alt="Lemhauz Logo"
          width={200}
          height={200}
          className={cn(
            "object-contain transition-all duration-500",
            sizeClasses[size]
          )}
        />
      </div>
      {showText && (
        <span className={cn(
          "tracking-tight",
          textSizeClasses[size],
          getTextColor()
        )}>
          LEMHAUZ
        </span>
      )}
    </div>
  )
} 