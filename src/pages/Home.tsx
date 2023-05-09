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
              className="default-button"
            >
              Começar
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
