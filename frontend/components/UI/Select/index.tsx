"use client"

import React from 'react';

interface SelectProps {
    label: string;
    value: string;
    id: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, id }) => {
    return (
        <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">{label}</label>
            <select
                value={value}
                onChange={onChange}
                id={id}
                name={id}
                className="mt-1 border block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
