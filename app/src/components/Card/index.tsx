import { cn } from '~/lib/utils'

import type { CardProps } from '~/types'

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        'p-6',
        'transition-all duration-300',
        'hover:shadow-xl hover:shadow-primary/10',
        'hover:-translate-y-1',
        'border-border/50',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
