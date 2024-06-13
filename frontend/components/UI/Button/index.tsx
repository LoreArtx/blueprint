import { FC } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    styles?: string
}

const Button: FC<ButtonProps> = ({ children, onClick, type = "button", styles }) => {
    const buttonStyle = twMerge("w-full text-white bg-lazurite hover:bg-lazurite/70 focus:ring-4 focus:outline-none focus:lazurite font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all flex justify-center items-center",
        styles ? styles : ""
    )
    return (
        <button type={type} onClick={onClick}
            className={buttonStyle}>
            {children}
        </button>
    );
};

export default Button;
