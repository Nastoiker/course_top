import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface LayotProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{
    children: ReactNode,
}