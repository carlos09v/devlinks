import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Input from '../../components/Input'
import Logo from '../../components/Logo'
import './CreateAccount.css'

const CreateAccount = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser
  // Navigate to Admin if Autenticated
  useEffect(() => {
      if (user?.uid) {
        toast.warn('Você está logado !')
        navigate('/admin')
      }
      
  }, [])

  const [userDataRegister, setUserDataRegister] = useState({ email: '', password: '', confirmPassword: '' })

  // Cadastrar
  function handleRegister(e: FormEvent) {
    e.preventDefault()

    // Validar Dados
    if (userDataRegister.email === '' || userDataRegister.password === '' || userDataRegister.confirmPassword === '') return toast.warn('Preencha todos os campos!')

    if (userDataRegister.password.length < 6) return toast.warn('A senha precisa ter no mínimo 6 caracteres !')
    
    if (userDataRegister.password !== userDataRegister.confirmPassword) return toast.warn('As senha não conferem !')
    

    // Cadastrar Usuario no DB
    createUserWithEmailAndPassword(auth, userDataRegister.email, userDataRegister.password)
      .then(() => {
        toast.success('Usuário cadastrado com sucesso :)')
        navigate('/login', { replace: true })
      }).catch(err => {
        toast.error('Falha ao criar conta :(')
        console.log(err)
      })
  }

  return (
    <div className='login-container'>
      <Logo />

      <form className='form' onSubmit={handleRegister}>
        <Input
          placeholder='Digite o seu email'
          type='email'
          onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, email: (e.target as HTMLTextAreaElement).value })}
        />

        <Input
          placeholder='Digite a sua senha'
          autoComplete='on'
          type='password'
          onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, password: (e.target as HTMLTextAreaElement).value })}
        />

        <Input
          placeholder='Confirme a sua senha'
          autoComplete='on'
          type='password'
          onChange={(e: FormEvent) => setUserDataRegister({ ...userDataRegister, confirmPassword: (e.target as HTMLTextAreaElement).value })}
        />

        <button type='submit'>Criar conta</button>
      </form>

      <p id='accessLogin-link'>Já possui uma conta? <Link to='/login'>Clique aqui para acessar.</Link></p>
    </div>
  )
}

export default CreateAccount