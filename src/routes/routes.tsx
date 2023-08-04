import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { DefaultProvider } from '@/routes/DefaultProvider'
import { PrivateRouter } from '@/routes/PrivateRouter'

import About from '@/pages/about'
import AppSettings from '@/pages/appSettings'
import ChangeLog from '@/pages/changeLog'
import Contact from '@/pages/contact'
import Error from '@/pages/error'
import Home from '@/pages/home'
import Lists from '@/pages/lists'
import ListSettings from '@/pages/listSettings'
import Overview from '@/pages/overview'
import Profile from '@/pages/profile'
import SignIn from '@/pages/signin'
import Tasks from '@/pages/tasks'
import TermsOfUse from '@/pages/termsOfUse'
import DefaultLayout from '../shared/components/DefaultLayout'

import {
  ABOUT_ROUTE,
  APP_SETTINGS_ROUTE,
  CHANGE_LOG_ROUTE,
  CONTACT_ROUTE,
  LIST_ROUTE,
  LIST_SETTINGS_ROUTE,
  LISTS_ROUTE,
  NOTIFICATIONS_ROUTE,
  OVERVIEW_ROUTE,
  SIGN_IN_ROUTE,
  TERMOS_OF_USE_ROUTE,
  USER_ROUTE,
} from '@/constants'
import Notifications from '@/pages/Notifications'
import { useEffect } from 'react'

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
            path={APP_SETTINGS_ROUTE}
            element={<AppSettings />}
            errorElement={<Error />}
          />
          <Route
            path={NOTIFICATIONS_ROUTE}
            element={<Notifications />}
            errorElement={<Error />}
          />
          <Route
            index
            path={OVERVIEW_ROUTE}
            element={<Overview />}
            errorElement={<Error />}
          />
          <Route
            path={LIST_ROUTE}
            element={<Tasks />}
            errorElement={<Error />}
          />
          <Route
            path={LISTS_ROUTE}
            element={<Lists />}
            errorElement={<Error />}
          />
          <Route
            path={USER_ROUTE}
            element={<Profile />}
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
        {/* <Route
          path={HELP_ROUTE}
          element={<Help />}
          errorElement={<Error />}
        /> */}
      </Route>
    </Route>
  )
)

export default function AppRoutes() {
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification.')
    } else {
      // Notification.requestPermission()
    }
  }, [])

  return <RouterProvider router={router} />
}
