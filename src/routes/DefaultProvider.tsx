import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'
import { ListProvider } from '@/hooks/useList'

export const DefaultProvider = ({ children }: { children?: ReactElement }) => {
  return (
    <>
      <AuthProvider>
        <ListProvider>{children || <Outlet />}</ListProvider>
      </AuthProvider>
    </>
  )
}
