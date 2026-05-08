import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-slate-300 bg-slate-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 dark:border-slate-600 dark:bg-slate-700",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className="pointer-events-none inline-block h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform duration-200 data-[state=checked]:translate-x-5"
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = "Switch"

export { Switch }
