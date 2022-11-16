

const HomeLinks = ({ href, name }: { href: string, name: string }) => {
    return (
        <section className="link">
            <a href={href} target='_blank'>
                <p className='link_title'>
                    {name}
                </p>
            </a>
        </section>
    )
}

export default HomeLinks