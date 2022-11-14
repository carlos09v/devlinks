import './Profile.css'
import { useEffect, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import {query, orderBy, doc, deleteDoc, collection, getDoc, onSnapshot} from 'firebase/firestore' 
import { db } from '../../services/firebaseConnection'

import HeaderAdmin from '../../components/HeaderAdmin'
import Logo from '../../components/Logo'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [id, setId] = useState('')
    const [links, setLinks] = useState([])
    const [inforUser, setInfoUser] = useState<any>({ userName: '', userPhoto: ''})
    const navigate = useNavigate()

    useEffect(() => {
        const detailUser = JSON.parse(localStorage.getItem('@detailUser') || '')
        if (detailUser) {
            const uid = detailUser.uid
            setId(uid)
        }else {
            navigate('/error')
        }

        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        // Get Data Links
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
            
        const docRef = doc(db, 'info-user', 'info')
        getDoc(docRef).then(snapshot => {
            if(snapshot.data()) setInfoUser(snapshot.data())
        })
    }, [])


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

            {
                inforUser !== null ?
                <div className='profile-container'>
                    <div><img src={inforUser.userPhoto} alt={inforUser.userName} /></div>
                    <p>{inforUser.userName}</p>
                </div> :
                <Logo />
            }

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

export default Profile