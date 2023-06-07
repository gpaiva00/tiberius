import { Badge, FormattedItemText } from '@/shared/components'
import classNames from 'classnames'

import { TodaysTaskProps } from '@/hooks/useTask'
import { TaskProps } from '@/typings/List'
import { getDayFromDateString, ifTextHasLink } from '@/utils'

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
}: TaskComponentProps) {
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
    >
      <div className={classNames('flex flex-row items-start py-4 pr-2', className)}>
        {/* checkbox */}
        {handleCompleteTask ? (
          <div className="mx-2 mt-1 flex md:mx-4">
            <div
              className="default-checkbox"
              onClick={() => handleCompleteTask(task)}
            />
          </div>
        ) : (
          <div className="mx-2 mt-1 flex md:mx-4" />
        )}
        {/* item text */}
        <div className="w-full">
          <div
            className={classNames('m-0 max-w-[92%] break-words p-0 dark:text-darkTextLight', {
              'break-all': ifTextHasLink(task.text),
            })}
          >
            {FormattedItemText(task.text)}
          </div>
          <div className="flex items-center gap-4">
            {/* schedule date */}
            {showScheduleDate && task.scheduleDate && handleClickOnScheduleDate && (
              <button onClick={handleClickOnScheduleDate}>
                <Badge
                  variant="primary"
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
              <small className="m-0 p-0 text-[0.5rem] text-lightenGray dark:text-darkTextGray md:text-[0.625rem]">
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
