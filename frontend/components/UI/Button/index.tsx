import { FC } from "react";
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ children, onClick, type = "button" }) => {
    return (
        <button type={type} onClick={onClick}
            className="w-full text-white bg-lazurite hover:bg-info focus:ring-4 focus:outline-none focus:ring-info font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            {children}
        </button>
    );
};

export default Button;
