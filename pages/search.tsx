import {Htag} from "../components";
import {withLayot} from "../Layout/Layot";
import {GetStaticProps, GetStaticPropsContext} from "next";
import {firstLevelMenu} from "../helpers/helpers";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interfaces";
import {TopPageModel} from "../interfaces/top-page.interface";
import {ProductModel} from "../interfaces/product.interfaces";

export function Search():JSX.Element {
    return (
        <>
            <Htag tag="h1">Вы попали неа Search Страницу</Htag>
        </>
    )
}
export default withLayot(Search);
export const getStaticProps: GetStaticProps<HomeProps>= async () => {
    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    }
};
interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}