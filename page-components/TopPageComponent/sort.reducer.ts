import {SortEnum} from "../../components/Sort/Sort.props";
import {ProductModel} from "../../interfaces/product.interfaces";
import {act} from "react-dom/test-utils";

export type sortActions = {type: SortEnum } | {type: SortEnum.Rating}  | {type: 'reset', initialState: ProductModel[]}
export interface  sortReducerState {
    sort: SortEnum;
    products: ProductModel[];
}
export const SortReducer = (state: sortReducerState, action: sortActions): sortReducerState => {
    switch (action.type) {
        case SortEnum.Rating:
            return {
                sort: SortEnum.Rating,
                products: state.products.sort((a, b) => ( a.initialRating > b.initialRating ? 1:-1) )
            };
        case SortEnum.Price:
            return {
                sort: SortEnum.Price,
                products: state.products.sort((a, b) => ( a.price > b.price ? 1:-1) )
            };
        case "reset":
            return {
                sort: SortEnum.Rating,
                products: action.initialState
            }

        default:
            throw new Error('Неверный тип сортировки');
    }
}