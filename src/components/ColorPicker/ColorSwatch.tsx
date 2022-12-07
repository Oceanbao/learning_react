import { useContext } from 'react'

import { RGBContext } from './context'

export const ColorSwatch = () => {
  const { red, green, blue } = useContext(RGBContext)

  return (
    <div
      className='flex h-32 w-32'
      style={{
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
      }}
    ></div>
  )
}
