import styles from './Menu.module.css'
import {KeyboardEvent, useContext, useReducer} from "react";
import {AppContext} from "../../context/App.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interfaces";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";
import {motion, useReducedMotion} from 'framer-motion';

export const Menu = (): JSX.Element => {
    const useSlowMotion = useReducedMotion();
    const { menu, setMenu, firstCategory} = useContext(AppContext);
    const openSecondLevel = (secondCategoryid: string) => {
        setMenu && setMenu(menu.map((m)=> {
            if(m._id.secondCategory == secondCategoryid) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }))
    }
    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
            if (key.code == 'Space' || key.code == 'Enter') {
                key.preventDefault()
                openSecondLevel(secondCategory);
            }
    }
    const router = useRouter();
    const variants =
    {
        visible: {
            marginBottom: 20,
                transition: useSlowMotion ? {} :  {
                when: 'beforeСhildren',
                    staggerChildren: 0.1,
            }
        },
        hidden: {
            marginBottom: 0
        }
    }

    const variantsChildren = {
        visible: {
        opacity: 1,
            height: 29,
    },
    hidden: {
        opacity: useSlowMotion ? 1 : 0,
            height: 0,
    }
}
    const buildFirstLevel = () => {
        return (
            <>
                {
                    firstLevelMenu.map((m) => (
                        <div key={m.route}>
                            <Link href={`/${m.route}`}>
                                <a>
                                    <div className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]: m.id == firstCategory
                                    })}>
                                        {m.icons}
                                        <span>{m.name}</span>
                                    </div>
                                </a>
                            </Link>

                            {m.id == firstCategory && buildSecondLevel(m)}
                        </div>
                    ))}
            </>
        );
    };
    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock} >
                {menu.map(m => {
                    if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])){
                        m.isOpened = true;
                    }
                    return (
                    <div key={m._id.secondCategory}>
                        <div tabIndex={0}  onKeyDown={(key:KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>
                            {m._id.secondCategory}
                        </div>
                        <motion.div
                            initial={m.isOpened ? 'visible' : 'hidden'}
                            animate={m.isOpened ? 'visible' : 'hidden'}
                            variants={variants}
                            layout className={cn(styles.secondLevelBlock)}>
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </motion.div>
                    </div>
                );
                })}
            </div>
        )
    };
    const buildThirdLevel = (pages: PageItem[], route: string, isOpened= false) => {
        return (pages.map(p => (
            <motion.div key={p._id} variants={variantsChildren}>
                <Link href={`/${route}/${p.alias}`}>
                    <a tabIndex={isOpened ? 0 : -1} className={cn(styles.ThirdLevel, {
                        [styles.ThirdLevelActive]: `/${route}/${p.alias}` == router.asPath}
                    )}>
                        {p.category}
                    </a>
                </Link>
            </motion.div>


        )))
    };

    return (

        <nav role={'navigation'} className={styles.menu}>{
           buildFirstLevel()
        }</nav>
    )
}