import { useAppData } from "../../data/hook/useAppData"
import { WithAuth } from "../auth/WithAuth"
import { Content } from "./Content"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: any
}

function Layout ({title, subtitle, children}: LayoutProps) {
  
  const { theme } = useAppData()

  return (
    <WithAuth>
      <div className={`${theme} flex h-screen w-screen`}>
        <Sidebar />
        <div className="flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800">
          <TopBar title={title} subtitle={subtitle} />
          <Content>
            {children} 
          </Content>
        </div>
      </div>
    </WithAuth>
  )
}

export { Layout }