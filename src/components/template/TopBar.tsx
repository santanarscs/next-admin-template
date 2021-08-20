import { useAppData } from "../../data/hook/useAppData";
import { ButtonChangeTheme } from "./ButtonChangeTheme";
import { Title } from "./Title";
import { UserAvatar } from "./UserAvatar";

interface TopBarProps {
  title: string;
  subtitle: string;
}

function TopBar({title, subtitle}: TopBarProps) {
  const { theme, changeTheme } = useAppData()
  return (
    <div className="flex ">
      <Title title={title} subtitle={subtitle} />
      <div className="flex flex-grow items-center justify-end">
        <ButtonChangeTheme theme={theme}  changeTheme={changeTheme}/>
        <UserAvatar className="ml-3" />
      </div>
    </div>
  )
}

export { TopBar }