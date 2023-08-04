import classNames from 'classnames'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'default' | 'alert' | string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex h-5 items-center justify-center gap-1 rounded-full px-[0.5rem] text-xs dark:border-zinc-700',
        {
          'bg-lightenPrimary text-blue-500 dark:bg-zinc-500 dark:text-blue-500':
            variant === 'primary',
          'border-default border-gray-200 bg-white text-gray-500 dark:bg-zinc-800 dark:text-gray-300':
            variant === 'default',
          'bg-red-200 text-red-500 dark:bg-red-100 dark:text-red-600': variant === 'danger',
          'bg-yellow-200 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800':
            variant === 'alert',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
