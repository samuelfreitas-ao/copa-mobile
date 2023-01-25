import { createContext, ReactNode } from "react";


interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  signin: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider ({ children }: AuthProviderProps) {
  const user = {
    name: "Samuel Freitas",
    avatarUrl: 'https://github.com/samuelfreitas-ao.png'
  } as UserProps

  async function signin () {
    console.log('Logando...', user.name);
  }

  return (
    <AuthContext.Provider value={{
      user,
      signin
    }}>
      {children}
    </AuthContext.Provider>
  )
}