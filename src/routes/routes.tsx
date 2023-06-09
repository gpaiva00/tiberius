import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { DefaultProvider } from '@/routes/DefaultProvider'
import { PrivateRouter } from '@/routes/PrivateRouter'

import About from '@/pages/about'
import ChangeLog from '@/pages/changeLog'
import Contact from '@/pages/contact'
import Error from '@/pages/error'
import Help from '@/pages/help'
import Home from '@/pages/home'
import List from '@/pages/list'
import Lists from '@/pages/lists'
import ListSettings from '@/pages/listSettings'
import Overview from '@/pages/overview'
import SignIn from '@/pages/signin'
import TermsOfUse from '@/pages/termsOfUse'
import User from '@/pages/user'
import DefaultLayout from '../shared/components/DefaultLayout'

import {
  ABOUT_ROUTE,
  CHANGE_LOG_ROUTE,
  CONTACT_ROUTE,
  HELP_ROUTE,
  LIST_ROUTE,
  LIST_SETTINGS_ROUTE,
  LISTS_ROUTE,
  OVERVIEW_ROUTE,
  SIGN_IN_ROUTE,
  TERMOS_OF_USE_ROUTE,
  USER_ROUTE,
} from '@/consts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<DefaultProvider />}
      errorElement={<Error />}
    >
      <Route
        index
        path="/"
        element={<Home />}
        errorElement={<Error />}
      />
      <Route
        path="*"
        element={<Error />}
      />
      <Route element={<DefaultLayout />}>
        <Route element={<PrivateRouter />}>
          <Route
            index
            path={OVERVIEW_ROUTE}
            element={<Overview />}
            errorElement={<Error />}
          />
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
