import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

import DefaultCard from '@/components/DefaultCard'
import Divider from '@/components/Divider'

import { ReactComponent as GoogleIcon } from '@assets/google-icon.svg'

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
    <DefaultCard size="sm">
      <header className="flex items-center gap-2 p-4 bg-header rounded-t-default">
        <h1 className="font-black text-2xl  lowercase">entrar ou criar conta</h1>
      </header>
      <Divider />
      {user?.uid ? (
        <div className="flex flex-1 px-6 flex-col items-center justify-center gap-6">
          <h1>Seja bem-vindo, <b className='text-primary'>{user.firstName}</b>!</h1>
          <button
            className="default-button"
            onClick={handleGoToTiberius}
          >
            Vamos lá!
          </button>
        </div>
      ) : (
        <div className="flex flex-1 px-6 flex-col items-center justify-center gap-6">
          <h1>Entre para ter acesso ao Tiberius</h1>
          <button
            className="default-button"
            onClick={handleSignIn}
          >
            <GoogleIcon className="w-5" />
            entrar com Google
          </button>
        </div>
      )}
    </DefaultCard>
  )
}
