import {ComponentProps} from 'react'
type InputProps = {
    children?: React.ReactNode;
} & ComponentProps<"input">
export const Button = ({children, ...props}:InputProps) => {
    return (
        <input {...props}>{children}</input>
    )
}