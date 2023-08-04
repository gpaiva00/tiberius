import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import {
  CompletedItemsCount,
  Divider,
  FormattedItemText,
  InputTextWithFormatting,
  Task,
} from '@/shared/components'
import Modal from '@/shared/components/Modal'

import {
  CONGRATS_EMOJIS,
  DEFAULT_ICON_PROPS,
  DEFAULT_TOAST_PROPS,
  ITEM_COMPLETED_MESSAGES,
  LIST_COMPLETED_MESSAGES,
  LIST_SETTINGS_ROUTE,
  QUOTES,
  SCHEDULE_LIMIT,
  TASK_CHAR_LIMIT,
} from '@/constants'
import { useAppSettings, useList, useTask } from '@/hooks'
import {
  copyToClipboard,
  getDayFromDateString,
  getInputLength,
  getRandomQuote,
  ifTextHasLink,
  isTextInputEmpty,
} from '@/utils'
import { ListProps, ListTypesProps, TaskMarksProps, TaskProps } from '@typings/List'

import {
  Archive,
  CalendarBlank,
  CaretCircleRight,
  CaretRight,
  Check,
  Copy,
  CursorText,
  DotsThree,
  FunnelSimple,
  GearSix,
  ListBullets,
  PencilSimple,
  Plus,
  TrashSimple,
} from '@phosphor-icons/react'

import { CompletedTaskStyleProps } from '@/hooks/useAppSettings'
import TaskEditable from '@/shared/components/TaskEditable'
import 'react-datepicker/dist/react-datepicker.css'

enum Modals {
  MOVE_TASK = 'MOVE_TASK',
  CREATE_TASK = 'CREATE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  SCHEDULE_TASK = 'SCHEDULE_TASK',
  NONE = 'NONE',
}

