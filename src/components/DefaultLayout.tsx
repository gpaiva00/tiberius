import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <div className="flex flex-1 h-screen flex-col">
      <Outlet />
      <footer className="flex w-full items-end justify-end p-6">
        <p className="text-sm text-gray opacity-50 font-light">Tiberius © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
