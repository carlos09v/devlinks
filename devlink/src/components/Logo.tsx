import './Logo.css'

import { Link } from 'react-router-dom'

const Logo = ({ id }: { id?: string}) => {
  return (
    <Link to='/'>
        <h1 className='logo' id={id}>Dev<span className='logo-text'>Link</span></h1>
    </Link>
  )
}

export default Logo