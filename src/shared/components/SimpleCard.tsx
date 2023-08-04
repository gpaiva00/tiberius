import classNames from 'classnames'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'w-full rounded-default border border-gray-200 px-4 py-2 text-start transition-colors dark:border-zinc-700',
        className
      )}
    >
      {children}
    </div>
  )
}
