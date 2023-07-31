import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
    size?: 'low' | 'medium' | 'big',
    children: ReactNode,
}