import {SearchProps} from "./Search.props";
import cn from "classnames";
import styles from './Search.module.css'
import {useState, KeyboardEvent } from "react";
import {Button} from "../Button/Button";
import {Input} from '../Input/Input';
import SearchIcon from './search.svg';
import {useRouter} from "next/router";

export const Search = ({ className, children, ...props}: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();
    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search,
            }
        })
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key=='Enter') {
            goToSearch();
        }
    }
    return (
        <form className={cn(className, styles.search)} {...props} role={'search'}>
            <Input className={styles.input}
                   placeholder='поиск'
                   value={search}
                   onChange={(e) => { setSearch(e.target.value)}}
                   onKeyDown={handleKeyDown}

            />
            <Button appearance='primary' className={styles.button} onClick= {goToSearch} aria-label={'искать по сайту'}>
                <SearchIcon />
            </Button>
        </form>
    )
}