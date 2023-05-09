import classNames from 'classnames'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size: 'sm' | 'md' | 'lg'
}

export default function DefaultCard({ children, size = 'lg' }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'flex flex-col bg-white rounded-default border-default shadow-default',
        {
          'w-72 h-64': size === 'sm',
          'h-mainCard w-mainCard': size === 'lg',
        }
      )}
    >
      {children}
    </div>
  )
}
