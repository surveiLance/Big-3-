"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showTooltip?: boolean;
    tooltipContent?: (value: number) => React.ReactNode;
  }
>(({ className, showTooltip = false, tooltipContent, ...props }, ref) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (props.defaultValue as number[]) ?? (props.value as number[]) ?? [0],
  );

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    props.onValueChange?.(newValue);
  };

  const handlePointerDown = () => {
    if (showTooltip) setShowTooltipState(true);
  };

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) setShowTooltipState(false);
  }, [showTooltip]);

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUp);
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }
  }, [showTooltip, handlePointerUp]);

  const renderThumb = (value: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        className="block h-5 w-5 rounded-full border-2 border-[#d9ae64] bg-[#030404] shadow-lg transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#d9ae64]/40 data-[disabled]:cursor-not-allowed"
        onPointerDown={handlePointerDown}
      />
    );

    if (!showTooltip) return thumb;

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent sideOffset={10} side="top">
            <p>{tooltipContent ? tooltipContent(value) : value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className,
      )}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range className="absolute h-full bg-[#d9ae64]/60" />
      </SliderPrimitive.Track>
      {internalValue?.map((value, index) => (
        <React.Fragment key={index}>{renderThumb(value)}</React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
