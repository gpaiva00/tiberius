import classNames from 'classnames'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'demo' | 'lg'
}

export default function Card({ children, size = 'lg', ...props }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'flex flex-col border-default bg-white dark:border-dark dark:bg-darkCardBackground dark:shadow-none md:rounded-default md:shadow-default dark:md:shadow-none',
        {
          'h-screen w-full md:h-72 md:w-72': size === 'sm',
          'h-screen w-full md:h-[37.5rem] md:w-[46.875rem]': size === 'lg',
          'h-[25rem] w-[25rem]': size === 'demo',
        },
        props.className
      )}
    >
      {children}
    </div>
  )
}
