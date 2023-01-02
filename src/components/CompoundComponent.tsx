import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react'

type TFlyOutContext = {
  open: boolean
  toggle: (open: boolean) => void
}

const FlyOutContext = createContext<TFlyOutContext | null>(null)

function FlyOut({ children }: { children: React.ReactNode }) {
  const [open, toggle] = useState(false)

  const providerValue = { open, toggle }

  return (
    <div className='absolute top-[5px] right-[5px]'>
      <FlyOutContext.Provider value={providerValue}>
        {children}
      </FlyOutContext.Provider>
    </div>
  )
}

function Toggle() {
  const ctx = useContext(FlyOutContext)

  return (
    <div
      className='flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[50px] bg-[#232323]'
      onClick={() => ctx?.toggle(!ctx.open)}
    >
      TOGGLE
    </div>
  )
}

function List({ children }: { children: ReactNode }) {
  const ctx = useContext(FlyOutContext)

  return ctx?.open ? (
    <ul className='shadow-[3px 3px 4px #141414] absolute top-[30px] right-0 w-[150px] bg-[#292929] p-0'>
      {children}
    </ul>
  ) : null
}

function Item({ children }: { children: ReactNode }) {
  return (
    <li className='transition-[0.3s all cubic-bezier(0.175, 0.885, 0.32, 1.275)] cursor-pointer list-none p-4'>
      {children}
    </li>
  )
}

// Either render Toggle as children of a Context component
// Or as a prop
FlyOut.Toggle = Toggle
FlyOut.List = List
FlyOut.Item = Item

export function FlyOutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  )
}

const sources = [
  'https://images.pexels.com/photos/939478/pexels-photo-939478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1692984/pexels-photo-1692984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/162829/squirrel-sciurus-vulgaris-major-mammal-mindfulness-162829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

function Image({ source }: { source: string }) {
  return (
    <div className='relative w-[300px]'>
      <img
        className='mb-[20px] w-[300px] rounded-xl'
        src={source}
        alt='Squirrel'
      />
      <FlyOutMenu />
    </div>
  )
}

export function CompoundA() {
  return (
    <>
      {sources.map((source, i) => (
        <Image source={source} key={i} />
      ))}
    </>
  )
}

// ------------------------------------------------------------------

import { Switch } from '@headlessui/react'

type TTapperContext = {
  on: boolean
  toggle: () => void
}

interface IMyTapperProps {
  on: boolean
  onClick: () => void
}

function MyTapper({ on, onClick }: IMyTapperProps) {
  return (
    <Switch
      checked={on}
      onChange={onClick}
      className={`${
        on ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className='sr-only'>TOGGLE</span>
      <span
        className={`${
          on ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}

const TapperContext = React.createContext<TTapperContext | null>(null)

function useEffectAffterMount(cb: () => void, dependencies: any[]) {
  const justMounted = React.useRef(true)
  React.useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}

interface ITapperProps {
  onTapper: (on: boolean) => void
  children?: React.ReactNode
}

function Tapper(props: ITapperProps) {
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => setOn(oldOn => !oldOn), [])
  useEffectAffterMount(() => {
    props.onTapper(on)
  }, [on])
  const value = React.useMemo(() => ({ on, toggle }), [on])
  return (
    <TapperContext.Provider value={value}>
      {props.children}
    </TapperContext.Provider>
  )
}

function useTapperContext() {
  const context = React.useContext(TapperContext)
  if (!context) {
    throw new Error(
      `Tapper compound components cannot be rendered outside the Tapper component`
    )
  }
  return context
}

function TapperOn({ children }: { children: React.ReactNode }) {
  const { on } = useTapperContext()
  return on ? <>{children}</> : null
}

function TapperOff({ children }: { children: React.ReactNode }) {
  const { on } = useTapperContext()
  return on ? null : <>{children}</>
}

function TapperButton(props: any) {
  const { on, toggle } = useTapperContext()
  return <MyTapper on={on} onClick={toggle} {...props} />
}

export function CompoundB() {
  return (
    <Tapper onTapper={on => console.log(on)}>
      <TapperOn>The button is on</TapperOn>
      <TapperOff>The button is off</TapperOff>
      <TapperButton />
    </Tapper>
  )
}
