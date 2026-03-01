import { cn } from '@/lib/utils'
import React from 'react'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-5xl grid-cols-2 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'group/bento shadow-input row-span-1 flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-4 transition duration-200 hover:shadow-xl hover:border-border glass-effect',
        className,
      )}
    >
      <div className="min-h-0 flex-1 overflow-hidden">{header}</div>
      <div className="mt-2 flex min-h-0 max-h-[140px] shrink-0 flex-col overflow-hidden space-y-2 transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div title={typeof title === 'string' ? title : undefined} className="font-sans font-bold text-neutral-600 dark:text-neutral-200 line-clamp-1">
          {title}
        </div>
        <div className="min-h-0 overflow-y-auto font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  )
}
