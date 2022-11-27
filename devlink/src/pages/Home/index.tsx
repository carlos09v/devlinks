import './Home.css'
import Header from '../../components/Header'

import HomeLinks from '../../components/HomeLinks'

const Home = () => {


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