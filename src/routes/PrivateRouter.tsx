import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

import { SIGN_IN_ROUTE } from '@/consts'

export const PrivateRouter = () => {
  const { isLoadingUser, isLogged } = useAuth()

  if (isLoadingUser) return <p className="text-lg dark:text-darkTextLight">Carregando...</p>

  if (!isLogged) return <Navigate to={SIGN_IN_ROUTE} />

  return <Outlet />
}
