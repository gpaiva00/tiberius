import { useNavigate } from 'react-router-dom'

import Task from '@/shared/components/Task'

import { LIST_ROUTE, QUOTES } from '@/constants'
import { useAppSettings, useAuth, useList, useTask } from '@/hooks'
import { TodaysTaskProps } from '@/hooks/useTask'
import { getGreetings } from '@/pages/overview/utils/getGreetings'
import { SimpleCard } from '@/shared/components'
import { ListProps } from '@/typings/List'
import { getRandomQuote } from '@/utils'

export default function Overview() {
  const { user } = useAuth()
  const { saveSelectedList } = useList()
  const { todayTasks } = useTask()
  const { textSize } = useAppSettings()
  const navigate = useNavigate()

  const handleClickOnTask = (task: TodaysTaskProps) => {
    saveSelectedList(task.selectedList as ListProps)
    navigate(LIST_ROUTE)
  }

  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center justify-between px-4">
        <h1 className="default-header-title">Hoje</h1>
      </div>
      {/* content container */}
      <div className="min-h-[350px] w-full overflow-y-scroll rounded-default bg-white p-2 dark:bg-darkCardBackground md:p-4">
        <h4 className="py-2 text-lg dark:text-darkTextLight">
          {`${getGreetings()}, ${user?.firstName}! Aqui está seu resumo:`}
        </h4>
        {/* today's tasks */}
        <div className="max-h-96 overflow-y-scroll pt-2">
          {/* quotation */}
          {!todayTasks.length && (
            <div className="flex flex-1 items-center justify-center px-4 py-8 md:px-0">
              <div className="flex flex-col gap-4">
                <h4 className="text-center text-lightenGray">Por hoje é só!</h4>
                <p className="text-center italic text-lightenGray">{getRandomQuote(QUOTES)}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {todayTasks.map((task, index) => (
              <Task
                onClick={() => handleClickOnTask(task)}
                className="w-full cursor-pointer rounded-default border border-lightGray text-start transition-colors dark:border-gray"
                task={task as TodaysTaskProps}
                index={index}
                key={task.id}
              />
            ))}
          </div>
        </div>

        {/* your performance */}
        <div className="max-h-96 overflow-y-scroll pt-6">
          <div className="flex items-center gap-4">
            <h4 className="py-2 text-lg dark:text-darkTextLight">Seu desempenho</h4>
            <select>
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
              <option value="year">Este ano</option>
            </select>
          </div>
          {/* TODO:  yarn add react-charts@beta */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* tasks created x tasks completed */}
            <SimpleCard>created vs completed</SimpleCard>

            {/* average time */}
            <SimpleCard>created vs completed</SimpleCard>
          </div>
        </div>
      </div>
    </>
  )
}