export default function List() {
  const [editingTask, setEditingTask] = useState<TaskProps | null>(null)
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TaskProps | null>(null)
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)

  const [currentModal, setCurrentModal] = useState<Modals>(Modals.NONE)

  const { selectedList, updateList, lists, isListCompleted, sortedTasks } = useList()
  const { moveTask, todayTasks, updateTask, duplicateTask, completeTask } = useTask()
  const { textSize, completedTaskStyle } = useAppSettings()

  const listRef = useRef<HTMLDivElement>(null)
  const isListCompletedRef = useRef(isListCompleted)
  const [parent] = useAutoAnimate()

  const quoteMessage = useMemo(() => getRandomQuote(QUOTES), [])

  const handleClickOnCreateTask = () => {
    setEditingTask({
      id: uuidv4(),
      text: '',
      markColor: '',
      completed: false,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      scheduleDate: '',
    })
  }

  const handleClickOnDeleteTask = async (task: TaskProps) => {
    const prompt = window.confirm('Tem certeza que deseja excluir esta tarefa?')

    if (!prompt) return

    const updatedItems = selectedList?.items.filter((selectedTask) => selectedTask.id !== task.id)
    const updatedList: ListProps = {
      ...(selectedList as ListProps),
      items: updatedItems as TaskProps[],
    }

    await updateList(updatedList)
  }

  const handleCompleteTask = async (task: TaskProps) => {
    completeTask(task, (isCompleted) => {
      if (isCompleted) {
        const toastMessage = isListCompletedRef.current
          ? getRandomQuote(LIST_COMPLETED_MESSAGES)
          : getRandomQuote(ITEM_COMPLETED_MESSAGES)
        toast(toastMessage, {
          icon: getRandomQuote(CONGRATS_EMOJIS),
          ...DEFAULT_TOAST_PROPS,
          duration: 6000,
        })
      }
    })
  }

  async function handleSaveTask() {
    const newTasks = [...(selectedList?.items as TaskProps[])]

    if (isEditingTask) {
      const oldTaskIndex = selectedList?.items.findIndex(
        (task) => task.id === editingTask?.id
      ) as number

      newTasks[oldTaskIndex] = editingTask as TaskProps
    } else {
      newTasks.push(editingTask as TaskProps)
    }

    await updateList({
      ...(selectedList as ListProps),
      items: newTasks,
    } as ListProps)

    setCurrentModal(Modals.NONE)
    setEditingTask(null)
    setIsEditingTask(false)
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const handleMarkTask = async (task: TaskProps, markOption: TaskMarksProps) => {
    await updateTask({
      ...task,
      markColor: markOption === task.markColor ? '' : markOption,
    })
  }

  const handleKeyDownCreateTaskInput = (event: any) => {
    const textLength = event.target.textContent.length

    if (textLength === TASK_CHAR_LIMIT && event.key !== 'Backspace') event.preventDefault()

    if (event.key === 'Enter' && event.metaKey) {
      handleSaveTask()
    }
  }

  const handleScheduleTask = async (task: TaskProps | null) => {
    if (!task) return

    if (todayTasks.length === SCHEDULE_LIMIT) {
      toast(
        'O limite de 7 tarefas agendadas por dia foi atingido. Tente completar alguma tarefa ou agendar para outro dia.',
        {
          icon: '⚠️',
          duration: 6000,
        }
      )
      return
    }

    await updateTask(task)
    setCurrentModal(Modals.NONE)
    toast('Tarefa agendada com sucesso!', {
      icon: '👏',
    })
  }

  function handleClearCompletedTasks() {
    const prompt = window.confirm('Tem certeza que deseja excluir todas as tarefas concluídas?')

    if (!prompt) return

    const updatedItems = selectedList?.items.filter((task) => !task.completed)
    const updatedList: ListProps = {
      ...(selectedList as ListProps),
      items: updatedItems as TaskProps[],
    }

    updateList(updatedList)
  }

  function toggleShowCompletedTasks() {
    setShowCompletedTasks(!showCompletedTasks)
  }

  const handleOnDropItem = async (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault()
    event.currentTarget.classList.remove('drag-over')

    const dragIndex = Number(event.dataTransfer.getData('text/plain'))
    const newNotCompletedItems = [...(sortedTasks?.notCompleted as TaskProps[])]
    const [draggedItem] = newNotCompletedItems.splice(dragIndex, 1)

    newNotCompletedItems.splice(index, 0, draggedItem)

    await updateList({
      ...(selectedList as ListProps),
      items: [...newNotCompletedItems, ...(sortedTasks?.completed as TaskProps[])],
    })
  }
  // TODO: create a component for this
  const ITEM_OPTIONS = (task: TaskProps) => [
    {
      text: 'Renomear',
      icon: (
        <PencilSimple
          className="dark:text-gray-300"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => {
        setEditingTask({
          ...task,
          updatedAt: new Date().toISOString(),
        })

        setIsEditingTask(true)
        // setCurrentModal(Modals.EDIT_TASK)
      },
    },
    {
      text: 'Excluir',
      icon: (
        <TrashSimple
          className="dark:text-gray-300"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => handleClickOnDeleteTask(task),
    },
    {
      text: 'Agendar',
      icon: (
        <CalendarBlank
          className="dark:text-gray-300"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => {
        setSelectedItem({
          ...task,
          scheduleDate: task.scheduleDate || new Date().toLocaleDateString(),
        })
        setCurrentModal(Modals.SCHEDULE_TASK)
      },
    },
    {
      text: 'Copiar',
      icon: (
        <CursorText
          className="dark:text-gray-300"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => copyToClipboard(task.text),
    },
    {
      text: 'Duplicar',
      icon: (
        <Copy
          className="dark:text-gray-300"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => duplicateTask(task),
    },
    {
      text: 'Mover',
      icon: (
        <ListBullets
          className="dark:text-gray-300"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => {
        setCurrentModal(Modals.MOVE_TASK)
        setSelectedItem(task)
      },
    },
  ]
  // TODO: create a component for this
  const MARK_OPTIONS = (task: TaskProps) => [
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-green-400 transition-all hover:bg-green-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-gray-200': task?.markColor === 'green',
              'opacity-25': task?.markColor && task?.markColor !== 'green',
            }
          )}
        />
      ),
      action: () => handleMarkTask(task, 'green'),
    },
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-yellow-400 transition-all hover:bg-yellow-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-gray-200': task?.markColor === 'yellow',
              'opacity-25': task?.markColor && task?.markColor !== 'yellow',
            }
          )}
        />
      ),
      action: () => handleMarkTask(task, 'yellow'),
    },
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-rose-400 transition-all hover:bg-rose-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-gray-200': task?.markColor === 'red',
              'opacity-25': task?.markColor && task?.markColor !== 'red',
            }
          )}
        />
      ),
      action: () => handleMarkTask(task, 'red'),
    },
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-blue-400 transition-all hover:bg-blue-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-gray-200': task?.markColor === 'blue',
              'opacity-25': task?.markColor && task?.markColor !== 'blue',
            }
          )}
        />
      ),
      action: () => handleMarkTask(task, 'blue'),
    },
  ]

  useEffect(() => {
    isListCompletedRef.current = isListCompleted
  }, [isListCompleted])

  return (
    <>
      {isListCompleted && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
      {/* title container */}
      <div className="mb-2 flex w-full items-center justify-between px-4">
        <div className="flex w-full items-center gap-2">
          <h1 className="default-header-title max-w-xs truncate">
            {FormattedItemText(
              selectedList?.type === 'default' ? selectedList?.name : 'Itens gerais'
            )}
          </h1>
          <CompletedItemsCount items={selectedList?.items || []} />
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={handleClickOnCreateTask}
            className="icon-button"
          >
            <Plus {...DEFAULT_ICON_PROPS} />
          </button>
          <button
            className="icon-button"
            onClick={() => alert('Esta funcionalidade chegará em breve. 🙏')}
          >
            <FunnelSimple {...DEFAULT_ICON_PROPS} />
          </button>
          <Link
            to={LIST_SETTINGS_ROUTE}
            className="icon-button"
          >
            <GearSix {...DEFAULT_ICON_PROPS} />
          </Link>
        </div>
      </div>
      {/* content container */}
      <div className="w-full overflow-y-scroll rounded-default">
        {/* quotation */}
        {!selectedList?.items?.length && !editingTask && (
          <div className="mt-20 flex flex-1 items-center justify-center">
            <p className="italic text-gray-500">{quoteMessage}</p>
          </div>
        )}
        {/* tasks */}
        <div
          ref={parent}
          className="flex flex-col gap-2 pb-4"
        >
          {/* editable task when creating */}
          {editingTask && !isEditingTask && (
            <TaskEditable
              task={editingTask}
              setEditingTask={setEditingTask}
              index={0}
              handleCompleteTask={handleCompleteTask}
              listRef={listRef}
              handleKeyDownCreateTaskInput={handleKeyDownCreateTaskInput}
              handleSaveTask={handleSaveTask}
            />
          )}
          {sortedTasks.notCompleted.map((task: TaskProps, index: number) => {
            const currentTaskIsEditing = isEditingTask && editingTask?.id === task.id
            // replace current task with editable task if it's editing
            if (currentTaskIsEditing) {
              return (
                <TaskEditable
                  task={editingTask}
                  setEditingTask={setEditingTask}
                  index={index}
                  handleCompleteTask={handleCompleteTask}
                  listRef={listRef}
                  handleKeyDownCreateTaskInput={handleKeyDownCreateTaskInput}
                  handleSaveTask={handleSaveTask}
                  key={task.id}
                />
              )
            } else {
              return (
                <Task
                  task={task}
                  index={index}
                  handleCompleteTask={handleCompleteTask}
                  handleOnDropItem={handleOnDropItem}
                  handleClickOnScheduleDate={() => {
                    setSelectedItem({
                      ...task,
                      scheduleDate: task.scheduleDate || new Date().toLocaleDateString(),
                    })
                    setCurrentModal(Modals.SCHEDULE_TASK)
                  }}
                  listRef={listRef}
                  key={task.id}
                  showScheduleDate
                  options={
                    <Menu
                      as="div"
                      className="relative inline-block outline-none ring-0 focus:ring-0"
                    >
                      <Menu.Button className="inline-flex">
                        <button className="icon-button hover:bg-zinc-300 dark:hover:bg-zinc-600">
                          <DotsThree {...DEFAULT_ICON_PROPS} />
                        </button>
                      </Menu.Button>
                      <Menu.Items className="menu-items w-[150px]">
                        {ITEM_OPTIONS(task).map((option, index) => (
                          <Menu.Item key={index}>
                            <button
                              className="popover-button"
                              onClick={option.action}
                            >
                              {option.icon}
                              {option.text}
                            </button>
                          </Menu.Item>
                        ))}
                        <Menu.Items className="mt-2">
                          <Divider />
                          <div className="flex w-full items-center justify-between pt-3">
                            {MARK_OPTIONS(task).map((option, index) => (
                              <Menu.Item key={index}>
                                <button onClick={option.action}>{option.mark}</button>
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Menu.Items>
                    </Menu>
                  }
                />
              )
            }
          })}
        </div>
        {/* completed tasks container */}
        {sortedTasks.completed.length > 0 && (
          <div className="sticky bottom-0 flex items-center justify-between rounded-default bg-zinc-300 px-2 py-2 dark:bg-zinc-700 md:px-4">
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={toggleShowCompletedTasks}
            >
              <CaretCircleRight
                {...DEFAULT_ICON_PROPS}
                className={classNames('dark:text-gray-300', {
                  'rotate-90 transform duration-150': showCompletedTasks,
                  'rotate-0 transform duration-150': !showCompletedTasks,
                })}
              />
              <h2 className="text-sm font-bold hover:underline dark:text-gray-300 md:text-base">
                {sortedTasks.completed.length}{' '}
                {sortedTasks.completed.length === 1 ? 'concluído' : 'concluídas'}
              </h2>
            </div>
            <button
              onClick={handleClearCompletedTasks}
              className="icon-button dark:hover:bg-zinc-600"
            >
              <TrashSimple {...DEFAULT_ICON_PROPS} />
            </button>
          </div>
        )}
        {/* completed tasks */}
        <div ref={parent}>
          <div
            className={classNames({
              'h-0 overflow-hidden opacity-0 transition-[opacity]': !showCompletedTasks,
              'h-auto opacity-100 transition-[opacity]': showCompletedTasks,
            })}
          >
            {sortedTasks.completed.map((task: TaskProps, index: number) => (
              <div key={task.id}>
                <div className="flex flex-row items-start py-2 pr-2">
                  {/* checkbox */}
                  <div className="mx-2 mt-1 flex md:mx-4">
                    <div
                      className="default-checkbox checkbox-checked"
                      onClick={() => handleCompleteTask(task)}
                    >
                      <Check
                        weight="bold"
                        size={13}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div
                      className={classNames(
                        'm-0 max-w-[92%] select-text break-words p-0 opacity-90',
                        {
                          'break-all': ifTextHasLink(task.text),
                          'text-gray-200 dark:text-gray-300':
                            completedTaskStyle === CompletedTaskStyleProps.GRAY,
                          'text-gray-200 line-through dark:text-gray-300':
                            completedTaskStyle === CompletedTaskStyleProps.GRAY_AND_STROKE,
                          'line-through dark:text-gray-300':
                            completedTaskStyle === CompletedTaskStyleProps.STROKE,
                        },
                        `text-${textSize}`
                      )}
                    >
                      {FormattedItemText(task.text)}
                    </div>
                    <small className="text-[0.5rem] text-gray-200 dark:text-gray-400 md:text-xs">
                      Feita {getDayFromDateString(task.completedAt as string)} às{' '}
                      {new Date(task.completedAt as string).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  </div>
                </div>
                {index !== sortedTasks.completed.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* modals */}
      {/* move task */}
      <Modal
        isOpen={currentModal === Modals.MOVE_TASK}
        toggleDialog={() => setCurrentModal(Modals.MOVE_TASK)}
        title="Mover tarefa para outra lista"
      >
        {/* body */}
        <div className="flex max-h-96 flex-col overflow-y-auto">
          {lists.map((list, index) => (
            <>
              <div
                key={index}
                className="flex flex-row items-center pl-4 pr-2 transition-all hover:bg-gray-200 dark:hover:bg-zinc-500"
              >
                <div
                  className="flex w-full cursor-pointer items-center gap-2 py-4"
                  onClick={() =>
                    moveTask({
                      item: selectedItem as TaskProps,
                      destinationList: list,
                      fallback: () => {
                        toast('Item movido com sucesso!', {
                          icon: '👏',
                        })
                        setCurrentModal(Modals.NONE)
                      },
                    })
                  }
                >
                  <h1 className="list-title">
                    {list.type === ListTypesProps.GENERAL && (
                      <Archive
                        {...DEFAULT_ICON_PROPS}
                        className="mr-1 md:mr-2"
                      />
                    )}
                    {FormattedItemText(list.name)}
                  </h1>
                </div>
                <CaretRight
                  {...DEFAULT_ICON_PROPS}
                  className="text-gray-200 dark:text-gray-200"
                />
              </div>
              {(index !== lists.length - 1 || list.type === ListTypesProps.GENERAL) && <Divider />}
            </>
          ))}
        </div>
        {/* buttons */}
        <div className="mt-4 flex items-center justify-center p-2">
          <button
            className="secondary-button max-w-md"
            onClick={() => {
              setCurrentModal(Modals.NONE)
              setSelectedItem(null)
            }}
          >
            Cancelar
          </button>
        </div>
      </Modal>
      {/* edit task description */}
      <Modal
        isOpen={currentModal === Modals.EDIT_TASK}
        toggleDialog={() => setCurrentModal(Modals.EDIT_TASK)}
        title="Editar descrição da tarefa"
        size="xl"
      >
        {/* body */}
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label className="default-label">Descrição</label>

            <InputTextWithFormatting
              inputTextValue={editingTask?.text || ''}
              setInputTextValue={(value) =>
                setEditingTask({
                  ...(editingTask as TaskProps),
                  text: value.trim(),
                })
              }
              placeholder="Descreva a tarefa..."
              handleOnKeyDown={handleKeyDownCreateTaskInput}
            />
            {/* character count */}
            <div className="flex w-full items-center justify-end gap-2">
              <span className="text-xs text-gray-200">
                {getInputLength(editingTask?.text || '')}/{TASK_CHAR_LIMIT}
              </span>
            </div>
          </div>
          {/* buttons */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              className="secondary-button"
              onClick={() => {
                setCurrentModal(Modals.NONE)
                setEditingTask(null)
                setIsEditingTask(false)
              }}
            >
              Cancelar
            </button>
            <button
              className="primary-button"
              disabled={isTextInputEmpty(editingTask?.text || '')}
              onClick={handleSaveTask}
            >
              Editar tarefa
            </button>
          </div>
        </div>
      </Modal>
      {/* create task */}
      <Modal
        isOpen={currentModal === Modals.CREATE_TASK}
        toggleDialog={() => setCurrentModal(Modals.CREATE_TASK)}
        title="Criar tarefa"
        size="xl"
      >
        {/* body */}
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label className="default-label">Descrição</label>

            <InputTextWithFormatting
              inputTextValue={editingTask?.text || ''}
              setInputTextValue={(value) => {
                setEditingTask({
                  ...(editingTask as TaskProps),
                  text: value.trim(),
                })
              }}
              placeholder="Descreva a tarefa..."
              handleOnKeyDown={handleKeyDownCreateTaskInput}
            />
            {/* character count */}
            <div className="flex w-full items-center justify-end gap-2">
              <span className="text-xs text-gray-200">
                {getInputLength(editingTask?.text || '')}/{TASK_CHAR_LIMIT}
              </span>
            </div>
          </div>
          {/* schedule task */}
          <div className="flex flex-col gap-2">
            <label className="default-label">Agendar</label>
            <DatePicker
              onChange={(date) =>
                setEditingTask({
                  ...(editingTask as TaskProps),
                  scheduleDate: date?.toLocaleDateString() || '',
                })
              }
              value={editingTask?.scheduleDate}
              startDate={new Date()}
              popperModifiers={[
                {
                  name: 'preventOverflow',
                  options: {
                    rootBoundary: 'viewport',
                    tether: false,
                    altAxis: true,
                  },
                },
              ]}
              minDate={new Date()}
              placeholderText="Escolha uma data para agendar sua tarefa"
              popperPlacement="top-start"
              isClearable
              fixedHeight
              withPortal
              portalId="root-portal"
              customInput={
                <input
                  className="default-input-text"
                  placeholder="Escolha uma data para agendar sua tarefa"
                />
              }
            />
          </div>
          {/* buttons */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              className="secondary-button"
              onClick={() => {
                setCurrentModal(Modals.NONE)
                setEditingTask(null)
                setIsEditingTask(false)
              }}
            >
              Cancelar
            </button>
            <button
              className="primary-button"
              disabled={isTextInputEmpty(editingTask?.text || '')}
              onClick={handleSaveTask}
            >
              Criar tarefa
            </button>
          </div>
        </div>
      </Modal>
      {/* schedule task */}
      <Modal
        title="Agendar tarefa"
        subtitle="Selecione a data para completar a tarefa."
        isOpen={currentModal === Modals.SCHEDULE_TASK}
        toggleDialog={() => setCurrentModal(Modals.SCHEDULE_TASK)}
      >
        <div className="flex flex-col gap-4 p-4">
          {/* body */}
          <div className="flex flex-col gap-2">
            <label className="default-label">Data</label>
            <DatePicker
              onChange={(date) =>
                setSelectedItem({
                  ...(selectedItem as TaskProps),
                  scheduleDate: date?.toISOString() || '',
                })
              }
              value={
                selectedItem?.scheduleDate
                  ? new Date(selectedItem.scheduleDate).toLocaleDateString()
                  : ''
              }
              startDate={new Date()}
              popperModifiers={[
                {
                  name: 'preventOverflow',
                  options: {
                    rootBoundary: 'viewport',
                    tether: true,
                    altAxis: true,
                  },
                },
              ]}
              minDate={new Date()}
              placeholderText="Escolha uma data para agendar sua tarefa"
              popperPlacement="top-start"
              isClearable
              fixedHeight
              withPortal
              portalId="root-portal"
              customInput={
                <input
                  className="default-input-text"
                  placeholder="Escolha uma data para agendar sua tarefa"
                />
              }
            />
          </div>
          {/* buttons */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              className="secondary-button"
              onClick={() => {
                setCurrentModal(Modals.NONE)
                setEditingTask(null)
              }}
            >
              Cancelar
            </button>
            <button
              className="primary-button"
              onClick={() => handleScheduleTask(selectedItem)}
            >
              Agendar tarefa
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
