import './Networks.css'
import { FormEvent, useEffect, useState } from 'react'
import { MdAddLink } from 'react-icons/md'

import Header from '../../components/Header'
import Input from '../../components/Input'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify'

const Networks = () => {
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [gitHub, setGitHub] = useState('')

    // Qndo o componente carregar, executa o useEffect
    useEffect(() => {
        // Get Link
        function loadLinks() {
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
                .then((snapshot) => {
                    if(snapshot.data() !== undefined) {
                        setInstagram(snapshot.data()?.instagram)
                        setTwitter(snapshot.data()?.twitter)
                        setGitHub(snapshot.data()?.gitHub)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

        loadLinks()
    }, [])

    // Salvar Links
    function handleSave(e: FormEvent) {
        e.preventDefault()

        // Salvar
        setDoc(doc(db, 'social', 'link'), {
            gitHub: gitHub,
            instagram: instagram,
            twitter: twitter
        }).then(() => {
            toast.success('Urls salvas com sucesso!')
        }).catch(err => {
            toast.error('Erro ao salvar Urls!')
            console.log(err)
        })
    }

  return (
    <div className='admin-container'>
        <Header />

        <h1 className='title-social'>Suas redes sociais</h1>
        <form className='form' onSubmit={handleSave}>
            <label className='label' htmlFor="insta">Link do Intagram:</label>
            <Input 
                type='text'
                id='insta'
                placeholder='Digite a url do Instagram...'
                value={instagram}
                onChange={(e: FormEvent) => setInstagram((e.target as HTMLTextAreaElement).value)}
            />
            <label className='label' htmlFor="twitt">Link do Twitter:</label>
            <Input 
                type='text'
                id='twitt'
                placeholder='Digite a url do Twitter...'
                value={twitter}
                onChange={(e: FormEvent) => setTwitter((e.target as HTMLTextAreaElement).value)}
            />
            <label className='label' htmlFor="gitHub">Link do GitHub:</label>
            <Input 
                type='text'
                id='gitHub'
                placeholder='Digite a url do GitHub...'
                value={gitHub}
                onChange={(e: FormEvent) => setGitHub((e.target as HTMLTextAreaElement).value)}
            />

            <button type='submit'>Salvar links <MdAddLink size={24} color='#fff' /> </button>
        </form>
    </div>
  )
}

export default Networks