import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { PrivateRouter } from '@/routes/PrivateRouter'
import { DefaultProvider } from '@/routes/DefaultProvider'

import DefaultLayout from '../components/DefaultLayout'
import Error from '../pages/Error'
import App from '../pages/Home'
import Home from '../pages/List'
import SignIn from '../pages/SignIn'

import { LIST_ROUTE, SIGN_IN_ROUTE } from '@/consts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultProvider />}>
      <Route element={<DefaultLayout />}>
        <Route index path="/" element={<App />} errorElement={<Error />} />
        <Route element={<PrivateRouter />}>
          <Route index path={LIST_ROUTE} element={<Home />} errorElement={<Error />} />
        </Route>

        <Route path={SIGN_IN_ROUTE} element={<SignIn />} errorElement={<Error />} />
      </Route>
    </Route>
  )
)

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
