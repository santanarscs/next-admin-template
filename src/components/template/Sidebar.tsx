import { useAuth } from "../../data/hook/useAuth";
import { ConfigIcon, HomeIcon, LogoutIcon, NotificationIcon } from "../icons";
import { Logo } from "./Logo";
import { MenuItem } from "./MenuItem";

function Sidebar() {
  const { logout } = useAuth()
  return (
    <aside className="flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-500">
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Home" icon={HomeIcon} />
        <MenuItem url="/configurations" text="Configs" icon={ConfigIcon} />
        <MenuItem url="/notifications" text="Notifications" icon={NotificationIcon} />
      </ul>
      <ul>
        <MenuItem onClick={logout} text="Logout" icon={LogoutIcon} className="text-red-600 dark:text-red-400 hover:bg-red-400  dark:hover:text-white hover:text-white"  />
      </ul>
    </aside>
  )
}

export { Sidebar }