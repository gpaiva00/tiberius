import classNames from 'classnames'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'default'
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex h-5 items-center justify-center gap-1 rounded-full px-[0.5rem] text-[0.5rem] dark:border-dark md:text-[0.625rem]',
        {
          'bg-lightenPrimary text-primary dark:bg-darkBackgroundIconButton dark:text-darkPrimary':
            variant === 'primary',
          'border-default bg-white text-lightenGray dark:bg-darkInputBackground dark:text-darkTextGray':
            variant === 'default',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
