import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
      <footer className="w-full">
        <p className="text-sm text-gray opacity-50 font-light text-end mr-8 mb-4">
          Tiberius © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
