import classNames from 'classnames'

import { CardContentContainer, Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, SIGN_IN_ROUTE } from '@/constants'
import { ListProps, ListTypesProps } from '@/typings/List'

import { useAuth } from '@/hooks'
import { Check, DotsThree } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export default function DemoCard() {
  const { isLogged } = useAuth()

  const demoList: ListProps = {
    id: 'demo-list-id',
    name: 'lista de tarefas',
    userId: 'demo-user-id',
    items: [
      {
        id: 'demo-item-id-1',
        text: 'acessar o Tiberius',
        completed: true,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
      {
        id: 'demo-item-id-2',
        text: 'criar minha conta',
        completed: isLogged ? true : false,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
      {
        id: 'demo-item-id-3',
        text: 'criar minha primeira lista',
        completed: isLogged ? true : false,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
      {
        id: 'demo-item-id-4',
        text: 'ser feliz :)',
        completed: isLogged ? true : false,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
    ],
    position: 0,
    type: ListTypesProps.DEFAULT,
    createdAt: new Date().toISOString(),
  }

  return (
    <div className="relative flex h-[20rem] w-[25rem] flex-col overflow-hidden rounded-default border-default bg-white dark:border-dark-gray dark:bg-zinc-800">
      <header className="default-header py-2">
        <div className="flex w-full items-center gap-2">
          <h1 className="default-header-title max-w-xs truncate">Para hoje</h1>
        </div>
      </header>
      <Divider />
      <CardContentContainer>
        {demoList.items.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-row items-center p-4">
              <Link
                to={SIGN_IN_ROUTE}
                className={classNames('default-checkbox', {
                  'checkbox-checked': item.completed,
                })}
              >
                {item.completed && (
                  <Check
                    weight="bold"
                    size={15}
                  />
                )}
              </Link>
              <div className="mx-4 flex flex-1">
                <label
                  className={classNames('select-text transition-all dark:text-gray-300', {
                    'text-gray line-through opacity-30 hover:line-through': item.completed,
                  })}
                >
                  {item.text}
                </label>
              </div>
              <div className="flex">
                <div className="icon-button">
                  <DotsThree {...DEFAULT_ICON_PROPS} />
                </div>
              </div>
            </div>
            {index !== demoList.items.length - 1 && <Divider />}
          </div>
        ))}
      </CardContentContainer>
    </div>
  )
}
