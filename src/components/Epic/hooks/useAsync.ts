import {
  type Reducer,
  type Dispatch,
  useRef,
  useLayoutEffect,
  useCallback,
  useReducer,
} from 'react'

type Nullable<T> = T | null | undefined

type IddleState<T> = {
  status: 'idle'
  data: Nullable<T>
  error: null
}

type PendingState<T, E> = {
  status: 'pending'
  data: Nullable<T>
  error: Nullable<E>
}

type SuccessState<T> = {
  status: 'success'
  data: T
  error: null
}

type FailureState<E> = {
  status: 'failure'
  data: null
  error: E
}

type State<T, E> =
  | IddleState<T>
  | PendingState<T, E>
  | SuccessState<T>
  | FailureState<E>

type Event<T, E> =
  | { type: 'idle' }
  | { type: 'pending' }
  | { type: 'resolved'; payload: T }
  | { type: 'rejected'; error: E }
  | { type: 'error'; error: E }

// Explicit return typing is more precise than otherwise union of
// all the literal object types
function asyncReducer<T, E>(
  state: State<T, E>,
  event: Event<T, E>
): State<T, E> {
  switch (event.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'success', data: event.payload, error: null }
    }
    case 'rejected': {
      return { status: 'failure', data: null, error: event.error }
    }
    case 'idle': {
      return { status: 'idle', data: null, error: null }
    }
    default: {
      throw new Error(`Unhandled action error: ${event.error}`)
    }
  }
}

function useSafeDispatch<T, E>(
  dispatch: Dispatch<Event<T, E>>
): Dispatch<Event<T, E>> {
  const mounted = useRef(false)

  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  )
}

export function useAsync<T, E = string>(initialData: Nullable<T> = null) {
  const initialState: IddleState<T> = {
    status: 'idle',
    data: initialData,
    error: null,
  }

  const [state, unsafeDispatch] = useReducer<Reducer<State<T, E>, Event<T, E>>>(
    asyncReducer,
    initialState
  )

  const dispatch = useSafeDispatch(unsafeDispatch)

  const run = useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: 'pending' })
      promise.then(
        data => {
          dispatch({ type: 'resolved', payload: data })
        },
        error => {
          dispatch({ type: 'rejected', error })
        }
      )
    },
    [dispatch]
  )

  const setData = useCallback<(data: T) => void>(
    data => dispatch({ type: 'resolved', payload: data }),
    [dispatch]
  )

  const setError = useCallback<(error: E) => void>(
    error => dispatch({ type: 'error', error }),
    [dispatch]
  )

  return {
    setData,
    setError,
    state,
    run,
  }
}
