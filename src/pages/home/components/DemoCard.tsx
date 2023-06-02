import classNames from 'classnames'

import { MainCard, CardContentContainer, Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'

import { Check, DotsThree } from '@phosphor-icons/react'

export default function DemoCard() {
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
        completed: false,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
      {
        id: 'demo-item-id-3',
        text: 'criar minha primeira lista',
        completed: false,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
      {
        id: 'demo-item-id-4',
        text: 'ser feliz :)',
        completed: false,
        updatedAt: new Date().toISOString(),
        markColor: '',
      },
    ],
    position: 0,
    type: ListTypesProps.DEFAULT,
    createdAt: new Date().toISOString(),
  }

  return (
    <MainCard size="demo">
      <header className="default-header">
        <h1 className="default-header-title">Para hoje</h1>
      </header>
      <Divider />

      <CardContentContainer>
        {demoList.items.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-row items-center p-4">
              <div className="default-checkbox checkbox-checked">
                <Check
                  weight="bold"
                  size={15}
                />
              </div>
              <div className="mx-4 flex flex-1">
                <label
                  className={classNames(
                    'select-text font-light transition-all dark:text-darkTextLight',
                    {
                      'text-gray line-through opacity-30 hover:line-through': item.completed,
                    }
                  )}
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
    </MainCard>
  )
}
