import {HeaderProps} from "./Header.props";
import cn from "classnames";
import styles from './Header.module.css'
import Logo from '../Logo.svg'
import {ButtonIcon} from '../../components'
import {motion, useReducedMotion} from 'framer-motion';
import {Sidebar} from "../Sidebar/Sidebar";
import {useEffect, useState} from "react";
import {useRouter  } from 'next/router';

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
    const useSlowMotion = useReducedMotion(); 
    const [isOpened, SetIsOpened] = useState<boolean>(false);
    const route = useRouter();
    useEffect(() => {
        SetIsOpened(false)
    }, [route])
    const variants = {
        opened: {
            opacity: 1,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: useSlowMotion ? 1 : 0,
            x: '100%',
        }
    }
    return (
    <header  className={cn(styles.header, className)} {...props} >
        <Logo />
        <ButtonIcon appearance={'white'} icon={"IconMenu"} onClick={() => {
            SetIsOpened(true)
    }}/>
        <motion.div className={styles.mobileMenu} variants={variants} initial={'closed'} animate={isOpened ?'opened' : 'closed'}>
            <Sidebar />
            <ButtonIcon appearance={'white'} icon={"IconClose"} className={styles.buttonClose} onClick={() => {
                SetIsOpened(false)
            }}/>

        </motion.div>
    </header>
    )
}