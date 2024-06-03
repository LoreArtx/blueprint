"use client"

import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface MenuItem {
    title: string;
    href?: string;
    icon: any;
    action?: () => void;
    styles?: string
}

interface DropdownMenuProps {
    children: React.ReactNode;
    items: MenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative" ref={menuRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="focus:outline-none cursor-pointer">
                {children}
            </div>
            {isOpen && (
                <ul className="absolute z-10 right-0 mt-2 w-48 bg-white text-night border rounded shadow-lg">
                    {items.map((item) => {
                        return <li key={item.title} className={twMerge("px-4 py-2",
                            item.styles
                                ? item.styles
                                : "hover:bg-gray-200")} onClick={() => setIsOpen(false)}>
                            {item.href ? <Link href={item.href} className="flex items-center">
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                {item.title}
                            </Link> : <div onClick={item.action} className='cursor-pointer'>
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                {item.title}
                            </div>}
                        </li>
                    })}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
