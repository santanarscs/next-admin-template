import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { User } from '../../model/User'
import firebaseConfig from '../../firebase/config'

interface AuthContextProps {
  user: User
  isLoading: boolean
  loginGoogle: () => Promise<void>
  logout: () => void
}

async function userNormalize(userFirebase: firebaseConfig.User): Promise<User> {
  const token = await userFirebase.getIdToken()
  return { 
    uid: userFirebase.uid,
    name: userFirebase.displayName,
    email: userFirebase.email,
    token,
    provider: userFirebase.providerData[0].providerId,
    imageUrl: userFirebase.photoURL
  }
}

function manageCookie(isLogged: boolean) {
  if(isLogged) {
    Cookies.set('admin-template-auth', isLogged, {
      expires: 7
    })
  } else {
    Cookies.remove('admin-template-auth')
  }
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function AuthProvider({children}) {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()

  async function configureSection(userFirebase) {
    if(userFirebase?.email) {
      const user = await userNormalize(userFirebase)
      setUser(user)
      manageCookie(true)
      setIsLoading(false)
      return user.email
    } else {
      setUser(null)
      manageCookie(false)
      setIsLoading(false)
      return false
    }
  }

  async function loginGoogle() {
    try {
      setIsLoading(true)
      const response = await firebaseConfig.auth().signInWithPopup(
        new firebaseConfig.auth.GoogleAuthProvider()
      )
      configureSection(response.user)
      router.push('/')

    } finally {
      setIsLoading(false)
    }
    
  }
  async function logout() {
    try {
      setIsLoading(true)
      await firebaseConfig.auth().signOut()
      await configureSection(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(Cookies.get('admin-template-auth')) {
      const cancelled = firebaseConfig.auth().onIdTokenChanged(configureSection)
      return () => cancelled()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{user, isLoading, loginGoogle, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider}