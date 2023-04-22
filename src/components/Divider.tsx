import classNames from "classnames"

interface DividerProps {
  className?: string
}

export default function Divider({ className }: DividerProps) {
  return (
    <div className={classNames('border border-black', className)}></div>
  )
}