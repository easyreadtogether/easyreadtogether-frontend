import { useState, useEffect } from "react";
import { LayoutIcon } from "lucide-react";
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

const layouts = [
  { value: 'image-left', label: 'Image Left' },
  { value: 'image-right', label: 'Image Right' },
  { value: 'image-top', label: 'Image Top' },
];

export function LayoutSelector() {
  const { contentLayout, setContentLayout } = useContentStore();
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
                <LayoutIcon className="h-4 w-4" />
                <span className="sr-only">Layout</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end">
            {layouts.map((layout) => (
              <DropdownMenuItem
                key={layout.value}
                onClick={() => setContentLayout(layout.value)}
                className={contentLayout === layout.value ? 'bg-accent' : ''}
              >
                {layout.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>Layout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}