import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react'
import { cn } from '@shared/utils/cn'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'File Único', path: '/file-unico' },
  { icon: Search, label: 'Consultas', path: '/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/reportes' },
  { icon: Settings, label: 'Configuración', path: '/configuracion' },
]

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <aside 
      className={cn(
        "bg-primary-900 text-white transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-primary-800">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-900 font-bold text-xl">OM</span>
            </div>
            <span className="font-semibold">OVI Manager</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    "hover:bg-primary-800",
                    isActive && "bg-primary-700",
                    !isOpen && "justify-center"
                  )
                }
              >
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-800">
        <div className={cn(
          "text-xs text-primary-300",
          !isOpen && "text-center"
        )}>
          {isOpen ? 'v1.0.0' : 'v1'}
        </div>
      </div>
    </aside>
  )
}
