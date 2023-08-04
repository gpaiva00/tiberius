import { InputTextWithFormatting } from '@/shared/components'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { TodaysTaskProps } from '@/hooks/useTask'
import { TaskProps } from '@/typings/List'
import { ifTextHasLink, isTextInputEmpty } from '@/utils'

import { DEFAULT_ICON_PROPS } from '@/constants'
import { useAppSettings } from '@/hooks'
import { TrashSimple } from '@phosphor-icons/react'

interface TaskComponentProps {
  task: TodaysTaskProps
  index: number
  handleOnDropItem?: (event: React.DragEvent<HTMLDivElement>, index: number) => void
  listRef?: React.RefObject<HTMLDivElement>
  handleCompleteTask?: (task: TaskProps) => void
  handleClickOnScheduleDate?: () => void
  setEditingTask: (task: TaskProps | null) => void
  handleKeyDownCreateTaskInput: (event: any) => void
  handleSaveTask: () => void
  options?: React.ReactNode
  showScheduleDate?: boolean
  className?: string
}

export default function Task({
  task,
  setEditingTask,
  index,
  handleOnDropItem,
  handleCompleteTask,
  listRef,
  options,
  showScheduleDate = false,
  className,
  handleClickOnScheduleDate,
  handleKeyDownCreateTaskInput,
  handleSaveTask,
  ...props
}: TaskComponentProps) {
  const { textSize } = useAppSettings()

  function handleBlur() {
    if (isTextInputEmpty(task.text)) return

    handleSaveTask()
    setEditingTask(null)
  }

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
          'flex flex-row items-center rounded-default bg-white p-2 transition-colors dark:bg-zinc-800',
          className
        )}
      >
        {/* item text */}
        <div
          className={classNames(
            'm-0 flex w-full break-words p-0 dark:text-gray-300',
            {
              'break-all': ifTextHasLink(task.text),
            },
            `text-${textSize}`
          )}
        >
          <InputTextWithFormatting
            inputTextValue={task?.text || ''}
            setInputTextValue={(value) => {
              setEditingTask({
                ...(task as TaskProps),
                text: value.trim(),
              })
            }}
            placeholder="Descreva a tarefa..."
            handleOnKeyDown={handleKeyDownCreateTaskInput}
            handleBlur={handleBlur}
          />
        </div>
        <div className="flex items-center justify-center px-2">
          <button
            onClick={() => {
              setEditingTask(null)
            }}
            className="icon-button dark:hover:bg-zinc-600"
          >
            <TrashSimple
              {...DEFAULT_ICON_PROPS}
              className="dark:text-gray-300"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
