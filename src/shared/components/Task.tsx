import { Badge, FormattedItemText } from '@/shared/components'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { TodaysTaskProps } from '@/hooks/useTask'
import { TaskProps } from '@/typings/List'
import { getDayFromDateString, ifTextHasLink } from '@/utils'

import { useAppSettings } from '@/hooks'
import { CalendarBlank } from '@phosphor-icons/react'

interface TaskComponentProps {
  task: TodaysTaskProps
  index: number
  handleOnDropItem?: (event: React.DragEvent<HTMLDivElement>, index: number) => void
  listRef?: React.RefObject<HTMLDivElement>
  handleCompleteTask?: (task: TaskProps) => void
  handleClickOnScheduleDate?: () => void
  options?: React.ReactNode
  showScheduleDate?: boolean
  className?: string
  onClick?: () => void
}

export default function Task({
  task,
  index,
  handleOnDropItem,
  handleCompleteTask,
  listRef,
  options,
  showScheduleDate = false,
  className,
  handleClickOnScheduleDate,
  ...props
}: TaskComponentProps) {
  const { textSize } = useAppSettings()

  return (
    <div
      key={task.id}
      draggable={!!listRef && !!handleOnDropItem}
      onDragStart={(event) => event.dataTransfer.setData('text/plain', index.toString())}
      onDragOver={(event) => {
        event.preventDefault()
        event.currentTarget.classList.add('drag-over')
      }}
      onDrop={(event) =>
        handleOnDropItem
          ? handleOnDropItem(event, index)
          : event.currentTarget.classList.remove('drag-over')
      }
      onDragLeave={(event) => event.currentTarget.classList.remove('drag-over')}
      ref={listRef}
      {...props}
    >
      <div
        className={twMerge(
          'flex flex-row items-start rounded-default bg-white py-2 pr-2 transition-colors hover:bg-gray-200/60 dark:bg-zinc-800 dark:hover:bg-zinc-700',
          className
        )}
      >
        {/* checkbox */}
        {handleCompleteTask && (
          <div className="mx-2 mt-1 flex md:mx-4">
            <div
              className="default-checkbox"
              onClick={() => handleCompleteTask(task)}
            />
          </div>
        )}
        {/* item text */}
        <div
          className={classNames('w-full', {
            'mx-4': !handleCompleteTask,
          })}
        >
          <div
            className={classNames(
              'm-0 max-w-[92%] break-words p-0 dark:text-gray-300',
              {
                'break-all': ifTextHasLink(task.text),
              },
              `text-${textSize}`
            )}
          >
            {FormattedItemText(task.text)}
          </div>
          {/* footer */}
          <div className="mt-2 flex items-end justify-start gap-4">
            {/* schedule date */}
            {showScheduleDate && task.scheduleDate && handleClickOnScheduleDate && (
              <button onClick={handleClickOnScheduleDate}>
                <Badge
                  variant={classNames({
                    danger: new Date(task.scheduleDate as string).getTime() < new Date().getTime(),
                    primary: new Date(task.scheduleDate as string).getTime() > new Date().getTime(),
                    // TODO: fix this
                    alert: new Date(task.scheduleDate as string).getTime() === new Date().getTime(),
                  })}
                  className="hover:underline"
                >
                  <CalendarBlank size={10} /> Agendada para{' '}
                  {getDayFromDateString(task.scheduleDate as string)}
                </Badge>
              </button>
            )}
            {/* selected list */}
            {task?.selectedList && (
              <Badge className="hover:underline">{FormattedItemText(task.selectedList.name)}</Badge>
            )}
            {/* updated at */}
            {task.updatedAt && (
              <small className="m-0 p-0 text-[0.5rem] text-gray-400 dark:text-gray-400 md:text-xs">
                Atualizada {getDayFromDateString(task.updatedAt as string)} às{' '}
                {new Date(task.updatedAt as string).toLocaleTimeString(navigator.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            )}
          </div>
        </div>
        {/* item option */}
        <div className="flex items-center gap-2">
          <div
            className={classNames('h-4 w-4 rounded-full transition-all', {
              'bg-green-400': task.markColor === 'green',
              'bg-yellow-400': task.markColor === 'yellow',
              'bg-rose-400': task.markColor === 'red',
              'bg-blue-400': task.markColor === 'blue',
              'bg-transparent': !task.markColor,
            })}
          />
          {options}
        </div>
      </div>
    </div>
  )
}
