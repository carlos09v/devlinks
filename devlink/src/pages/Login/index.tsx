import { FormEvent, useState } from 'react'

import './Login.css'
import Logo from '../../components/Logo'
import Input from '../../components/Input'

import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    // Sistema de Login usando Firebase
    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        // Validar dados
        if (email === '' || senha === '') {
            toast.warn('Preencha todos os campos !')
            return
        }

        signInWithEmailAndPassword(auth, email, senha).then(() => {
            toast.success('Bem vindo(a) de volta :)')
            navigate('/admin', { replace: true })
        }).catch(err => {
            toast.error('Erro ao tentar fazer o login !')
            console.log(err)
        })
    }
    
    return (
        <div className='login-container'>
            <Logo />

            <form onSubmit={handleLogin} className='form'>
                <Input
                    type="email"
                    id="email"
                    placeholder='Digite eu email...'
                    value={email}
                    onChange={(e: FormEvent) => setEmail((e.target as HTMLTextAreaElement).value)}
                />

                <Input
                    type="password"
                    id="password" autoComplete='on' placeholder='*********'
                    value={senha}
                    onChange={(e: FormEvent) => setSenha((e.target as HTMLTextAreaElement).value)}
                />

                <button type="submit">Acessar</button>
            </form>
        </div>
    )
}

export default Login