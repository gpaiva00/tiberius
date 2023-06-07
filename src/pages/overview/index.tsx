import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import { CardContentContainer, Divider, MainCard, SimpleCard } from '@/shared/components'
import Task from '@/shared/components/Task'

import { DEFAULT_ICON_PROPS, LIST_ROUTE, QUOTES } from '@/consts'
import { useAuth, useList, useTask } from '@/hooks'
import { TodaysTaskProps } from '@/hooks/useTask'
import { getGreetings } from '@/pages/overview/utils/getGreetings'
import { ListProps } from '@/typings/List'
import { getRandomQuote } from '@/utils'

import { GearSix } from '@phosphor-icons/react'

export default function Overview() {
  const { user } = useAuth()
  const { saveSelectedList } = useList()
  const { todayTasks } = useTask()
  const navigate = useNavigate()

  const handleClickOnTask = (task: TodaysTaskProps) => {
    saveSelectedList(task.selectedList as ListProps)
    navigate(LIST_ROUTE)
  }

  return (
    <MainCard
      title="Início"
      options={
        <Link
          to={''}
          className="icon-button"
        >
          <GearSix {...DEFAULT_ICON_PROPS} />
        </Link>
      }
    >
      <CardContentContainer className="gap-4 px-4 py-4">
        <h4 className="text-lg dark:text-darkTextLight">
          {`${getGreetings()}, ${user?.firstName}! Aqui está seu resumo:`}
        </h4>

        <SimpleCard className="max-h-96 overflow-y-scroll bg-lightGray pt-2 shadow-md">
          <h4 className="ml-4 pb-2 font-bold dark:text-darkTextLight">Para hoje</h4>
          {/* quotation */}
          {!todayTasks.length && (
            <div className="flex flex-1 items-center justify-center px-4 py-8 md:px-0">
              <div className="flex flex-col gap-4">
                <h4 className="text-center text-lightenGray">Por hoje é só!</h4>
                <p className="text-center italic text-lightenGray">{getRandomQuote(QUOTES)}</p>
              </div>
            </div>
          )}
          {todayTasks.map((task, index) => (
            <>
              <button
                onClick={() => handleClickOnTask(task)}
                className={classNames(
                  'w-full cursor-pointer text-start transition-all hover:bg-lightGray dark:hover:bg-darkInputBackground',
                  {
                    'rounded-b-default': index === todayTasks.length - 1,
                  }
                )}
              >
                <Task
                  task={task as TodaysTaskProps}
                  index={index}
                  key={task.id}
                />
              </button>
              {index !== todayTasks.length - 1 && <Divider />}
            </>
          ))}
        </SimpleCard>
      </CardContentContainer>
    </MainCard>
  )
}
