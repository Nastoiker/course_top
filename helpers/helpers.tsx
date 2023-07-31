import CourseIcon from './icons/Course.svg';
import BooksIcon from './icons/Books.svg';
import ProductIcon from './icons/Products.svg';
import ServicesIcon from './icons/Services.svg';
import {TopLevelCategory} from "../interfaces/top-page.interface";
import {FirstLevelMenuItem} from "../interfaces/menu.interfaces";
export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы',icons: <CourseIcon />, id: TopLevelCategory.Courses },
    { route: 'services', name: 'Сервисы',icons: <ServicesIcon />, id: TopLevelCategory.Services },
    { route: 'books', name: 'Книги',icons: <BooksIcon />, id: TopLevelCategory.Books },
    { route: 'products', name: 'Продукты',icons: <ProductIcon />, id: TopLevelCategory.Products },
]
export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '').concat('₽');
export const declOfNum = (number:number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2: cases[(number % 10 < 5 ? number % 5 : 5 )]]
}