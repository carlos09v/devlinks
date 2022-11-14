import './Networks.css'
import { FormEvent, useEffect, useState } from 'react'
import { MdAddLink } from 'react-icons/md'

import HeaderAdmin from '../../components/HeaderAdmin'
import Input from '../../components/Input'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify'

const Networks = () => {
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [gitHub, setGitHub] = useState('')
    
    const [nameUser, setNameUser] = useState('')
    const [photoUser, setPhotoUser] = useState('')

    // Qndo o componente carregar, executa o useEffect
    useEffect(() => {
        // Get UserData
        function loadDataUser() {
            const docRef = doc(db, 'info-user', 'info')
            getDoc(docRef)
                .then((snapshot) => {
                    if(snapshot.data() !== undefined) {
                        setNameUser(snapshot.data()?.userName)
                        setPhotoUser(snapshot.data()?.userPhoto)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

        // Get Link
        function loadLinks() {
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setInstagram(snapshot.data()?.instagram)
                        setTwitter(snapshot.data()?.twitter)
                        setGitHub(snapshot.data()?.gitHub)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

        loadLinks()
        loadDataUser()
    }, [])

    // Salvar dados do usuário
    function handleSaveUser(e: FormEvent) {
        e.preventDefault()
        
        if(nameUser === '' || photoUser === '') {
            toast.warn('Preencha todos os campos!')
            return
        }

        setDoc(doc(db, 'info-user', 'info'), {
            userName: nameUser,
            userPhoto: photoUser
        }).then(() => {
            toast.success('Informação do usuário atualizadas com sucesso !')
        }).catch(err => {
            console.log(err)
            toast.error('Erro ao atualizar as informações do usuário !')
        })
    }

    // Salvar Links
    function handleSaveLinks(e: FormEvent) {
        e.preventDefault()

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
            <HeaderAdmin />

            <div className='config-container'>
                <div>
                    <h1 className='title-data'>Suas Informações:</h1>
                    <form onSubmit={handleSaveUser} className='form'>
                        <label className='label' htmlFor="user">Nome de usuário:</label>
                        <Input
                            type='text'
                            maxlength={30}
                            id='user'
                            placeholder='@...'
                            value={nameUser}
                            onChange={(e: FormEvent) => setNameUser((e.target as HTMLTextAreaElement).value)}
                        />
                        <label className='label' htmlFor="photo">Foto de perfil:</label>
                        <Input
                            type='url'
                            id='photo'
                            placeholder='URL da imagem de perfil'
                            value={photoUser}
                            onChange={(e: FormEvent) => setPhotoUser((e.target as HTMLTextAreaElement).value)}
                        />
                        <button type='submit'>Atualizar dados</button>
                    </form>
                </div>

                <div>
                    <h1 className='title-data'>Suas redes sociais:</h1>
                    <form className='form' onSubmit={handleSaveLinks}>
                        <label className='label' htmlFor="insta">Link do Intagram:</label>
                        <Input
                            type='url'
                            id='insta'
                            placeholder='Digite a url do Instagram...'
                            value={instagram}
                            onChange={(e: FormEvent) => setInstagram((e.target as HTMLTextAreaElement).value)}
                        />
                        <label className='label' htmlFor="twitt">Link do Twitter:</label>
                        <Input
                            type='url'
                            id='twitt'
                            placeholder='Digite a url do Twitter...'
                            value={twitter}
                            onChange={(e: FormEvent) => setTwitter((e.target as HTMLTextAreaElement).value)}
                        />
                        <label className='label' htmlFor="gitHub">Link do GitHub:</label>
                        <Input
                            type='url'
                            id='gitHub'
                            placeholder='Digite a url do GitHub...'
                            value={gitHub}
                            onChange={(e: FormEvent) => setGitHub((e.target as HTMLTextAreaElement).value)}
                        />
                        <button type='submit'>Salvar links <MdAddLink size={24} color='#fff' /> </button>
                    </form>
                </div>
            </div>
                
        </div>
    )
}

export default Networks