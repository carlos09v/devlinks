import './Home.css'
import { useEffect, useState } from 'react'
import Social from '../../components/Social'

import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

import { getDocs, collection, orderBy, query, getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

const Home = () => {
    const [links, setLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState<any>({})

    // Qndo o componente carregar, executa o useEffect
    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, 'links')
            const queryRef = query(linksRef, orderBy('created', 'asc'))

            // Get Links
            getDocs(queryRef)
                .then((snapshot) => {
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
        }

        loadLinks()
    }, [])

    useEffect(() => {
        // Get SocialLinks
        function loadSocialLinks() {
            const docRef = doc(db, 'social', 'link')

            getDoc(docRef)
                .then(snapshot => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            instagram: snapshot.data()?.instagram,
                            twitter: snapshot.data()?.twitter,
                            gitHub: snapshot.data()?.gitHub
                        })
                    }
                })
        }

        loadSocialLinks()
    }, [])

    return (
        <div className='home-container'>
            <h1>Carlos Vinicius</h1>
            <span>@carlos09v</span>

            <main className='links'>

                {links.map((item: any) => (
                    <section key={item.id} className='link-area' style={{ backgroundColor: item.bg }}>
                        <a href={item.url} target='_blank'>
                            <p className='link-text' style={{ color: item.color }}>{item.name}</p>
                        </a>
                    </section>
                ))}

                {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                    <footer>
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color='white' />
                        </Social>

                        <Social url={socialLinks?.twitter}>
                            <FaTwitter size={35} color='white' />
                        </Social>

                        <Social url={socialLinks?.gitHub}>
                            <FaGithub size={35} color='white' />
                        </Social>
                    </footer>
                )}
            </main>
        </div>
    )
}

export default Home