import {LayotProps} from "./Layot.props";
import styles from './Layot.module.css'
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "./Footer/Footer";
import {FunctionComponent, KeyboardEvent, useRef, useState} from "react";
import {AppContextProvider, IAppContext} from "../context/App.context";
import {Up} from "../components";
import cn from "classnames";

const Layot = ({children}: LayotProps): JSX.Element => {
    const [isSkipLinkDisplayed, setSkipLinkDisplayed] = useState<boolean>(false);
    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault();
            ref.current?.focus();
        }
        setSkipLinkDisplayed(false);
    }
    const ref = useRef<HTMLDivElement>(null);
    return (
      <div className={styles.wrapper}>
          <a  onFocus={() => setSkipLinkDisplayed(true)} tabIndex={1} className={cn(styles.skipLink, {
            [styles.displayed]: isSkipLinkDisplayed,
          })}
          onKeyDown={skipContentAction}>сразу к содержанию</a>
          <Header className={styles.header}/>
              <Sidebar className={styles.sidebar}/>
                <main className={styles.body} tabIndex={0} ref={ref} role={'main'}>
                    {children}
                </main>
          <Footer className={styles.footer}/>
          <Up />
      </div>
    )
}
export const withLayot = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayotComponent(props: T): JSX.Element{
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
            <Layot>
            <Component {...props}/>
        </Layot>
    </AppContextProvider>
    );
    }
}