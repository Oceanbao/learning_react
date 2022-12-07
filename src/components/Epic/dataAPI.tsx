import React, { useEffect, useState } from 'react'

import { type FallbackProps, ErrorBoundary } from 'react-error-boundary'

import { useAsync } from './hooks/useAsync'

const baseURL = 'https://jsonplaceholder.typicode.com/todos'
const getURL = (taskId: number) => `${baseURL}/${taskId}/`

async function fetchData(taskId: number) {
  const url = getURL(taskId)
  const delay = '1500'
  return window
    .fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=utf8',
        delay,
      },
    })
    .then(async response => {
      const data: TData = await response.json()
      if (response.ok) {
        if (data) {
          return data
        } else {
          return Promise.reject(new Error('No data fetched'))
        }
      } else {
        return Promise.reject(new Error('Network error'))
      }
    })
}

type TData = {
  userId: number
  id: number
  title: string
  completed: boolean
}

function DataComponentFallback() {
  const fallbackData: TData = {
    userId: -1,
    id: -1,
    title: 'N/A',
    completed: false,
  }
  return <DataView data={fallbackData} />
}

function DataView({ data }: { data: TData }) {
  return (
    <div className='flex items-center gap-4 border border-indigo-600'>
      <img src='/static/favicons/favicon.ico' alt='crane' />
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

function DataForm({
  initialDataName,
  onSubmit,
}: {
  initialDataName: number
  onSubmit: (x: number) => void
}) {
  const [dataName, setDataName] = useState(initialDataName)

  function handleChange(e: React.ChangeEvent) {
    const value = Number.parseInt((e.target as HTMLInputElement).value)
    setDataName(value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(dataName)
  }

  function handleSelect(newDataName: number) {
    setDataName(newDataName)
    onSubmit(newDataName)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col place-items-center gap-4 border border-red-700'
    >
      <label htmlFor='data-input'>Task ID</label>
      <small>
        Try{` `}
        <button type='button' onClick={() => handleSelect(1)}>
          {`demo (id: 1)`}
        </button>
      </small>
      <div className='border border-slate-500'>
        <input
          id='data-input'
          name='dataName'
          placeholder='Task ID...'
          value={dataName}
          onChange={handleChange}
        />
        <button type='submit' disabled={!dataName}>
          Submit
        </button>
      </div>
    </form>
  )
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      There was an error:{` `}
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function DataErrorBoundary(props: any) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

function DataComponent({ dataName }: { dataName: number }) {
  const { state, run } = useAsync<TData>(null)

  useEffect(() => {
    if (!dataName) return
    run(fetchData(dataName))
  }, [dataName, run])

  switch (state.status) {
    case 'idle':
      return <span>{`Submit a task ID`}</span>
    case 'pending':
      // return <DataComponentFallback />
      return <p>Loading...</p>
    case 'failure':
      throw state.error
    case 'success':
      return <DataView data={state.data} />
    default:
      throw new Error('This should be impossible')
  }
}

function App() {
  const [dataName, setDataName] = useState<number>(0)

  function handleSubmit(newDataName: number) {
    setDataName(newDataName)
  }

  function handleReset() {
    setDataName(dataName)
  }

  return (
    <section className='flex gap-4'>
      <DataForm initialDataName={dataName} onSubmit={handleSubmit} />
      <DataErrorBoundary onReset={handleReset} resetKeys={[dataName]}>
        <DataComponent dataName={dataName} />
      </DataErrorBoundary>
    </section>
  )
}

export default App
