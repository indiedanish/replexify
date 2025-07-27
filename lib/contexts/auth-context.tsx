"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { UserProfile, getCurrentUser, logoutUser } from '@/lib/services/auth'
import { toast } from 'sonner'

interface AuthContextType {
    user: UserProfile | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (userData: UserProfile) => void
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const login = (userData: UserProfile) => {
        setUser(userData)
    }

    const logout = async () => {
        try {
            await logoutUser()
            setUser(null)
            toast.success('Logged out successfully')
        } catch (error) {
            console.error('Logout error:', error)
            // Still clear user state even if API call fails
            setUser(null)
        }
    }

    const refreshUser = async () => {
        try {
            const userData = await getCurrentUser()
            setUser(userData)
        } catch (error) {
            console.error('Failed to get current user:', error)
            setUser(null)
        }
    }

    useEffect(() => {
        // Check authentication status on app load
        refreshUser().finally(() => {
            setIsLoading(false)
        })
    }, [])

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 