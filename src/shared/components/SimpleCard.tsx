import classNames from 'classnames'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'flex flex-col rounded-default border-default bg-white dark:border-dark dark:bg-darkCardBackground',
        className
      )}
    >
      {children}
    </div>
  )
}
