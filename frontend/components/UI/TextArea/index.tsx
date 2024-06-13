"use client"

import React from 'react';

interface TextareaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, value, onChange, required }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2  border text-sm font-medium text-night">{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="block w-full pl-3 pr-3 py-2 text-night h-[200px] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
        </div>
    );
};

export default Textarea;
