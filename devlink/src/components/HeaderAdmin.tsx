import './HeaderAdmin.css'
import { BiLogOut } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signOut } from 'firebase/auth'
import { auth } from '../services/firebaseConnection'

const HeaderAdmin = ({ id }: { id?: string}) => {
  const navigate = useNavigate()

  // Deslogar usuario
   async function handleLogOut() {
    await signOut(auth)
      .then(() => {
        toast.success('Usuário deslogado com sucesso !')
        navigate('/')
      }).catch(err => {
        console.log(err)
        toast.error('Erro ao deslogar!')
      })
      
   }

  return (
    <header>
        <nav>
            <button onClick={handleLogOut}><BiLogOut size={28} color='#DB2629' /></button>

            <Link to='/admin'>Criar Links</Link>
            <Link to={`/my-links/${id}`}>Meus Links</Link>
            <Link to='/manage-account'>Gerenciar Conta</Link>
        </nav>
    </header>
  )
}

export default HeaderAdmin