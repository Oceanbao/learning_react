import {
  createContext,
  useContext,
  Dispatch,
  useReducer,
  useState,
} from 'react'

import { dequal } from 'dequal'

// user-context.js
import { type User } from './auth-context'
import { useAuth } from './auth-context'
import * as userClient from './user-client'

// State Types
// -------------------------------------------------------
type InitState = {
  user: User
  status: null
  storedUser: null
  error: null
}
type StartState = {
  user: User
  status: 'pending'
  storedUser: User | null
  error: null
}
type SuccessState = {
  user: User
  status: 'resolved'
  storedUser: null
  error: null
}
type FailState = {
  user: User | null
  status: 'rejected'
  storedUser: null
  error: {
    message: string
  }
}
type ResetState = {
  user: User | null
  storedUser: User | null
  status: 'reset'
  error: null
}
type State = InitState | StartState | SuccessState | FailState | ResetState

type Event =
  | { type: 'start update'; updates: User }
  | { type: 'finish update'; updatedUser: User }
  | { type: 'fail update'; error: { message: string } }
  | { type: 'reset' }

function userReducer(state: State, action: Event): State {
  switch (action.type) {
    case 'start update': {
      const startState: StartState = {
        ...state,
        status: 'pending',
        user: { ...state.user, ...action.updates },
        storedUser: state.user,
        error: null,
      }
      return startState
    }
    case 'finish update': {
      const successState: SuccessState = {
        ...state,
        user: action.updatedUser,
        status: 'resolved',
        storedUser: null,
        error: null,
      }
      return successState
    }
    case 'fail update': {
      const failState: FailState = {
        ...state,
        status: 'rejected',
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      }
      return failState
    }
    case 'reset': {
      const resetState: ResetState = {
        ...state,
        status: 'reset',
        error: null,
      }
      return resetState
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const UserContext = createContext<[State, Dispatch<Event>] | null>(null)
UserContext.displayName = 'UserContext'

function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const initialState: State = {
    status: null,
    error: null,
    storedUser: null,
    user,
  }
  const value = useReducer(userReducer, initialState)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  const context = useContext(UserContext)
  if (context === undefined || context === null)
    throw new Error(`useUser must be used within a UserProvider`)
  return context
}

// Dan's idea
// This is Context Module Function
// - provided via Context Provider a hook
// - giving state, dispatch directly from reducer
// - plus any complex logic helper function along in the hook
// This avoid giving wrapped useCallback(dispatch) and faster
async function updateUser(
  dispatch: Dispatch<Event>,
  user: User,
  updates: User
) {
  dispatch({ type: 'start update', updates })
  try {
    const updatedUser = await userClient.updateUser(user, updates)
    dispatch({ type: 'finish update', updatedUser })
    return updatedUser
  } catch (err) {
    const error = err as Error
    if ('message' in error) {
      dispatch({ type: 'fail update', error })
    }
    return Promise.reject(error)
  }
}

// The above should be in separate module for code splitting
// the Provider, the hook -> state, dispatch, and helper function
// export { UserProvider, useUser, updateUser }

// use: user-profile.js
// import { ... } from user-context.js

function UserSetting() {
  const [userState, userDispatch] = useUser()

  const isPending = userState.status === 'pending'
  const isRejected = userState.status === 'rejected'

  const [formState, setFormState] = useState(userState.user)

  const isChanged = !dequal(userState.user, formState)

  function handleChange(e: React.ChangeEvent) {
    const element = e.target as HTMLInputElement
    if (formState) {
      setFormState({ ...formState, [element.name]: element.value })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (userState.user && formState)
      updateUser(userDispatch, userState.user, formState).catch(err => err)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label className='block' htmlFor='username'>
          Username
        </label>
        <input
          id='username'
          name='username'
          disabled
          readOnly
          value={formState?.username}
          className='w-full'
        />
      </div>
      <div className='mb-3'>
        <label className='block' htmlFor='tagline'>
          Tagline
        </label>
        <input
          id='tagline'
          name='tagline'
          value={formState?.tagline}
          onChange={handleChange}
          className='w-full'
        />
      </div>
      <div className='mb-3'>
        <label className='block' htmlFor='bio'>
          Biography
        </label>
        <textarea
          id='bio'
          name='bio'
          value={formState?.bio}
          onChange={handleChange}
          className='w-full'
        />
      </div>
      <div className='[&_button]:p-2 disabled:[&_button]:text-gray-300'>
        <button
          type='button'
          onClick={() => {
            setFormState(userState.user)
            userDispatch({ type: 'reset' })
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button
          type='submit'
          disabled={(!isChanged && !isRejected) || isPending}
        >
          {isPending
            ? '...'
            : isRejected
            ? '✖ Try again'
            : isChanged
            ? 'Submit'
            : '✔'}
        </button>
        {isRejected ? (
          <pre className='text-red-600'>{userState.error?.message}</pre>
        ) : null}
      </div>
    </form>
  )
}

function UserDataView() {
  const [{ user }] = useUser()
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function App() {
  return (
    <div className='min-h-[350px] w-80 rounded-md bg-white p-2'>
      <UserProvider>
        <UserSetting />
        <UserDataView />
      </UserProvider>
    </div>
  )
}

export default App
