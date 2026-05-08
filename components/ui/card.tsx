import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-none",
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = "Card"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

export { Card, CardContent }
