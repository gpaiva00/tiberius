import { ListItemProps } from '@/typings/List'

interface ProgressBarProps {
  items: ListItemProps[]
}

export default function ProgressBar({ items }: ProgressBarProps) {
  const completedItems = items.filter((item) => item.completed).length || 0
  const progressPercentage = (completedItems / (items.length || 0)) * 100 || 0

  return (
    <div className="h-[0.125rem] w-20 rounded-default bg-lightGray dark:bg-darkBackgroundIconButton">
      <div
        className="h-[0.125rem] rounded-default bg-primary transition-all dark:bg-darkPrimary"
        style={{
          width: `${progressPercentage}%`,
        }}
      ></div>
    </div>
  )
}
