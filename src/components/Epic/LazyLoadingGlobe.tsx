import { Suspense, useState } from 'react'

import dynamic from 'next/dynamic'

const loadGlobe = () => import('./globe/Globe')
const Globe = dynamic(loadGlobe)

function App() {
  const [showGlobe, setShowGlobe] = useState(false)

  return (
    <div className='flex h-full flex-col content-center items-center p-8'>
      <label className='mb-4' onMouseEnter={loadGlobe} onFocus={loadGlobe}>
        <input
          type='checkbox'
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {` show globe`}
      </label>
      <div className='h-96 w-96'>
        <Suspense fallback={<div>loading globe...</div>}>
          {showGlobe ? <Globe /> : null}
        </Suspense>
      </div>
    </div>
  )
}

export default App
