import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { auth, signInWithGoogle, User as UserFirebase } from '@services/firebase'

import { UserProps } from '@/typings/User'
import { SIGN_IN_ROUTE } from '@/consts'

interface UseAuthProps {
  isLogged: boolean
  isLoadingUser: boolean
  user: UserProps | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const authContext = createContext<UseAuthProps>({} as UseAuthProps)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<UserProps | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(fallback)

    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      fallback(user)
    } catch (error) {
      console.error('sign in error', error)
      setIsLoadingUser(false)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      navigate(SIGN_IN_ROUTE)
    } catch (error) {
      console.error('sign out error', error)
    } finally {
      setIsLogged(false)
      setUser(null)
    }
  }

  const fallback = async (user: UserFirebase | null) => {
    if (user !== null) {
      setIsLogged(true)

      try {
        setUser({
          ...user,
          firstName: user.displayName?.split(' ')[0] || '',
        })
      } catch (error) {
      } finally {
        setIsLoadingUser(false)
      }
    }
  }

  return (
    <authContext.Provider
      value={{
        isLogged,
        isLoadingUser,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(authContext)

  return context
}
