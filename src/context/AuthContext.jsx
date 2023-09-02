import { useContext, createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth'
import { auth } from '../services/firebaseAPI'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
    localStorage.clear()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      localStorage.setItem('user', JSON.stringify(currentUser))
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
