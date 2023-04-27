import { Link } from 'react-router-dom'

import { SIGN_IN_ROUTE } from '@/consts'

export default function App() {
  return (
    <main className="flex flex-1 px-40 py-10 items-center justify-center">
      <div className="flex flex-1 flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-black ">Tiberius</h1>
        <p className="text-gray text-center">Concentre-se no presente, pois é um presente que você recebeu.</p>
        <div className="mt-4">
          <Link to={SIGN_IN_ROUTE}>
            <button
              className={
                'py-2 px-5 bg-primary hover:text-black border-default rounded-default text-white hover: transition-colors shadow-default lowercase'
              }
            >
              Começar
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
