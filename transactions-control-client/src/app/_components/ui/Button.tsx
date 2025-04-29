import {ComponentProps} from 'react'
type ButtonProps = {
    children?: React.ReactNode;
} & ComponentProps<"button">
export const Button = ({children, ...props}:ButtonProps) => {
    return (
        <button {...props}>{children}</button>
    )
}