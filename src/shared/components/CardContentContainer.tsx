import classNames from 'classnames'

interface CardContentContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

export function CardContentContainer({ children, className, ...props }: CardContentContainerProps) {
  return (
    <div
      className={classNames(
        'flex h-full flex-1 flex-col overflow-y-scroll rounded-b-default',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
