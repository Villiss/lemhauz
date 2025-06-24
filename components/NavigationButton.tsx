import type { NavigationButtonProps } from "@/lib/types"

export function NavigationButton({ 
  onClick, 
  children, 
  className = "",
  icon: Icon,
  variant = "desktop"
}: NavigationButtonProps) {
  const baseClasses = "focus:outline-none transition-all"
  
  if (variant === "mobile") {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center space-x-3 w-full p-3 text-left text-slate-600 hover:text-white rounded-xl cursor-pointer transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 hover:shadow-lg group relative overflow-hidden ${baseClasses} ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left rounded-xl"></div>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
        {Icon && <Icon className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-white relative z-10" />}
        <span className="font-medium relative z-10">{children}</span>
      </button>
    )
  }

  return (
    <button 
      onClick={onClick}
      className={`text-slate-600 hover:text-slate-900 transition-colors cursor-pointer ${baseClasses} ${className}`}
    >
      {children}
    </button>
  )
} 