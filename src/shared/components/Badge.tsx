import classNames from 'classnames'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'default'
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex h-5 items-center justify-center gap-1 rounded-full px-[0.5rem] text-xs dark:border-dark md:text-[0.625rem]',
        {
          'bg-lightenPrimary text-primary dark:bg-darkBackgroundIconButton dark:text-darkPrimary':
            variant === 'primary',
          'border-default bg-white text-lightenGray dark:bg-darkInputBackground dark:text-darkTextGray':
            variant === 'default',
          'bg-red-200 text-red-700 dark:bg-red-200 dark:text-red-800': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
