import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    size?: 'low' | 'medium';
    children: ReactNode;
    color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
    href?: string;
}