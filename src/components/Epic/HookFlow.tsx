import { useEffect, useState } from 'react'

function Child() {
  console.log('%c\tChild: render start', 'color: MediumSpringGreen')

  const [count, setCount] = useState(() => {
    console.log('%c\tChild: useState(() => 0)', 'color: tomato')
    return 0
  })

  useEffect(() => {
    console.log('%c\tChild: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log(
        '%c\tChild: useEffect(() => {}) cleanup ~',
        'color: LightCoral'
      )
    }
  }) // no depen means tout dépendé

  useEffect(() => {
    console.log('%c\tChild: useEffect(() => {}, [])', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%c\tChild: useEffect(() => {}, []) cleanup ~',
        'color: MediumTurquoise'
      )
    }
  }, [])

  useEffect(() => {
    console.log('%c\tChild: useEffect(() => {}, [count])', 'color: HotPink')
    return () => {
      console.log(
        '%c\tChild: useEffect(() => {}, [count]) cleanup ~',
        'color: MediumTurquoise'
      )
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      {count}
    </button>
  )

  console.log('%cChild: render end', 'color: MediumSpringGreen')

  return element
}

function App() {
  console.log('%c App: render start', 'color: MediumSpringGreen')

  const [showChild, setShowChild] = useState(() => {
    console.log('%c App: useState(() => false)', 'color: tomato')
    return false
  })

  useEffect(() => {
    console.log('%c App: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log('%c App: useEffect(() => {}) cleanup ~', 'color: LightCoral')
    }
  }) // no depen means tout dépendé

  useEffect(() => {
    console.log('%c App: useEffect(() => {}, [])', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%c App: useEffect(() => {}, []) cleanup ~',
        'color: MediumTurquoise'
      )
    }
  }, [])

  useEffect(() => {
    console.log('%c App: useEffect(() => {}, [showChild])', 'color: HotPink')
    return () => {
      console.log(
        '%c App: useEffect(() => {}, [showChild]) cleanup ~',
        'color: MediumTurquoise'
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type='checkbox'
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />
        show child
      </label>
      <div className='m-2 h-12 w-12 border-2 border-solid p-2'>
        {showChild ? <Child /> : null}
      </div>
    </>
  )

  return element
}

export default App
