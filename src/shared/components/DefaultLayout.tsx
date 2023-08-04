import { Outlet } from 'react-router-dom'

import { useAuth } from '@/hooks'
import { Footer } from '@/shared/components'
import Sidebar from '@/shared/components/Sidebar'

export default function DefaultLayout() {
  const { isLogged } = useAuth()
  return (
    <main className="flex h-screen flex-col bg-light-background dark:bg-dark-background">
      <div className="mt-10 flex max-h-[calc(100%-6rem)] flex-1 gap-6 px-20">
        {isLogged && <Sidebar />}
        <main className="flex h-full w-full flex-col">
          <Outlet />
        </main>
      </div>
      <Footer />
    </main>
  )
}
