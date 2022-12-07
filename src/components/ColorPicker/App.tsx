import React from 'react'

import { ThemeProvider } from 'next-themes'

import { ColorAdjustment } from './ColorAdjustment'
import { ColorInput } from './ColorInput'
import { ColorSlider } from './ColorSlider'
import { ColorSwatch } from './ColorSwatch'
import { RGBContextProvider } from './context'
import { ThemeContext } from './theme-context'

const Application = () => {
  const themes = React.useContext(ThemeContext)

  return (
    <ThemeProvider>
      <RGBContextProvider>
        <main
          className='flex max-w-sm flex-col items-center justify-center'
          style={{
            ...themes.dark,
          }}
        >
          <ColorSwatch />
          <ColorAdjustment Adjustment={ColorInput} />
          <ColorAdjustment Adjustment={ColorSlider} />
        </main>
      </RGBContextProvider>
    </ThemeProvider>
  )
}

export default Application
