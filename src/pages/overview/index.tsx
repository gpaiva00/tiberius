import { useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '@/pages/overview/components/OverviewHeader'
import {
  MainCard,
  CardContentContainer,
  CardWithTabBar,
  Divider,
  SimpleCard,
} from '@/shared/components'

import { useAuth } from '@/hooks'
import { getGreetings } from '@/pages/overview/utils/getGreetings'

export default function Overview() {
  const [showSidebar, setShowSidebar] = useState(false)
  const { user } = useAuth()

  const toggleSidebar = () => setShowSidebar(!showSidebar)

  return (
    <MainCard
      showSidebar={showSidebar}
      closeSidebar={toggleSidebar}
    >
      <Header openSidebar={toggleSidebar} />
      <CardContentContainer className="gap-4 p-4">
        <h4 className="ml-4 text-lg dark:text-darkTextLight">{`${getGreetings()}, ${
          user?.firstName
        }! Aqui está seu resumo:`}</h4>

        <SimpleCard className="p-2">
          <h4 className="ml-4 text-lg font-black dark:text-darkTextLight">Para hoje</h4>
          <div className="">
            {[1, 2, 3].map((item) => (
              <>
                <div className="flex flex-row items-start px-4 py-2">
                  {/* checkbox */}
                  <div className="mt-1 flex md:mr-4">
                    <div className="default-checkbox" />
                  </div>
                  <div className="w-full">
                    <div className="m-0 max-w-[92%] select-text break-words p-0 text-lightenGray dark:text-darkTextLight">
                      item {item}
                    </div>
                    <small className="text-[0.5rem] text-lightenGray opacity-90 dark:text-darkTextGray md:text-[0.625rem]">
                      atualizado 22/22/22 às 22:22
                    </small>
                  </div>
                </div>
                {item !== 3 && <Divider />}
              </>
            ))}
          </div>
          <Link
            to=""
            className="flex cursor-pointer rounded-b-default transition-all hover:bg-lightGray dark:hover:bg-opacity-10"
          >
            <span className="text-button ml-4 py-2">Mostrar mais</span>
          </Link>
        </SimpleCard>
      </CardContentContainer>
    </MainCard>
  )
}
