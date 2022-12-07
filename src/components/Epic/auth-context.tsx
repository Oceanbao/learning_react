import { useContext, createContext, type ProviderProps } from 'react'

const initialContext = {
  user: { username: 'jackiechan', tagline: '', bio: '' },
}

export type User = typeof initialContext.user

type ContextProps = typeof initialContext

const AuthContext = createContext(initialContext)

AuthContext.displayName = 'AuthContext'

const AuthProvider = ({
  user,
  ...props
}: ContextProps & Omit<ProviderProps<Record<string, unknown>>, 'value'>) => (
  <AuthContext.Provider value={{ user }} {...props} />
)

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
