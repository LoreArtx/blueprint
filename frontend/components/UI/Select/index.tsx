"use client"

import React from 'react';

interface SelectProps {
    label: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, name }) => {
    return (
        <div className="mb-3">
            <label className="block mb-2 text-[15px] font-bold text-gray-700">{label}</label>
            <select
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                className="mt-1 border block w-full pl-3 pr-10 py-3 text-[15px] border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
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
