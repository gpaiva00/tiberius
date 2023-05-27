import classNames from 'classnames'

import { Card, CardContentContainer, Divider, ProgressBar } from '@/shared/components'

import Footer from '@/pages/list/components/ListFooter'

import { DEFAULT_ICON_PROPS } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'

import { DotsSixVertical, List, TrashSimple } from '@phosphor-icons/react'

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
      },
      {
        id: 'demo-item-id-2',
        text: 'criar minha conta',
        completed: false,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'demo-item-id-3',
        text: 'criar minha primeira lista',
        completed: false,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'demo-item-id-4',
        text: 'ser feliz :)',
        completed: false,
        updatedAt: new Date().toISOString(),
      },
    ],
    position: 0,
    type: ListTypesProps.DEFAULT,
    createdAt: new Date().toISOString(),
  }

  return (
    <Card size="demo">
      <header className="flex h-16 items-center gap-2 rounded-t-default px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center justify-center">
            <div className="icon-button">
              <List {...DEFAULT_ICON_PROPS} />
            </div>
            <h1 className="ml-4 text-2xl font-black dark:text-darkTextLight">para hoje</h1>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="max-w-[15.625rem] truncate text-xl text-primary hover:underline dark:text-darkPrimary">
              {demoList.name}
            </div>
            <ProgressBar items={demoList.items} />
          </div>
        </div>
      </header>
      <Divider />

      <CardContentContainer>
        {demoList.items.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-row items-center p-4">
              <div className="flex gap-1">
                <DotsSixVertical
                  className="cursor-grab text-lightenGray dark:text-darkTextLight"
                  {...DEFAULT_ICON_PROPS}
                />
                <input
                  className="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-default border-default border-lightenGray outline-none transition-all checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.315rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                />
              </div>
              <div className="mx-4 flex flex-1">
                <label
                  className={classNames('select-text font-light transition-all dark:text-darkTextLight', {
                    'text-gray line-through opacity-30 hover:line-through': item.completed,
                  })}
                  onDoubleClick={() => {}}
                >
                  {item.text}
                </label>
              </div>
              <div className="flex">
                <button
                  className="icon-button"
                  onClick={() => {}}
                >
                  <TrashSimple {...DEFAULT_ICON_PROPS} />
                </button>
              </div>
            </div>
            {index !== demoList.items.length - 1 && <Divider />}
          </div>
        ))}
      </CardContentContainer>

      <Footer
        handleAddItem={() => {}}
        editingItemText={''}
      />
    </Card>
  )
}
