import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalcButtonProps {
  children: ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "default";
  className?: string;
}

const CalcButton = ({ 
  children, 
  onClick, 
  color = "default", 
  className 
}: CalcButtonProps) => {
  const colorClasses = {
    primary: "bg-[#FF9500]",
    secondary: "bg-[#505050]",
    default: "bg-[#333333]"
  };
  
  return (
    <button
      className={cn(
        "calc-button h-16 sm:h-20 text-white text-xl sm:text-2xl font-medium transition-all duration-100 active:scale-95 active:opacity-80 select-none",
        colorClasses[color],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CalcButton;
