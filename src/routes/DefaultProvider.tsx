import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../contexts/useAuth'
import { ListProvider } from '@/contexts/useList'

export const DefaultProvider = ({ children }: { children?: ReactElement }) => {
  return (
    <>
      <AuthProvider>
        <ListProvider>{children || <Outlet />}</ListProvider>
      </AuthProvider>
    </>
  )
}
