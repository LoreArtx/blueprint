"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'

const SignUpPage = () => {
    const router = useRouter()
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })

        if (res.ok) {
            await signIn('credentials', { redirect: false, email: form.email, password: form.password })
            router.push('/profile')
        } else {
            const data = await res.json()
            setError(data.message || 'Something went wrong')
        }
    }

    return (
        <section className="flex items-center justify-center min-h-screen bg-milk">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-night md:text-2xl">
                    Create an account <a href='http://localhost:3000/signin' className='float-right text-blue-500 focus:outline-none text-[12px]'>I already have an account</a>
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="text-error">{error}</div>}
                    <Input
                        type="text"
                        label="Your Name"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        error={!!error}
                        required
                    />
                    <Input
                        type="email"
                        label="Your Email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!error}
                        required
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        error={!!error}
                        required
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        error={!!error}
                        required
                    />
                    <Button type="submit">Create an account</Button>
                </form>
            </div>
        </section>
    )
}

export default SignUpPage
