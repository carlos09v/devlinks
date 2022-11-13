import './Error.css'
import { Link } from 'react-router-dom'

import Logo from '../../components/Logo'

const Error = () => {
  return (
    <div className='Error'>
        <Logo />
        <h1>Página não encontrada!</h1>
        <p>Esta página não existe :)</p>

        <Link className='link' to='/'>
          Voltar para Home
        </Link>
    </div>
  )
}

export default Error