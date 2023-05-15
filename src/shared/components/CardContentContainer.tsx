interface CardContentContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

export function CardContentContainer({ children }: CardContentContainerProps) {
  return (
    <div className="flex h-listBody flex-1 flex-col overflow-y-scroll bg-white pb-4 dark:bg-darkCardBackground">
      {children}
    </div>
  )
}
