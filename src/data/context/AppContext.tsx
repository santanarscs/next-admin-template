import { createContext, useState } from "react";

type Theme = 'dark' | ''

interface AppContextProps {
  theme: Theme
  changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
  theme: null,
})

function AppProvider({children}) {
  const [theme, setTheme] = useState<Theme>('dark')

  function changeTheme() {
    setTheme(theme === '' ? 'dark' : '')
  }
  return (
    <AppContext.Provider value={{theme, changeTheme}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }