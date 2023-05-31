import Header from '@/pages/overview/components/OverviewHeader'
import { Card, CardContentContainer, Divider } from '@/shared/components'

import { useAuth } from '@/hooks'
import { getGreetings } from '@/pages/overview/utils/getGreetings'
import { Link } from 'react-router-dom'

export default function Overview() {
  const { user } = useAuth()

  return (
    <Card>
      <Header />
      <CardContentContainer className="gap-4 p-4">
        <h4 className="text-lg dark:text-darkTextLight">{`${getGreetings()}, ${
          user?.firstName
        }!`}</h4>

        <Card
          className="mt-4 gap-2 py-2 dark:bg-darkInputBackground"
          size="auto"
        >
          <h4 className="ml-4 text-lg font-black dark:text-darkTextLight">Para hoje, você tem:</h4>
          <div className="">
            {[1, 2, 3, 4, 5].map((item) => (
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
                {item !== 5 && <Divider />}
              </>
            ))}
          </div>
          <Link
            to={''}
            className="text-button ml-4"
          >
            Mostrar mais
          </Link>
        </Card>
      </CardContentContainer>
    </Card>
  )
}
