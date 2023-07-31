import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { auth, signInWithGoogle, User as UserFirebase } from '@services/firebase'

import { SIGN_IN_ROUTE, STORAGE_SELECTED_LIST_ID_KEY } from '@/constants'
import { checkIfUserHasLists, createDefaultListForNewUser } from '@/services/list'

import { UserProps } from '@/typings/User'

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

  const signIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      signInFallback(user)
    } catch (error) {
      console.error('sign in error', error)
      setIsLoadingUser(false)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      localStorage.removeItem(STORAGE_SELECTED_LIST_ID_KEY)
      navigate(SIGN_IN_ROUTE)
    } catch (error) {
      console.error('sign out error', error)
    } finally {
      setIsLogged(false)
      setUser(null)
    }
  }

  const signInFallback = async (user: UserFirebase | null) => {
    if (user !== null) {
      setIsLogged(true)

      try {
        setUser({
          ...user,
          firstName: user.displayName?.split(' ')[0] || '',
        })

        const userHasLists = await checkIfUserHasLists(user.uid)

        if (!userHasLists) {
          await createDefaultListForNewUser(user.uid)
        }
      } catch (error) {
      } finally {
        setIsLoadingUser(false)
      }
    }
  }

  const authStateChangedFallback = async (user: UserFirebase | null) => {
    if (user !== null) {
      try {
        setIsLogged(true)

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChangedFallback)

    return () => unsubscribe()
  }, [])

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
