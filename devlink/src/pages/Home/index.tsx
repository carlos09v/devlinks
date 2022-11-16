import './Home.css'
import { useEffect, useState } from 'react'
import Social from '../../components/Social'
import Header from '../../components/Header'

import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

import { getDocs, collection, orderBy, query, getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import HomeLinks from '../../components/HomeLinks'

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
                <HomeLinks href='https://www.youtube.com/' name='Youtube' />

                <HomeLinks href='https://www.linkedin.com/' name='Linkedin' />

                <HomeLinks href='https://www.facebook.com/' name='Facebook' />

                <HomeLinks href='https://twitter.com/' name='Twitter' />

                <HomeLinks href='https://www.instagram.com/' name='Instagram' />

                <HomeLinks href='https://www.twitch.tv/' name='Twitch' />

                <HomeLinks href='https://br.pinterest.com/' name='Pinterest' />

                <HomeLinks href='https://open.spotify.com/' name='Spotify' />

                <HomeLinks href='https://telegram.org/' name='Telegram' />

                <HomeLinks href='https://web.whatsapp.com/' name='Whatsapp' />

                <HomeLinks href='https://discord.com/' name='Discord' />

                <HomeLinks href='https://github.com/' name='GitHub' />

                <HomeLinks href='https://medium.com/' name='Medium' />

                <HomeLinks href='https://www.reddit.com/' name='Reddit' />

                <HomeLinks href='https://stackoverflow.com/' name='Stack Overflow' />

                <HomeLinks href='https://slack.com/intl/pt-br' name='Slack' />

                <HomeLinks href='https://store.steampowered.com/?l=portuguese' name='Steam' />
                
            </main>
        </div>
    )
}

export default Home