import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'
import { ListProvider } from '@/hooks/useList'
import { ChangeLogProvider } from '@/hooks/useChangeLog'

export const DefaultProvider = ({ children }: { children?: ReactElement }) => {
  return (
    <>
      <AuthProvider>
        <ListProvider>
          <ChangeLogProvider>{children || <Outlet />}</ChangeLogProvider>
        </ListProvider>
      </AuthProvider>
    </>
  )
}
