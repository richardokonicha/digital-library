import { useContext, useEffect } from 'react'
import Header from './Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../../firebase/clientApp'
import UserContext from '../context/UserContext'
import { useRouter } from 'next/router'


const Layout = ({ children }) => {
    const router = useRouter()
    const [user, loading, error] = useAuthState(firebase.auth())

    useEffect(() => {
        if (!(user || loading)) {
            router.push('/login')
        }
    }, [user, loading])

    return (
        <div>
            {loading ? (<h2>loading</h2>) : (<h3>finished loading</h3>)}
            {user ? (
                <div>
                    <UserContext.Provider value={user}>
                        <Header></Header>
                        {children}
                    </UserContext.Provider>
                </div>

            ) : (<div>Loading</div>)
            }
        </div>
    )
}

export default Layout