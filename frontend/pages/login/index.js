import React, { useEffect } from 'react'
import Copyright from '../../src/components/Copyright'
import SignIn from '../../features/authentication/SignIn'
import Layout from '../../src/components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import UserContext from '../../src/context/UserContext'
import { useRouter } from 'next/router'
import firebase from '../../firebase/clientApp'


const Login = () => {
    const [user, loading, error] = useAuthState(firebase.auth())
    const router = useRouter()


    useEffect(() => {
        if ((user)) {
            console.log('loading')
            router.push('/')
        }
    }, [user])


    return (
        <SignIn />
    )
}

export default Login