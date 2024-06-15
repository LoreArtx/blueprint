"use client"

import React, { ChangeEvent, FC } from 'react'
import { twMerge } from 'tailwind-merge';

interface InputProps {
    type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
    label: string
    value: string | number
    name: string
    placeholder: string
    error?: boolean
    disabled?: boolean
    required?: boolean
    styles?: string
    // eslint-disable-next-line no-unused-vars
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
    styles,
    onChange,
}) => {

    const inputClassName = twMerge(
        'bg-white border text-night text-[15px] rounded-lg focus:ring-lazurite focus:border-lazurite block w-full p-2.5',
        error ? 'border-error' : 'border-gray-300',
        disabled && 'bg-disabled cursor-not-allowed',
        styles ? styles : "",
    );


    return (
        <div className="mb-3">
            <label htmlFor={name} className="block mb-2 text-[15px] font-bold text-night">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                className={inputClassName}
                required={required}
            />
        </div>
    );
}

export default Input