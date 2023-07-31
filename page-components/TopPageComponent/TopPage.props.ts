import {MenuItem} from "../../interfaces/menu.interfaces";
import {TopLevelCategory, TopPageModel} from "../../interfaces/top-page.interface";
import {ProductModel} from "../../interfaces/product.interfaces";

export interface TopPageComponentProps extends Record<string, unknown>{
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}