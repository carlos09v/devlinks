import { ReactNode } from 'react'
import './Social.css'

type SocialProps = {
    url: string
    children: ReactNode
}

const Social = ({ url, children }: SocialProps) => {
  return (
    <a className='social' href={url} rel='noopener noreferrer' target='_blank'>
        {children}
    </a>
  )
}

export default Social