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
    const logo = e.currentTarget;
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    
    logo.style.background = `radial-gradient(200px circle at ${lightX}% ${lightY}%, rgba(59, 130, 246, 0.1), transparent 60%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    const logo = e.currentTarget;
    logo.style.background = '';
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center transition-all duration-200 cursor-pointer relative overflow-hidden",
        "hover:scale-105 hover:shadow-lg",
        showText ? "flex-col space-y-2" : "justify-center",
        onClick && "hover:opacity-90"
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
            "object-contain",
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