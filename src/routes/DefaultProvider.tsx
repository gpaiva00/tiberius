import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import { AppSettingsProvider } from '@/hooks/useAppSettings'
import { AuthProvider } from '@/hooks/useAuth'
import { ChangeLogProvider } from '@/hooks/useChangeLog'
import { ListProvider } from '@/hooks/useList'
import { TaskProvider } from '@/hooks/useTask'

export const DefaultProvider = ({ children }: { children?: ReactElement }) => {
  return (
    <>
      <AuthProvider>
        <AppSettingsProvider>
          <ListProvider>
            <TaskProvider>
              <ChangeLogProvider>{children || <Outlet />}</ChangeLogProvider>
            </TaskProvider>
          </ListProvider>
        </AppSettingsProvider>
      </AuthProvider>
    </>
  )
}
