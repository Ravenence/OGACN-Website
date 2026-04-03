import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 shadow-sm",
        {
          'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80': variant === 'default',
          'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200': variant === 'secondary',
          'border-red-200 bg-red-100 text-red-800': variant === 'destructive',
          'border-amber-200 bg-amber-100 text-amber-800': variant === 'warning',
          'border-emerald-200 bg-emerald-100 text-emerald-800': variant === 'success',
          'text-slate-950 border-slate-300': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
