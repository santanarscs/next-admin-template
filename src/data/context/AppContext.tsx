import { createContext, useEffect, useState } from "react";



interface AppContextProps {
  theme: string
  changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
  theme: null,
})

function AppProvider({children}) {
  const [theme, setTheme] = useState<string>('dark')

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme')
    setTheme(localStorageTheme ?? '') 
  }, [])
  return (
    <AppContext.Provider value={{theme, changeTheme}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }