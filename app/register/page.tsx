"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"
import { registerUser } from "@/lib/services/auth"
import { toast } from "sonner"
import OtpModal from "@/components/ui/otp-modal"
import { ENDPOINTS } from "@/config/endpoints"
import { verifyOtp } from "@/lib/services/auth"
import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import PublicRoute from "@/components/auth/public-route"


export interface OtpVerifyResponse {
    id: number
    email: string
    role: string | null
    verified: boolean
}

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [registeredEmail, setRegisteredEmail] = useState("")

    const { login } = useAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
            subscribeToNewsletter: true,
        },
    })

    const watchedAgreeToTerms = watch("agreeToTerms")

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true)
        console.log("Submitting registration data:", data)

        try {
            const result = await registerUser(data)
            console.log("Registration result:", result)

            if (result && result.id) {
                setRegisteredEmail(result.email)
                setShowOtpModal(true)
                toast.success("OTP has been sent to your account. Please verify to continue.")
                reset()
            } else {
                toast.error("Registration failed")
            }
        } catch (error) {
            toast.error(
                "Registration failed",
                { description: error instanceof Error ? error.message : "An unexpected error occurred" }
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOtpVerified = async (verifiedUser: any) => {
        // After OTP verification, the user should be automatically logged in
        // The access token cookie will be set by the server
        login(verifiedUser)
        toast.success("Your account has been verified successfully!")
        setShowOtpModal(false)

        // Redirect to dashboard or home page
        router.push('/dashboard') // or wherever you want to redirect after successful registration
    }

    const handleOtpModalClose = () => {
        setShowOtpModal(false)
        reset()
    }

    return (
        <PublicRoute>

        
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
                            {/* Left Side - Registration Form */}
                            <div className="flex-shrink-0 lg:w-[400px]">
                                <Card className="w-full bg-black/50 border-white/10 backdrop-blur-sm">
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-2xl font-semibold text-white">
                                            Create Your Account
                                        </CardTitle>
                                        <CardDescription className="text-white/70">
                                            Get started with AI-powered customer support automation
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
                                                        placeholder="Create a strong password"
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

                                            {/* Confirm Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword" className="text-white/90">
                                                    Confirm Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                                                    <Input
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your password"
                                                        {...register("confirmPassword")}
                                                        className={`pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 ${errors.confirmPassword ? "border-red-400 focus:border-red-400" : ""
                                                            }`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                {errors.confirmPassword && (
                                                    <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
                                                )}
                                            </div>

                                            {/* Checkboxes */}
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="agreeToTerms"
                                                        checked={watchedAgreeToTerms}
                                                        onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                                                        className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                                    />
                                                    <Label htmlFor="agreeToTerms" className="text-sm text-white/80">
                                                        I agree to the{" "}
                                                        <Link href="/terms" className="text-white hover:underline">
                                                            Terms of Service
                                                        </Link>{" "}
                                                        and{" "}
                                                        <Link href="/privacy" className="text-white hover:underline">
                                                            Privacy Policy
                                                        </Link>
                                                    </Label>
                                                </div>
                                                {errors.agreeToTerms && (
                                                    <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
                                                )}

                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="subscribeToNewsletter"
                                                        checked={watch("subscribeToNewsletter")}
                                                        onCheckedChange={(checked) => setValue("subscribeToNewsletter", checked as boolean)}
                                                        className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                                    />
                                                    <Label htmlFor="subscribeToNewsletter" className="text-sm text-white/80">
                                                        Subscribe to our newsletter for product updates and tips
                                                    </Label>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!isValid || isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Creating Account...
                                                    </>
                                                ) : (
                                                    "Create Account"
                                                )}
                                            </Button>
                                        </form>

                                        {/* Separator */}
                                        <div className="my-6">
                                            <Separator className="bg-white/20" />
                                        </div>

                                        {/* Login Link */}
                                        <div className="text-center">
                                            <p className="text-white/70 text-sm">
                                                Already have an account?{" "}
                                                <Link href="/login" className="text-white hover:underline font-medium">
                                                    Sign in
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
                                        Join Replexify
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
                                        Start automating your customer support with AI that sounds human.
                                        Get 90% faster response times across all your platforms.
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
                                        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">90% Faster Responses</h3>
                                        <p className="text-white/70 text-sm">
                                            Automate customer replies in just 10 seconds across all platforms
                                        </p>
                                    </div>
                                    <div className="text-left p-4 lg:p-6 bg-white/5 rounded-lg border border-white/10">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-3 lg:mb-4 flex items-center justify-center">
                                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Human-like AI</h3>
                                        <p className="text-white/70 text-sm">
                                            AI that sounds natural and maintains your brand voice consistently
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
                                            Works with Gmail, Slack, Intercom, Zendesk, and 10+ more platforms
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Benefits */}
                                <div className="mt-8 lg:mt-12 space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-white/80 text-sm lg:text-base">
                                            <strong>Free 14-day trial</strong> - No credit card required to get started
                                        </p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-white/80 text-sm lg:text-base">
                                            <strong>Setup in minutes</strong> - Connect your platforms and start automating
                                        </p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-white/80 text-sm lg:text-base">
                                            <strong>24/7 support</strong> - Our team is here to help you succeed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />

            {/* OTP Modal */}
            <OtpModal
                isOpen={showOtpModal}
                onClose={handleOtpModalClose}
                email={registeredEmail}
                onOtpVerified={handleOtpVerified}
            />
        </div>
        </PublicRoute>
    )
}
