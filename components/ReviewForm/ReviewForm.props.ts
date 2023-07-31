import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ReviewModel} from "../../interfaces/product.interfaces";

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    productId: string;
    isOpened: boolean;
}