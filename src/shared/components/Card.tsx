import classNames from 'classnames'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'demo' | 'lg'
}

export default function Card({ children, size = 'lg', ...props }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'flex flex-col rounded-default border-default bg-white shadow-default dark:border-dark dark:bg-darkCardBackground dark:shadow-none',
        {
          'h-72 w-72': size === 'sm',
          'h-[37.5rem] w-[40.625rem]': size === 'lg',
          'h-[25rem] w-[25rem]': size === 'demo',
        },
        props.className
      )}
    >
      {children}
    </div>
  )
}
