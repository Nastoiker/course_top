import {ParagraphProps} from "./Paragraph.props";
import cn from "classnames";
import styles from './Paragraph.module.css'

export const Paragraph = ({size = 'medium', className, children, ...props}: ParagraphProps): JSX.Element => {
    return (
        <p className={cn(styles.p, className, {
            [styles.low]: size == 'low',
            [styles.medium]: size == 'medium',
            [styles.big]: size == 'big',
        })}
           {...props}>
            {children}
        </p>
    )
}