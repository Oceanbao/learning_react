// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render as rtlRender } from '@testing-library/react'

import { ThemeProvider } from '@components/Tests/Theme'

function render(ui, { theme = 'light', ...options } = {}) {
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
