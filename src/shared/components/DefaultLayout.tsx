import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <main className="flex h-screen flex-col bg-white dark:bg-darkBackground">
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
      <footer className="absolute bottom-0 w-full">
        <p className="mb-4 mr-8 text-end text-sm font-light text-gray opacity-50 dark:text-darkTextGray">
          Tiberius (beta) © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}
