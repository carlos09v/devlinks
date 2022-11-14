import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Error from './pages/Error'

import Private from './routes/Private'
import Networks from './pages/Nerworks'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/create-account',
    element: <CreateAccount />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Private> <Admin /> </Private>
  },
  {
    path: '/my-links/:id',
    element: <Profile />
  },
  {
    path: '/manage-account',
    element: <Private> <Networks /> </Private>
  },
  {
    // Rota ñ esperada (Not Found)
    path: '*',
    element: <Error />
  }
])

export { router }