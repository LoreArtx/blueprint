"use client"

import React, { ChangeEvent, FC } from 'react'

interface InputProps {
    type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
    label: string
    value: string | number
    name: string
    placeholder: string
    error: boolean
    disabled?: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
    type,
    label,
    value,
    name,
    placeholder,
    error,
    disabled,
    onChange,
}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} value={value} name={name} placeholder={placeholder} disabled={disabled} onChange={onChange} />
            {error && <p className='text-error'>Input error!</p>}
        </div>
    )
}

export default Input