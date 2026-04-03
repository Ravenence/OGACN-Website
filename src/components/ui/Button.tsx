import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md': variant === 'default',
            'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md': variant === 'destructive',
            'border-2 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300': variant === 'outline',
            'bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'secondary',
            'hover:bg-slate-100 hover:text-slate-900': variant === 'ghost',
            'text-teal-600 underline-offset-4 hover:underline': variant === 'link',
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-lg px-3': size === 'sm',
            'h-12 rounded-xl px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
