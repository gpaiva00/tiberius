// import viteLogo from '/vite.svg'

import { Link } from 'react-router-dom'
import Button from "./components/Button"

import { LIST_ROUTE } from '@/consts'

export default function App() {
  return (
    <main className='flex flex-1 min-h-screen px-40 py-10 items-center justify-center'>
      <div className='flex flex-1 flex-col gap-3 items-center justify-center'>
        <h1 className='text-4xl font-extrabold text-black'>Tiberius</h1>
        <p className='text-gray text-base'>Concentre-se no presente, pois é um presente que você recebeu.</p>
        <div className='mt-5'>
          <Link to={LIST_ROUTE}>
            <Button
              text='Começar'
            />
          </Link>
        </div>
      </div>
    </main>
  )
}
