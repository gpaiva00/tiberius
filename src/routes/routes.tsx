import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { PrivateRouter } from '@/routes/PrivateRouter'
import { DefaultProvider } from '@/routes/DefaultProvider'

import DefaultLayout from '../components/DefaultLayout'
import Error from '../pages/Error'
import App from '../pages/Home'
import List from '../pages/List'
import SignIn from '../pages/SignIn'
import User from '../pages/User'

import { LIST_ROUTE, SIGN_IN_ROUTE, USER_ROUTE } from '@/consts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<DefaultProvider />}
    >
      <Route element={<DefaultLayout />}>
        <Route
          index
          path="/"
          element={<App />}
          errorElement={<Error />}
        />
        <Route element={<PrivateRouter />}>
          <Route
            path={LIST_ROUTE}
            element={<List />}
            errorElement={<Error />}
          />
          <Route
            path={USER_ROUTE}
            element={<User />}
            errorElement={<Error />}
          />
        </Route>

        <Route
          path={SIGN_IN_ROUTE}
          element={<SignIn />}
          errorElement={<Error />}
        />
      </Route>
    </Route>
  )
)

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
