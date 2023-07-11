import { Divider } from '@/shared/components'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
interface ModalProps {
  isOpen: boolean
  toggleDialog: () => void
  children: React.ReactNode
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default'
}

export default function Modal({
  isOpen,
  size = 'default',
  toggleDialog,
  title,
  subtitle,
  children,
}: ModalProps) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={toggleDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-80" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'w-full transform overflow-hidden rounded-default bg-white text-left align-middle shadow-xl transition-all dark:bg-darkCardBackground',
                  {
                    'max-w-lg': size === 'default',
                    'max-w-2xl': size === 'xl',
                  }
                )}
              >
                <Dialog.Title
                  as="h3"
                  className="default-header flex-col items-start"
                >
                  <h1 className="font-bold capitalize dark:text-darkTextLight">{title}</h1>
                  {subtitle && <p className="text-xs font-light text-lightenGray">{subtitle}</p>}
                </Dialog.Title>
                <Divider />
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
