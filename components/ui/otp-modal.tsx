"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { verifyOtp, resendOtp } from "@/lib/services/auth"

interface OtpModalProps {
    isOpen: boolean
    onClose: () => void
    email: string
    onOtpVerified: (user: any) => void // Updated to pass user data
}

export default function OtpModal({ isOpen, onClose, email, onOtpVerified }: OtpModalProps) {
    const [otp, setOtp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [resendCountdown, setResendCountdown] = useState(0)

    const handleOtpChange = (value: string) => {
        // Only allow numbers and limit to 6 digits
        const numericValue = value.replace(/\D/g, "")
        if (numericValue.length <= 6) {
            setOtp(numericValue)
        }
    }

    const clearOtpInput = () => {
        setOtp("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP")
            return
        }

        setIsSubmitting(true)

        try {
            const result = await verifyOtp(email, otp)
            toast.success("Email verified successfully!")
            clearOtpInput() // Clear input on success
            onOtpVerified(result) // Pass the verified user data
            onClose()
        } catch (error) {
            clearOtpInput() // Clear input on error
            toast.error("Invalid OTP", {
                description: "Please check your email and try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResendOtp = async () => {
        setIsResending(true)
        try {
            await resendOtp(email)

            clearOtpInput() // Clear input when resending
            toast.success("OTP resent successfully!")
            setResendCountdown(60)

            // Start countdown
            const interval = setInterval(() => {
                setResendCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        } catch (error) {
            toast.error("Failed to resend OTP", {
                description: error instanceof Error ? error.message : "Please try again later.",
            })
        } finally {
            setIsResending(false)
        }
    }

    const handleClose = () => {
        clearOtpInput() // Clear input when closing modal
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-black/90 border-white/10 backdrop-blur-sm">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-semibold text-white">
                        Verify Your Email
                    </DialogTitle>
                    <DialogDescription className="text-white/70">
                        We've sent a 6-digit code to <span className="text-white font-medium">{email}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* OTP Input */}
                    <div className="space-y-3">
                        <Label htmlFor="otp" className="text-white/90">
                            6-Digit OTP
                        </Label>
                        <div className="relative">
                            <Input
                                id="otp"
                                type="text"
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => handleOtpChange(e.target.value)}
                                className="text-center text-lg font-mono bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-white/40 focus:ring-white/20"
                                maxLength={6}
                                required
                            />
                        </div>
                        <p className="text-xs text-white/60">
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={otp.length !== 6 || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>

                    {/* Resend OTP */}
                    <div className="text-center">
                        <p className="text-white/60 text-sm mb-2">
                            Didn't receive the code?
                        </p>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleResendOtp}
                            disabled={resendCountdown > 0 || isResending}
                            className="text-white hover:text-white/80 hover:bg-white/10"
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resending...
                                </>
                            ) : resendCountdown > 0 ? (
                                `Resend in ${resendCountdown}s`
                            ) : (
                                "Resend OTP"
                            )}
                        </Button>
                    </div>

                    {/* Back to Registration */}
                    <div className="text-center">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                            className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Registration
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}