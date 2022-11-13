import { FormEvent } from 'react'
import './Input.css'

interface InputProps {
    type: string
    id: string
    placeholder: string
    value: string
    onChange?: (e: FormEvent) => void
    autoComplete?: string
}

const Input = (props: InputProps) => {
  return (
    <input className='form-input' {...props} />
  )
}

export default Input