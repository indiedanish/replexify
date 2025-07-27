"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginUser } from "@/lib/services/auth"
import { useAuth } from "@/lib/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Login form schema
const loginSchema = {
    email: (value: string) => {
        if (!value) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email"
        return true
    },
    password: (value: string) => {
        if (!value) return "Password is required"
        if (value.length < 6) return "Password must be at least 6 characters"
        return true
    }
}

interface LoginFormData {
    email: string
    password: string
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true)

        try {
            const result = await loginUser(data.email, data.password)

            if (result && result.id) {
                login(result)
                toast.success("Login successful!")
                router.push('/dashboard')
            } else {
                toast.error("Login failed")
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Login failed"
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white font-geist">
            {/* Navigation */}
            <Navbar isBannerVisible={false} />

            {/* Main Content */}
            <div className="max-w-[1920px] mx-auto relative px-6 md:px-8 pt-20">
                {/* Hero Section with Gradient Background */}
                <section className="relative rounded-[16px] rounded-all-devices mt-2 mb-6 md:min-h-[calc(100vh-200px)] font-geist text-white flex flex-col">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[16px]">
                        <div
                            className="absolute inset-0 w-full h-full rounded-[16px]"
                            style={{
                                background: "linear-gradient(135deg, #22D3EE 0%, #FF5C28 50%, #FF5C9D 100%)",
                            }}
                        />
                        <div
                            className="absolute inset-0 w-full h-full rounded-[16px]"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.35)",
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative w-full px-4 sm:px-6 lg:px-8 pt-[38px] sm:pt-[50px] pb-8 md:pt-[70px] md:pb-12 z-10 flex flex-col h-full">
                        {/* Back to Home Link */}
                        <div className="flex justify-start mb-8">
                            <Link
                                href="/"
                                className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                        </div>

                        {/* Main Layout - Left Content, Right Form */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly gap-8 lg:gap-12">
                            {/* Left Side - Login Form */}
                            <div className="flex-shrink-0 lg:w-[400px]">
                                <Card className="w-full bg-black/50 border-white/10 backdrop-blur-sm">
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-2xl font-semibold text-white">
                                            Welcome Back
                                        </CardTitle>
                                        <CardDescription className="text-white/70">
                                            Sign in to your Replexify account
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-white/90">
                                                    Email Address
                                                </Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="john@company.com"
                                                        {...register("email")}
                                                        className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 ${errors.email ? "border-red-400 focus:border-red-400" : ""
                                                            }`}
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                                                )}
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-white/90">
                                                    Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        {...register("password")}
                                                        className={`pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 ${errors.password ? "border-red-400 focus:border-red-400" : ""
                                                            }`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                {errors.password && (
                                                    <p className="text-red-400 text-sm">{errors.password.message}</p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Signing In...
                                                    </>
                                                ) : (
                                                    "Sign In"
                                                )}
                                            </Button>
                                        </form>

                                        {/* Separator */}
                                        <div className="my-6">
                                            <Separator className="bg-white/20" />
                                        </div>

                                        {/* Register Link */}
                                        <div className="text-center">
                                            <p className="text-white/70 text-sm">
                                                Don't have an account?{" "}
                                                <Link href="/register" className="text-white hover:underline font-medium">
                                                    Sign up
                                                </Link>
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Side - Content */}
                            <div className="flex-1 lg:max-w-[600px]">
                                {/* Header */}
                                <div className="mb-8 lg:mb-12">
                                    <h1
                                        className="font-semibold mb-4 overflow-visible select-text heading-with-selection text-left lg:text-left"
                                        style={{
                                            fontSize: "clamp(32px, 6vw, 64px)",
                                            lineHeight: "1.1",
                                            letterSpacing: "clamp(-1px, -0.02em, -2px)",
                                            fontFamily: 'var(--font-geist-sans), "GeistSans Fallback", sans-serif',
                                            color: "#FFFFFF",
                                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                                        }}
                                    >
                                        Welcome Back to Replexify
                                    </h1>
                                    <p
                                        className="h-auto select-text mb-6 text-left lg:text-left"
                                        style={{
                                            fontFamily: 'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                                            fontSize: "clamp(16px, 3vw, 20px)",
                                            lineHeight: "1.4",
                                            fontWeight: "400",
                                            letterSpacing: "normal",
                                            color: "#FFFFFF",
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        Continue managing your AI-powered customer support automation.
                                        Get back to optimizing response times and improving customer satisfaction.
                                    </p>
                                </div>

                                {/* Features Preview */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                                    <div className="text-left p-4 lg:p-6 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mb-3 lg:mb-4 flex items-center justify-center">
                                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Fast Response Times</h3>
                                        <p className="text-white/70 text-sm">
                                            Continue delivering 90% faster responses across all platforms
                                        </p>
                                    </div>
                                    <div className="text-left p-4 lg:p-6 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-3 lg:mb-4 flex items-center justify-center">
                                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Smart Automation</h3>
                                        <p className="text-white/70 text-sm">
                                            Your AI continues learning and improving responses
                                        </p>
                                    </div>
                                    <div className="text-left p-4 lg:p-6 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg mb-3 lg:mb-4 flex items-center justify-center">
                                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Multi-Platform</h3>
                                        <p className="text-white/70 text-sm">
                                            Manage all your integrations from one dashboard
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />
                </section>
            </div>
        </div>
    )
}