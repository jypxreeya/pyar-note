'use client'
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider(props) {
    const { children } = props
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setCurrentUser(null)
        return signOut(auth)
    }

    async function deleteAccount() {
        if (!currentUser) return
        
        try {
            // Delete all user's notes from Firestore
            const notesRef = collection(db, 'users', currentUser.uid, 'notes')
            const snapshot = await getDocs(notesRef)
            
            // Delete each note document
            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref))
            await Promise.all(deletePromises)
            
            // Delete the user's authentication account
            await deleteUser(currentUser)
            
            setCurrentUser(null)
        } catch (error) {
            console.error('Error deleting account:', error)
            throw error
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            setIsLoadingUser(true)
            try {
                setCurrentUser(user)
                if (!user) {
                throw Error('No user found')
                }
                console.log('Found user')

                
 } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoadingUser(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,isLoadingUser,signup, login, logout, deleteAccount
    }

         return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}