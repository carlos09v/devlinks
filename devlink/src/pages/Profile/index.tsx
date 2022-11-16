import './Profile.css'
import { useEffect, useState } from 'react'
import { query, orderBy, doc, collection, getDoc, limit, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import HeaderAdmin from '../../components/HeaderAdmin'
import Logo from '../../components/Logo'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [id, setId] = useState('')
    const [links, setLinks] = useState([])
    const [inforUser, setInfoUser] = useState<any>({ userName: '', userPhoto: '' })
    const navigate = useNavigate()

    useEffect(() => {
        const detailUser = JSON.parse(localStorage.getItem('@detailUser') || '')
        if (detailUser) {
            const uid = detailUser.uid
            setId(uid)
        } else {
            navigate('/error')
        }

        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"), limit(7));

        // Get Data Links
        getDocs(queryRef)
            .then((snapshot) => {
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
            if (snapshot.data()) setInfoUser(snapshot.data())
        })
    }, [])


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

            <main className='links'>
                <h2 className='title'>Veja meus links abaixo 👇</h2>
                {links.map((item: any) => (
                    <section
                        key={item.id}
                        className="link-area animate-pop"
                        style={{ backgroundColor: item.bg }}
                    >
                        <a href={item.url} target="blank">
                            <p className="link-text" style={{ color: item.color }}>
                                {item.name}
                            </p>
                        </a>
                    </section>
                ))}
            </main>
        </div>
    )
}

export default Profile