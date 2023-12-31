import {TextAreaProps} from "./TextArea.props";
import cn from "classnames";
import styles from './TextArea.module.css'
import {ForwardedRef, forwardRef} from "react";
// eslint-disable-next-line react/display-name
export const TextArea = forwardRef(({className, error,...props}: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(styles.textareaWrapper, className)}>
            <textarea ref={ref} className={cn(className, styles.textarea, {
                [styles.error]: error,
            })} {...props} />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>

    )
});