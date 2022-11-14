import { Link } from "react-router-dom"
import Logo from "./Logo"
import './Header.css'

const Header = () => {
  return (
    <header className="header-main">
        <Logo id='logo-header' />
        
        <nav>
            <Link to='/create-account'>Criar Conta</Link>
            <Link to='/login'>Fazer Login</Link>
        </nav>
    </header>
  )
}

export default Header