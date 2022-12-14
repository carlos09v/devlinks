import './Admin.css'
import { FormEvent, useEffect, useState } from 'react'
import { MdAddLink } from 'react-icons/md'
import { toast } from 'react-toastify'

import HeaderAdmin from '../../components/HeaderAdmin'
import Input from "../../components/Input"
import Logo from "../../components/Logo"

import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [backgroundColorInput, setBackgroundColorInput] = useState('#fff')
  const [textColorInput, setTextColorInput] = useState('#121212')

  const [id, setId] = useState('')
  const navigate = useNavigate()

  // Qndo o componente carregar, executa o useEffect
  const auth = getAuth()
  const user = auth.currentUser
  useEffect(() => {
      if(user?.uid) {
        const uid = user.uid
        setId(uid)
      }else {
        navigate('/error')
      }

  }, [])

  // Enviar dados pro DB
  function handleRegister(e: FormEvent) {
    e.preventDefault()
    // Validar dados
    if (nameInput === '' || urlInput === '') {
      return toast.warn('Preencha todos os campos!')
    }

    // Qndo Autenticado
    onAuthStateChanged(auth, async() => {
      // Criar uma Collection (Coluna) no FireBase e inserir os dados
      const linksRef = collection(db, `users/${id}/dataLinks`);
      // addDoc -> gera ID aleatorio
      addDoc(linksRef, {
        name: nameInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date()
      }).then(() => {
        setNameInput('')
        setUrlInput('')
        setTextColorInput('#121212')
        setBackgroundColorInput('#fff')
        toast.success('Link registrado com sucesso!')
      }).catch(err => {
        console.log(err)
        toast.error('Ops, erro ao salvar o link!')
      })
    })
  }


  return (
    <div className="admin-container">
      <HeaderAdmin id={id} />

      <Logo />

      <form className='form' onSubmit={handleRegister}>
        <label className="label" htmlFor="link">Nome do Link</label>
        <Input
          id="link"
          type="text"
          maxLength={30}
          placeholder="Nome do link..."
          value={nameInput}
          onChange={(e: FormEvent) => setNameInput((e.target as HTMLTextAreaElement).value)}
        />

        <label className="label" htmlFor="url">Url do Link</label>
        <Input
          id="url"
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e: FormEvent) => setUrlInput((e.target as HTMLTextAreaElement).value)}
        />

        <section>
          <div>
            <label className="label right" htmlFor="fundoLink">Fundo do link</label>
            <input
              id="fundoLink"
              type="color"
              value={backgroundColorInput}
              onChange={(e: FormEvent) => setBackgroundColorInput((e.target as HTMLTextAreaElement).value)}
            />
          </div>

          <div>
            <label className="label right" htmlFor="colorLink">Cor do link</label>
            <input
              id="colorLink"
              type="color"
              value={textColorInput}
              onChange={(e: FormEvent) => setTextColorInput((e.target as HTMLTextAreaElement).value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className='preview'>
            <label className='label'>Veja como est?? ficando ????</label>
            <article className='list' style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}>
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button type="submit">Cadastrar <MdAddLink size={24} color='#fff' /></button>
      </form>
    </div>
  )
}

export default Admin