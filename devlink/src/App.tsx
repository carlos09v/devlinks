import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Error from './pages/Error'

import Private from './routes/Private'
import Networks from './pages/Nerworks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
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
    path: '/admin/social',
    element: <Private> <Networks /> </Private>
  },
  {
    // Rota ñ esperada (Not Found)
    path: '*',
    element: <Error />
  }
])

export { router }