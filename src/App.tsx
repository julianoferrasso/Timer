import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import { dafaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import { CyclesContextProvider } from './contexts/CycleContext'

export function App() {
  // return <ExemploContexto />
  return (
    <ThemeProvider theme={dafaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}
