import { Outlet } from 'react-router-dom'

import { Footer } from '@/shared/components'

export default function DefaultLayout() {
  return (
    <main className="flex h-screen flex-col bg-white dark:bg-darkBackground">
      <div className="flex h-screen flex-1 items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
