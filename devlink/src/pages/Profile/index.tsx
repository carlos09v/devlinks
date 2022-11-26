import './Profile.css'
import { useEffect, useState } from 'react'
import { query, orderBy, doc, collection, getDoc, limit, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import HeaderAdmin from '../../components/HeaderAdmin'
import Logo from '../../components/Logo'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

const Profile = () => {
    const [id, setId] = useState('')
    const [links, setLinks] = useState([])
    const [infoUser, setInfoUser] = useState<{ userName: any , userPhoto: any }>({userName: '', userPhoto: ''})
    const navigate = useNavigate()

    const auth = getAuth()
    const user = auth.currentUser
    useEffect(() => {
        if (user?.uid) {
            const uid = user.uid
            setId(uid)
        } else {
            navigate('/error')
        }

        // Get DataLinks
        const getDataLinks = () => {
            const linksRef = collection(db, `users/${id}/dataLinks`);
            const queryRef = query(linksRef, orderBy("created", "asc"), limit(9));
    
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
        }

        // Get UserData
        const getUserData = () => {
            if(user?.displayName || user?.photoURL) {
                setInfoUser({
                    userName: user.displayName,
                    userPhoto: user.photoURL
                })
            }
        }

        getDataLinks()
        getUserData()
    }, [])


    return (
        <div className='admin-container'>
            <HeaderAdmin />

            {
                infoUser !== null ?
                    <div className='profile-container'>
                        <div>
                            <img src={infoUser.userPhoto} alt={infoUser.userName} />
                        </div>
                        <p>{infoUser.userName}</p>
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