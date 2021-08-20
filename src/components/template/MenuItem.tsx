import Link from 'next/link'
interface MenuItemProps {
  text: string;
  icon: any
  url?: string;
  className?: string;
  onClick?: (event: any) => void
}

function MenuItem({url, text, icon, className, onClick}: MenuItemProps) {

  function renderLink() {
    return (
      <a className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200 ${className}`}>
        {icon}
        <span className="text-xs font-light">{text}</span>
      </a>
    )
  }
  return (
    <li onClick={onClick} className={`hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 `}>
      {url ? (
        <Link href={url}>
          {renderLink()}
        </Link>
        ) : renderLink()
      }
    </li>
  )
}

export { MenuItem }