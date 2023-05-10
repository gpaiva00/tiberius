import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/contexts/useAuth'

import { SIGN_IN_ROUTE } from '@/consts'

export const PrivateRouter = () => {
  const { isLogged } = useAuth()

  if (!isLogged) return <Navigate to={SIGN_IN_ROUTE} />
  return <Outlet />
}
