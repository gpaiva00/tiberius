import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <main className="flex h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
      <footer className="w-full">
        <p className="mb-4 mr-8 text-end text-sm font-light text-gray opacity-50">
          Tiberius © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
