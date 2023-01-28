import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from "../services/api";
import { useToast } from "native-base";

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  userIsLoading: boolean
  signIn: () => Promise<void>,
  signOut: () => Promise<void>,
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider ({ children }: AuthProviderProps) {
  const [userIsLoading, setUserIsLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  const toast = useToast()

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

  async function signInWithGoogle (access_token: string) {
    try {
      setUserIsLoading(true)
      // console.log('access_token', access_token);

      const response = await api.post('/login', { access_token })
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

      const userInfoResponse = await api.get('/me')
      setUser(userInfoResponse.data.user)

    } catch (error) {
      toast.show({
        title: 'Erro ao iniciar sessão. Tente novamente',
        placement: 'top',
        bgColor: 'red.500'
      })
      console.log(error.response);
      throw error
    } finally {
      setUserIsLoading(false)
    }
  }

  async function signOut () {
    setUser({} as UserProps)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      userIsLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}