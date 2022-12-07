import dynamic from 'next/dynamic'

import { default as CompoundComponent } from './CompoundComponent'
import { default as ContextModuleFunction } from './ContextModuleFunction'
import { default as ControlledProps } from './ControlledProps'
import { default as ControlledPropsProd } from './ControlledPropsProd'
import { default as HookFlow } from './HookFlow'
import { default as LazyGlobe } from './LazyLoadingGlobe'
import { default as PropsGetter } from './PropGetter'
import { default as StateReducer } from './StateReducer'

const LayoutEffect = dynamic(() => import('./LayoutEffect'), { ssr: false })
const DataAPI = dynamic(() => import('./dataAPI'), { ssr: false })
const Board = dynamic(() => import('./TicTacToe'), { ssr: false })
const HookLocalStorage = dynamic(() => import('./HookLocalStorage'), {
  ssr: false,
})
const MemoWorker = dynamic(() => import('./MemoWorker'), { ssr: false })
const Profiler = dynamic(() => import('./Profiler'), { ssr: false })
const OptimContext = dynamic(() => import('./OptimContext'), { ssr: false })
const OptimContextHOC = dynamic(() => import('./OptimContextHOC'), {
  ssr: false,
})

export default function App() {
  return (
    <section className='flex flex-col gap-4 divide-black bg-gray-400 [&_button]:bg-indigo-600 [&_button]:p-1 [&_button]:text-white [&_button]:ring-2 [&_button]:ring-red-600'>
      <HookLocalStorage />
      <HookFlow />
      <Board />
      <DataAPI />
      <LayoutEffect />
      <ContextModuleFunction />
      <CompoundComponent />
      <PropsGetter />
      <StateReducer />
      <ControlledProps />
      <ControlledPropsProd />
      <LazyGlobe />
      <MemoWorker />
      <OptimContext />
      <OptimContextHOC />
      <Profiler />
    </section>
  )
}
