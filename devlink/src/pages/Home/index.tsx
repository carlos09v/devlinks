import './Home.css'
import { useEffect, useState } from 'react'
import Social from '../../components/Social'
import Header from '../../components/Header'

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
            <Header />

            <h1>Gerador de Links</h1>
            <h2 className='title'>Veja os exemplos de links abaixo 👇</h2>

            <main className='links'>
                <section className='link'>
                    <a href="https://www.youtube.com/">
                        <p className='link_title'>
                            Youtube
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://www.youtube.com/">
                        <p className='link_title'>
                            Linkedin
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://www.facebook.com/">
                        <p className='link_title'>
                            Facebook
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://twitter.com/">
                        <p className='link_title'>
                            Twitter
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://www.instagram.com/">
                        <p className='link_title'>
                            Instagram
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://www.twitch.tv/">
                        <p className='link_title'>
                            Twitch
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://br.pinterest.com/">
                        <p className='link_title'>
                            Pinterest
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://open.spotify.com/">
                        <p className='link_title'>
                            Spotify
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://telegram.org/">
                        <p className='link_title'>
                            Telegram
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://web.whatsapp.com/">
                        <p className='link_title'>
                            Whatsapp
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://discord.com/">
                        <p className='link_title'>
                            Discord
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://github.com/">
                        <p className='link_title'>
                            GitHub
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://medium.com/">
                        <p className='link_title'>
                            Medium
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://www.reddit.com/">
                        <p className='link_title'>
                            Reddit
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://stackoverflow.com/">
                        <p className='link_title'>
                            Stack Overflow
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://slack.com/intl/pt-br">
                        <p className='link_title'>
                            Slack
                        </p>
                    </a>
                </section>
                <section className='link'>
                    <a href="https://store.steampowered.com/?l=portuguese">
                        <p className='link_title'>
                            Steam
                        </p>
                    </a>
                </section>
            </main>
        </div>
    )
}

export default Home