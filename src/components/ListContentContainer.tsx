export function ListContentContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col pb-4 h-listBody overflow-y-scroll bg-white">{children}</div>
}
