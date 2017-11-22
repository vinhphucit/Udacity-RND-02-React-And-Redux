import { CategoryType } from './../config/actiontypes'
export const categoriesReducer = (state = {
    categories:[],
    isFetching:false,
    error: null }, action) =>{            
    switch (action.type){
        case CategoryType.FETCH_CATEGORIES_SUCCESS:
            return {...state,
                categories: action.categories,
                isFetching:false
            };
        case CategoryType.FETCH_CATEGORIES_FAILURE:            
            return {
                ...state,
                error: action.error
            }
        case CategoryType.FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                categories: [],
                isFetching:true
            };            
        default:
            return state;
    }
}
