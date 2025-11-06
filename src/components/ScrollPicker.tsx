import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollPickerProps {
  value: number;
  onChange: (value: number) => void;
  items: string[];
  className?: string;
}

const ScrollPicker = ({ value, onChange, items, className }: ScrollPickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 60;
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  
  // Create infinite scroll by repeating items multiple times
  const repeats = 5;
  const middleRepeat = Math.floor(repeats / 2);
  const infiniteItems = Array(repeats).fill(items).flat();
  
  useEffect(() => {
    if (scrollRef.current && !isScrolling.current) {
      // Find the value in the middle repeat
      const valueIndex = items.findIndex(item => parseInt(item) === value);
      const targetIndex = middleRepeat * items.length + valueIndex;
      scrollRef.current.scrollTop = targetIndex * itemHeight;
    }
  }, [value, items, itemHeight]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    isScrolling.current = true;
    clearTimeout(scrollTimeout.current);
    
    const scrollTop = scrollRef.current.scrollTop;
    const currentIndex = Math.round(scrollTop / itemHeight);
    const newValue = parseInt(infiniteItems[currentIndex]);
    
    if (newValue !== value) {
      onChange(newValue);
    }
    
    // After scrolling stops, check if we need to reset position
    scrollTimeout.current = setTimeout(() => {
      if (!scrollRef.current) return;
      
      const currentScrollTop = scrollRef.current.scrollTop;
      const currentIdx = Math.round(currentScrollTop / itemHeight);
      const localIndex = currentIdx % items.length;
      const currentRepeatSection = Math.floor(currentIdx / items.length);
      
      // If we're in the first or last repeat, reset to middle
      if (currentRepeatSection === 0 || currentRepeatSection === repeats - 1) {
        const newScrollTop = (middleRepeat * items.length + localIndex) * itemHeight;
        scrollRef.current.scrollTop = newScrollTop;
      }
      
      isScrolling.current = false;
    }, 150);
  };

  return (
    <div className={cn("relative h-48 overflow-hidden", className)}>
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      
      {/* Selection indicator */}
      <div className="absolute top-1/2 left-0 right-0 h-[60px] -translate-y-1/2 border-y-2 border-accent/30 bg-accent/5 z-[5] pointer-events-none rounded-lg" />
      
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory scroll-smooth"
        style={{ 
          scrollSnapType: 'y mandatory',
          scrollPaddingTop: `${itemHeight * 1.5}px`
        }}
      >
        {/* Top padding */}
        <div style={{ height: `${itemHeight * 1.5}px` }} />
        
        {/* Items - infinite scroll */}
        {infiniteItems.map((item, index) => {
          const itemValue = parseInt(item);
          const isSelected = itemValue === value;
          
          return (
            <div
              key={index}
              onClick={() => {
                onChange(itemValue);
                const localIndex = index % items.length;
                const targetIndex = middleRepeat * items.length + localIndex;
                if (scrollRef.current) {
                  scrollRef.current.scrollTop = targetIndex * itemHeight;
                }
              }}
              className={cn(
                "flex items-center justify-center transition-all duration-200 cursor-pointer snap-center",
                isSelected 
                  ? "text-foreground text-5xl font-semibold scale-110" 
                  : "text-muted-foreground text-3xl font-light opacity-50 hover:opacity-70"
              )}
              style={{ 
                height: `${itemHeight}px`,
                scrollSnapAlign: 'center'
              }}
            >
              {item}
            </div>
          );
        })}
        
        {/* Bottom padding */}
        <div style={{ height: `${itemHeight * 1.5}px` }} />
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default ScrollPicker;
