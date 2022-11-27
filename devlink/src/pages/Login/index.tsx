import { FormEvent, useEffect, useState } from 'react'

import './Login.css'
import Logo from '../../components/Logo'
import Input from '../../components/Input'

import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    // Navigate to Admin if Autenticated
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                toast.warn('Você está logado !')
                navigate('/admin')
            }

        })
    }, [])

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    // Sistema de Login usando Firebase
    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        // Validar dados
        if (email === '' || senha === '') {
            toast.warn('Preencha todos os campos !')
            return
        }

        if (senha.length < 6) {
            toast.warn('A senha precisa ter no mínimo 6 caracteres !')
            return
        }

        // Logar
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
                    placeholder='Digite eu email...'
                    value={email}
                    onChange={(e: FormEvent) => setEmail((e.target as HTMLTextAreaElement).value)}
                />

                <Input
                    type="password"
                    autoComplete='on' placeholder='*********'
                    value={senha}
                    onChange={(e: FormEvent) => setSenha((e.target as HTMLTextAreaElement).value)}
                />

                <button type="submit">Acessar</button>
            </form>

            <p id='accessAccount'>Ainda não possui uma conta? <Link to='/create-account'>Clique aqui para criá-la.</Link></p>
        </div>
    )
}

export default Login