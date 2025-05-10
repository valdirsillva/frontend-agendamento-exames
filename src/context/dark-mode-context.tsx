import { createContext, useState } from "react"
import { Fragment } from "react/jsx-runtime"

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => { }
})

function DarkModeProvider(props: any) {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <Fragment>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </DarkModeContext.Provider>
    </Fragment>
  )
}

export { DarkModeContext, DarkModeProvider }