import { useState, useEffect } from "react"
import { auth } from "../services/firebaseConnection"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"

// Verificação se usuario está logado
const Private = ({ children }: any) => {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    // Efeitos Colaterais
    // Qndo o componente for carregado
    useEffect(() => {
        async function checkLogin() {
            
            onAuthStateChanged(auth, (user) => {
                if(user){
                    // const userData = {
                    //     uid: user.uid,
                    //     email: user.email
                    // }

                    // localStorage.setItem('@detailUser', JSON.stringify(userData))
                    setLoading(false)
                    setSigned(true)
                }else {
                    setLoading(false)
                    setSigned(false)
                }
            })
        }

        checkLogin()
    }, [])
    
    if(loading) {
        return (
            <div></div>
        )
    }

    if(!signed) {
        return <Navigate to='/login'  />
    }

    return children
}

export default Private