import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { MainCard } from '@/shared/components'

import { ReactComponent as GoogleIcon } from '@assets/icons/google-icon.svg'

import { LIST_ROUTE } from '@/consts'

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

  const handleGoToTiberius = () => navigate(LIST_ROUTE)

  return (
    <MainCard
      title="Entrar ou criar conta"
      showAsideButton={false}
    >
      {user?.uid ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
          <p className="text-lg font-bold dark:text-darkTextLight">
            Seja bem-vindo, {user.firstName}!
          </p>
          <button
            className="primary-button md:max-w-sm"
            onClick={handleGoToTiberius}
          >
            Acessar o Tiberius
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-2 md:px-4">
          <p className="text-lg font-bold dark:text-darkTextLight">
            Entre para ter acesso ao Tiberius.
            <p className="text-start font-normal text-lightenGray md:text-center">
              {' '}
              Simples assim, e de graça.
            </p>
          </p>

          <button
            className="primary-button gap-2 md:max-w-sm"
            onClick={handleSignIn}
          >
            <GoogleIcon className="w-5" />
            Entrar com Google
          </button>
        </div>
      )}
    </MainCard>
  )
}
