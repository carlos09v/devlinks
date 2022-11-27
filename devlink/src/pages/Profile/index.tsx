import './Profile.css'
import { useEffect, useState } from 'react'
import { query, orderBy, doc, collection, getDoc, limit, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import HeaderAdmin from '../../components/HeaderAdmin'
import Logo from '../../components/Logo'
import Social from '../../components/Social'
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'


const Profile = () => {
    const [id, setId] = useState('')
    const [links, setLinks] = useState([])
    const [infoUser, setInfoUser] = useState<{ userName: any, userPhoto: any }>({ userName: '', userPhoto: '' })
    const [socialLinks, setSocialLinks] = useState<{instagram:  string, twitter: string, gitHub: string}>({ instagram: '', twitter: '', gitHub: '' })
    const navigate = useNavigate()

    const auth = getAuth()
    useEffect(() => {
        // Qndo Autenticado
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                const uid = user.uid
                setId(uid)
            } else {
                navigate('/error')
            }

            // Get DataLinks
            function getDataLinks() {
                const linksRef = collection(db, `users/${user?.uid}/dataLinks`);
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
                if (user?.displayName || user?.photoURL) {
                    setInfoUser({
                        userName: user.displayName,
                        userPhoto: user.photoURL
                    })
                }
            }

            // Get SocialLinks
            const getSocialLinks = () => {
                const docRef = doc(db, `users/${user?.uid}/dataSocial/socialUrls`)
                getDoc(docRef)
                    .then(snapshot => {
                        if (snapshot.data() !== undefined) {
                            setSocialLinks({
                                instagram: snapshot.data()?.instagram,
                                twitter: snapshot.data()?.twitter,
                                gitHub: snapshot.data()?.gitHub
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }

            getUserData()
            getDataLinks()
            getSocialLinks()
        })


    }, [])


    return (
        <div className='admin-container'>
            <HeaderAdmin id={id} />

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

            <div className="socialLinks-area">
                { socialLinks.instagram !== '' &&
                    <Social url={socialLinks.instagram}>
                        <FaInstagram size={35} color='white' />
                    </Social>
                }
                { socialLinks.twitter !== '' &&
                    <Social url={socialLinks.twitter}>
                        <FaTwitter size={35} color='white' />
                    </Social>
                }
                { socialLinks.gitHub !== '' &&
                    <Social url={socialLinks.gitHub}>
                        <FaGithub size={35} color='white' />
                    </Social>
                }     
            </div>
        </div>
    )
}

export default Profile