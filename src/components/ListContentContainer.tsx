interface ListContentContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

export function ListContentContainer({ children }: ListContentContainerProps) {
  return <div className="flex h-listBody flex-1 flex-col overflow-y-scroll bg-white pb-4">{children}</div>
}
