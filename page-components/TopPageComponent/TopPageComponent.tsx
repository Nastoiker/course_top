import styles from './TopPageComponent.module.css'
import {TopPageComponentProps} from "./TopPage.props";
import {HhData, Htag, Paragraph, Product, Sort, Tag} from "../../components";
import {TopLevelCategory} from "../../interfaces/top-page.interface";
import {Advantage} from "../../components/Advantages/Advantage";
import {SortEnum} from "../../components/Sort/Sort.props";
import {useEffect, useReducer} from "react";
import {SortReducer} from "./sort.reducer";
import {useScrollY} from "../../hooks/useScrollY";

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts, sort}, dispathSort] = useReducer(SortReducer, {products, sort: SortEnum.Rating});
    const y = useScrollY();
    const setSort = (sort: SortEnum) => {
        dispathSort({ type: sort});
    };
    useEffect(()=>{
        dispathSort({type: 'reset', initialState: products})
    }, [products])
    return (
        <div className={styles.wrapper}>
            {y}
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='gray' size='medium' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p}/>))}
            </div>
            <div className={styles.HhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='medium'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'>Преимущества</Htag>
                <Advantage advantages={page.advantages}/>
            </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html :page.seoText}} />}
            <Htag tag='h2'>Получаемые навыки</Htag>
                {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
        </div>
    );
};