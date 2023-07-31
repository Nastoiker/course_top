import {withLayot} from "../../Layout/Layot";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {firstLevelMenu} from "../../helpers/helpers";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interfaces";
import {TopPageModel} from "../../interfaces/top-page.interface";
import {ProductModel} from "../../interfaces/product.interfaces";

export function Type({firstCategory}:TypeProps) {
    return (
        <>
            Type: {firstCategory}
        </>
    )
}
export default withLayot(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => '/' + m.route),
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps<TypeProps> = async () => {
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
interface TypeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}
