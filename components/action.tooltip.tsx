import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
  children,
  label,
  align,
  side,
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-medium text-sm capitalize dark:text-white/90 text-zinc-800">
                        {label.toLocaleLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};
