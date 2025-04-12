
import { useState } from "react";
import { Accessibility, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AccessibilityToggle = () => {
  const [fontSize, setFontSize] = useState(16); // Base font size in px
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24); // Max 24px
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 14); // Min 14px
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const resetFontSize = () => {
    setFontSize(16);
    document.documentElement.style.fontSize = "16px";
  };

  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    
    if (newState) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Accessibility options">
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={increaseFontSize}>
          <ZoomIn className="mr-2 h-4 w-4" />
          <span>Increase text size</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={decreaseFontSize}>
          <ZoomOut className="mr-2 h-4 w-4" />
          <span>Decrease text size</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={resetFontSize}>
          <span className="mr-2">Aa</span>
          <span>Reset text size</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleHighContrast}>
          <div className="mr-2 h-4 w-4 rounded border flex items-center justify-center">
            {highContrast && "✓"}
          </div>
          <span>High contrast</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
