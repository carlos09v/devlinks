import { FormEvent } from 'react'
import './Input.css'

interface InputProps {
  id?: string
  type: string
  placeholder: string
  onChange?: (e: FormEvent) => void
  value?: string
  autoComplete?: string
  maxLength?: number
}

const Input = (props: InputProps) => {
  return (
    <input className='form-input' {...props} />
  )
}

export default Input