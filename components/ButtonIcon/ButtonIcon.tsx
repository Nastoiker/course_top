import {ButtonIconProps, icons} from "./ButtonIcon.props";
import styles from "./ButtonIcon.module.css"
import cn from 'classnames';
export const ButtonIcon = ({appearance, className, icon, ...props}: ButtonIconProps): JSX.Element => {
    const IconCurrent = icons[icon];
    return (
        <button
            className={cn(styles.button, className, {
            [styles.primary]: appearance == 'primary',
            [styles.ghost]: appearance == 'white',
            })}
            {...props}
        >
                <IconCurrent />
    </button>
    )
};