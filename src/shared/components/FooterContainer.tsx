import classNames from 'classnames'

interface FooterContainerProps {
  children: React.ReactNode
  className?: string
}

export function FooterContainer({ children, className }: FooterContainerProps) {
  return (
    <footer className={classNames('flex items-center rounded-b-default', className)}>
      {children}
    </footer>
  )
}
