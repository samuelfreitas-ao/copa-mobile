import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  userIsLoading: boolean
  signIn: () => Promise<void>,
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider ({ children }: AuthProviderProps) {
  const [userIsLoading, setUserIsLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '382236029157-2v4kt9lgpr8lfl1jhbol7r544gqleojt.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn () {
    try {
      setUserIsLoading(true)

      await promptAsync()
    } catch (error) {
      console.log(error);
      throw error
    } finally {
      setUserIsLoading(false)
    }
  }

  async function signInWithGoogle (accessToken: string) {
    console.log('Token', accessToken)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      user,
      userIsLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}