import classNames from 'classnames'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'w-full rounded-default border border-lightGray px-4 py-2 text-start transition-colors dark:border-gray',
        className
      )}
    >
      {children}
    </div>
  )
}
