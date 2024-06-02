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
    required?: boolean
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
    required,
    onChange,
}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} value={value} id={name} placeholder={placeholder} disabled={disabled} onChange={onChange} required={required}
                className={`bg-milk border ${error ? 'border-error' : 'border-gray-300'} text-night text-sm rounded-lg focus:ring-lazurite focus:border-lazurite block w-full p-2.5`}
            />
            {error && <p className="mt-2 text-sm text-error">Input error!</p>}
        </div>
    )
}

export default Input