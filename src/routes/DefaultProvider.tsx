import { ChangeLogProvider } from '@/hooks/useChangeLog'
import { ListProvider } from '@/hooks/useList'
import { TaskProvider } from '@/hooks/useTask'
import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'

export const DefaultProvider = ({ children }: { children?: ReactElement }) => {
  return (
    <>
      <AuthProvider>
        <ListProvider>
          <TaskProvider>
            <ChangeLogProvider>{children || <Outlet />}</ChangeLogProvider>
          </TaskProvider>
        </ListProvider>
      </AuthProvider>
    </>
  )
}
