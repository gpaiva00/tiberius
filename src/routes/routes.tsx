import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { PrivateRouter } from '@/routes/PrivateRouter'
import { DefaultProvider } from '@/routes/DefaultProvider'

import DefaultLayout from '../shared/components/DefaultLayout'
import Error from '../pages/error'
import Home from '../pages/home'
import List from '../pages/list'
import SignIn from '../pages/signin'
import User from '../pages/user'
import Lists from '../pages/lists'
import ListSettings from '@/pages/listSettings'
import ChangeLog from '@/pages/changeLog'
import TermsOfUse from '@/pages/termsOfUse'
import Contact from '@/pages/contact'
import About from '@/pages/about'
import Help from '@/pages/help'

import {
  ABOUT_ROUTE,
  HELP_ROUTE,
  LIST_ROUTE,
  LIST_SETTINGS_ROUTE,
  LISTS_ROUTE,
  SIGN_IN_ROUTE,
  TERMOS_OF_USE_ROUTE,
  USER_ROUTE,
} from '@/consts'
import { CHANGE_LOG_ROUTE } from '@/consts'
import { CONTACT_ROUTE } from '@/consts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<DefaultProvider />}
    >
      <Route
        index
        path="/"
        element={<Home />}
        errorElement={<Error />}
      />
      <Route element={<DefaultLayout />}>
        <Route element={<PrivateRouter />}>
          <Route
            path={LIST_ROUTE}
            element={<List />}
            errorElement={<Error />}
          />
          <Route
            path={LISTS_ROUTE}
            element={<Lists />}
            errorElement={<Error />}
          />
          <Route
            path={USER_ROUTE}
            element={<User />}
            errorElement={<Error />}
          />
          <Route
            path={LIST_SETTINGS_ROUTE}
            element={<ListSettings />}
            errorElement={<Error />}
          />
          <Route
            path={CHANGE_LOG_ROUTE}
            element={<ChangeLog />}
            errorElement={<Error />}
          />
        </Route>

        <Route
          path={SIGN_IN_ROUTE}
          element={<SignIn />}
          errorElement={<Error />}
        />
        <Route
          path={TERMOS_OF_USE_ROUTE}
          element={<TermsOfUse />}
          errorElement={<Error />}
        />
        <Route
          path={CONTACT_ROUTE}
          element={<Contact />}
          errorElement={<Error />}
        />
        <Route
          path={ABOUT_ROUTE}
          element={<About />}
          errorElement={<Error />}
        />
        <Route
          path={HELP_ROUTE}
          element={<Help />}
          errorElement={<Error />}
        />
      </Route>
    </Route>
  )
)

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
