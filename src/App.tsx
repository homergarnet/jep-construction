import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './route/Router'
import { ThemeProvider } from './theme/theme-provider'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={Router} />
      </ThemeProvider>

    </>
  )
}

export default App
