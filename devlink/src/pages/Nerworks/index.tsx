import './Networks.css'
import { FormEvent, useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { MdAddLink } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import HeaderAdmin from '../../components/HeaderAdmin'
import Input from '../../components/Input'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc, deleteDoc, collection, query, limit, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import { toast } from 'react-toastify'

const Networks = () => {
    const [id, setId] = useState('')
    const [links, setLinks] = useState([])

    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [gitHub, setGitHub] = useState('')
    
    const [nameUser, setNameUser] = useState('')
    const [photoUser, setPhotoUser] = useState('')
    const navigate = useNavigate()

    // Qndo o componente carregar, executa o useEffect
    useEffect(() => {
        const detailUser = JSON.parse(localStorage.getItem('@detailUser') || '')
        if (detailUser) {
            const uid = detailUser.uid
            setId(uid)
        } else {
            navigate('/error')
        }

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

        // Get SocialLink
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


        // Get Links
        function getLinks() {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"), limit(7));
    
            // Watch Data Links
            onSnapshot(queryRef, (snapshot) => {
                    let lista: any = [];
    
                    snapshot.forEach((doc: any) => {
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
        }

        getLinks()
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

    // Deletar Link
    const handleDeleteLink = async (id: string) => {
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
    }

    return (
        <div className='admin-container'>
            {
                id !== null && <HeaderAdmin />
            }

            <div className='config-container'>
                <div>
                    <h1 className='title-data'>Suas Informações:</h1>
                    <form onSubmit={handleSaveUser} className='form'>
                        <label className='label' htmlFor="user">Nome de usuário:</label>
                        <Input
                            type='text'
                            id='user'
                            maxLength={30}
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

            <h2 className='title'>Veja meus links abaixo 👇</h2>
            {links.map((item: any) => (
                <article key={item.id} className='list animate-pop' style={{ backgroundColor: item.bg, color: item.color }}>
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

export default Networks