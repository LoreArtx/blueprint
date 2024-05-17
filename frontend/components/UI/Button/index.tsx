import { cva } from "class-variance-authority";
import { FC } from "react";
import classes from "./Button.module.scss"

interface ButtonProps {
    children: React.ReactNode
}

const Button: FC<ButtonProps> = ({ children }) => {
    return <button>{children}</button>;
}

export default Button;