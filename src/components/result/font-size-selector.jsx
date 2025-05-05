import { useState, useEffect } from "react";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContentStore } from "@/store/contentstore";

const fontSizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useContentStore();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <AlignJustify className="h-4 w-4" />
                <span className="sr-only">Font size</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end">
            {fontSizes.map((size) => (
              <DropdownMenuItem
                key={size.value}
                onClick={() => setFontSize(size.value)}
                className={fontSize === size.value ? 'bg-accent' : ''}
              >
                {size.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>Font size</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}