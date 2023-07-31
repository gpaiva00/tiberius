import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as GoogleIcon } from '@assets/icons/google-icon.svg'

import { OVERVIEW_ROUTE } from '@/constants'
import { useEffect } from 'react'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()

  const handleSignIn = async () => {
    try {
      await signIn()
    } catch (error) {
      console.error('sign in error', error)
    }
  }

  const handleGoToTiberius = () => navigate(OVERVIEW_ROUTE)

  useEffect(() => {
    if (user?.uid) {
      navigate(OVERVIEW_ROUTE)
    }
  }, [user])

  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title">Entrar ou criar conta</h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col items-center gap-2 overflow-y-scroll rounded-default bg-white p-2 dark:bg-darkCardBackground md:gap-8 md:p-4">
        <div className="flex h-full flex-col items-center justify-center gap-10 px-2">
          <p className="text-lg font-bold dark:text-darkTextLight">
            Entre para ter acesso ao Tiberius.
            <p className="text-start font-normal text-lightenGray md:text-center">
              {' '}
              Simples assim, e de graça.
            </p>
          </p>

          <button
            className="primary-button max-w-sm gap-4"
            onClick={handleSignIn}
          >
            <GoogleIcon className="w-5" />
            Entrar com Google
          </button>
        </div>
      </div>
    </>
  )
}
