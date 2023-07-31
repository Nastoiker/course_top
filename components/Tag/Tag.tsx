import {TagProps} from "./Tag.props";
import cn from "classnames";
import styles from './Tag.module.css'

export const Tag = ({size = 'medium', className, color = 'ghost', href, children, ...props}: TagProps): JSX.Element => {
    return (
        <div className={cn(styles.tag, className, {
            [styles.low]: size == 'low',
            [styles.medium]: size == 'medium',
            [styles.ghost]: color == 'ghost',
            [styles.red]: color == 'red',
            [styles.gray]: color == 'gray',
            [styles.green]: color == 'green',
            [styles.primary]: color == 'primary',
        })}
           {...props}
        >
            {href
            ? <a href={href}>{children}</a>
            : <>{children}</>}
        </div>
    );
};