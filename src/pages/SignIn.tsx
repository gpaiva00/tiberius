import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

import Divider from '@/components/Divider'

import { ReactComponent as GoogleIcon } from '@assets/google-icon.svg'

import { LIST_ROUTE } from '@/consts'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()

  const handleSignIn = async () => {
    try {
      await signIn()
      console.warn('sign in result', user)
    } catch (error) {
      console.error('sign in error', error)
    }
  }

  const handleGoToTiberius = () => navigate(LIST_ROUTE)

  return (
    <main className="flex flex-col h-screen px-40 py-10 items-center justify-center">
      <div className="flex flex-col bg-white rounded-default h-[350px] w-[350px] border-default shadow-default">
        <header className="flex items-center gap-2 p-4 bg-header rounded-t-default">
          <h1 className="font-black text-2xl  lowercase">entrar ou criar conta</h1>
        </header>
        <Divider />
        {user?.uid ? (
          <div className="flex flex-1 px-6 flex-col items-center justify-center gap-6">
            <h1>Tudo certo, {user.firstName}!</h1>
            <button
              className="flex items-center gap-4 justify-center py-2 w-full bg-primary hover:text-black border-default rounded-default text-white hover: transition-colors shadow-default"
              onClick={handleGoToTiberius}
            >
              acessar o Tiberius!
            </button>
          </div>
        ) : (
          <div className="flex flex-1 px-6 flex-col items-center justify-center gap-6">
            <h1>Entre para ter acesso ao Tiberius</h1>
            <button
              className="flex items-center gap-4 justify-center py-2 w-full bg-primary hover:text-black border-default rounded-default text-white hover: transition-colors shadow-default"
              onClick={handleSignIn}
            >
              <GoogleIcon className="w-5" />
              entrar com Google
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
