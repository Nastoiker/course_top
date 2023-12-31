
import React, {useState} from 'react';
 import {withLayot} from "../../Layout/Layot";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from 'axios';
import {MenuItem} from "../../interfaces/menu.interfaces";
import {TopLevelCategory, TopPageModel} from "../../interfaces/top-page.interface";
import { ParsedUrlQuery } from 'querystring';
import {ProductModel} from "../../interfaces/product.interfaces";
import {firstLevelMenu} from "../../helpers/helpers";
import {TopPageComponent} from "../../page-components";
import Head from 'next/head'
import {Error404} from "../404";
function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element
{
    if(!page || !products) {
        return <Error404 />
    }
    return (
        <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name={'description'} content={page.metaDescription}/>
                <meta property={'og:title'} content={page.metaTitle}/>
                <meta property={'og:description'} content={page.metaDescription}/>
                <meta property={'og:type'} content={'article'}/>

            </Head>
            <TopPageComponent firstCategory={firstCategory} page={page} products={products} />
        </>
    )
}
export default withLayot(TopPage);
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = []
    for(const m of firstLevelMenu) {
        const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    return {
        paths,
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps<TopPageProps> = async ({params}:GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        }
    }
    try {
    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
        if(!firstCategoryItem) {
            return {
                notFound: true,
            }
    }
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory: firstCategoryItem.id
    });
    if(menu.length == 0) {
        return {
            notFound: true
        }
    }
    const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias );
    const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
        category: page.category,
        limit: 10,
    });
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            }
        }
    }
    catch {
            return {
                notFound: true
            };
        }


};
interface TopPageProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}