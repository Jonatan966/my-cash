import { useContext, useEffect, useState, createContext, ReactNode } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import { User } from 'interfaces/User'
import { authApp, authConfig } from 'services/firebase'

export type TargetProviders = 'google' | 'facebook' | 'anonymous'

interface AuthContextProps {
  signIn: (targetProvider: TargetProviders) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | undefined;
  isLoadingUserInformation: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isLoadingUserInformation, setIsLoadingUserInformation] = useState(true)
  const router = useHistory()

  useEffect(() => {
    setIsLoadingUserInformation(true)

    const unsubscribe = authApp.onAuthStateChanged(authConfig, user => {
      if (user) {
        saveUserInformation(user)
        setIsLoadingUserInformation(false)
        return
      }

      router.replace('/auth')
    })

    return () => unsubscribe()
  }, [router])

  async function signIn(targetProvider: TargetProviders) {
    const providers = {
      google: new authApp.GoogleAuthProvider(),
      facebook: new authApp.FacebookAuthProvider(),
    }

    let signInResult = null

    try {
      if (targetProvider === 'anonymous') {
        signInResult = await authApp.signInAnonymously(authConfig)
      } else {
        signInResult = await authApp.signInWithPopup(authConfig, providers[targetProvider])
      }

      if (signInResult.user) {
        saveUserInformation(signInResult.user)

        router.replace('/')
      }
    } catch {
      toast.error("Ocorreu um erro ao tentar fazer login. Verifique sua conexão e tente novamente")
    }

  }

  async function signOut() {
    await authApp.signOut(authConfig)
    setUser(undefined)
    router.replace('/auth')
  }

  function saveUserInformation(userInformation: authApp.User) {
    const { displayName, photoURL, uid, isAnonymous } = userInformation

    if ((!displayName || !photoURL) && !isAnonymous) {
      throw new Error('Missing information from account.')
    }

    setUser({
      id: uid,
      name: displayName || 'Anonymous',
      avatar: photoURL || ''
    })
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoadingUserInformation
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
