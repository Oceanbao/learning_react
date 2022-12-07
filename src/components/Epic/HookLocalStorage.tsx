import React, { useEffect, useRef, useState } from 'react'

function useLocalStorageState(
  key: string,
  defaultValue: string | (() => string) = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState<string>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) return deserialize(valueInLocalStorage)
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState] as const
}

const Greeting = ({ initialName = '' }: { initialName?: string }) => {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event: React.ChangeEvent) {
    const { value } = event.target as HTMLInputElement
    setName(value)
  }

  return (
    <div>
      <form>
        <label htmlFor='name'>Name: </label>
        <input value={name} onChange={handleChange} id='name' />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please enter your name'}
    </div>
  )
}

export default function HookLocalStorage() {
  return (
    <section>
      <Greeting />
    </section>
  )
}
