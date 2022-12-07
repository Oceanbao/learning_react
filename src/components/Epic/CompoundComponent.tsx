import { createContext, useContext, useState } from 'react'

import Switch from './Switch'

type ContextProps = {
  on: boolean
  toggle: () => void
}

const initialProps = {
  on: false,
  toggle: () => {
    // TODO
  },
}

const ToggleContext = createContext<ContextProps>(initialProps)
ToggleContext.displayName = 'ToggleContext'

function Toggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = useContext(ToggleContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

function ToggleOn({ children }: { children: React.ReactNode }) {
  const { on } = useToggle()
  return <>{on ? children : null}</>
}

function ToggleOff({ children }: { children: React.ReactNode }) {
  const { on } = useToggle()
  return <>{on ? null : children}</>
}

function ToggleButton({ ...props }) {
  const { on, toggle } = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App
