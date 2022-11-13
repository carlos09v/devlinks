import './Admin.css'
import { FormEvent, useEffect, useState } from 'react'
import { MdAddLink } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'

import Header from "../../components/Header"
import Input from "../../components/Input"
import Logo from "../../components/Logo"

import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

const Admin = () => {
  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [backgroundColorInput, setBackgroundColorInput] = useState('#fff')
  const [textColorInput, setTextColorInput] = useState('#121212')

  const [links, setLinks] = useState([])

  // Qndo o componente carregar, executa o useEffect
  useEffect(() => {
    const linksRef = collection(db, 'links')
    const queryRef = query(linksRef, orderBy('created', 'asc'))

    // Realtime
    // onSnapShot => observar o DB
    onSnapshot(queryRef, (snapshot) => {
      let lista: any = []

      snapshot.forEach(doc => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista)
    })
  }, [])

  // Enviar dados pro DB
  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    // Validar dados
    if (nameInput === '' || urlInput === '') {
      toast.warn('Preencha todos os campos!')
      return
    }

    // Criar uma Collection (Coluna) no FireBase e inserir os dados
    // addDoc -> gera ID aleatorio
    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    }).then(() => {
      setNameInput('')
      setUrlInput('')
      toast.success('Link registrado com sucesso!')
    }).catch(err => {
      console.log(err)
      toast.error('Ops, erro ao salvar o link!')
    })

  }

  // Deletar Link
  const handleDeleteLink = async (id: string) => {
    const docRef = doc(db, 'links', id)
    await deleteDoc(docRef)
  }


  return (
    <div className="admin-container">
      <Header />

      <Logo />

      <form className='form' onSubmit={handleRegister}>
        <label className="label" htmlFor="link">Nome do Link</label>
        <Input
          id="link"
          type="text"
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
            <label className='label'>Veja como está ficando 👇</label>
            <article className='list' style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}>
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button type="submit">Cadastrar <MdAddLink size={24} color='#fff' /></button>
      </form>

      <h2 className='title'>Meus Links</h2>
      {links.map((item: any, index) => (
        <article key={index} className='list animate-pop' style={{ backgroundColor: item.bg, color: item.color }}>
          <p>{item.name}</p>
          <div>
            <button onClick={() => handleDeleteLink(item.id)}>
              <FiTrash2 size={18} color='#fff' />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Admin