import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

import Card from '@/shared/components/Card'
import Divider from '@/shared/components/Divider'

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
    <Card size="sm">
      <header className="flex items-center gap-2 rounded-t-default bg-header p-4 dark:bg-darkCardBackground">
        <h1 className="text-2xl font-black  lowercase dark:text-darkTextLight">entrar ou criar conta</h1>
      </header>
      <Divider />
      {user?.uid ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
          <h1 className="dark:text-darkTextLight">
            Seja bem-vindo, <b className="text-primary dark:text-darkTextLight">{user.firstName}</b>!
          </h1>
          <button
            className="primary-button"
            onClick={handleGoToTiberius}
          >
            vamos lá!
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
          <p className="font-bold dark:text-darkTextLight">
            Entre para ter acesso ao Tiberius.
            <p className="text-start font-normal text-lightenGray"> Simples assim, e de graça.</p>
          </p>

          <button
            className="primary-button"
            onClick={handleSignIn}
          >
            <GoogleIcon className="w-5" />
            entrar com Google
          </button>
        </div>
      )}
    </Card>
  )
}
