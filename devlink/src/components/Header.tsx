import './Header.css'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { auth } from '../services/firebaseConnection'

const Header = () => {
   async function handleLogOut() {
    // Deslogar usuario
    await signOut(auth)
   }

  return (
    <header>
        <nav>
            <button onClick={handleLogOut}><BiLogOut size={28} color='#DB2629' /></button>

            <Link to='/admin'>Links</Link>
            <Link to='/admin/social'>Redes Sociais</Link>
        </nav>
    </header>
  )
}

export default Header