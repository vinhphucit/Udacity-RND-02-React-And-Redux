import * as ReadableAPIUtil from './../utils/api'
import { CategoryType } from './../config/actiontypes'
export const fetchCategories = () => dispatch => {
    dispatch(requestCategories());
    return ReadableAPIUtil.fetchCategories()
    .then((response) => {
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        return response;
    })
    .then((response) => response.json())
    .then((data) => {                
        dispatch(receiveCategories(data.categories))
    })
    .catch(() => dispatch(requestCategoriesFailure(true)));
}

const receiveCategories = (categories) => {    
    return {
        type: CategoryType.FETCH_CATEGORIES_SUCCESS,
        categories
    }
}

const requestCategoriesFailure = (error) => {
    return {
        type: CategoryType.FETCH_CATEGORIES_FAILURE,
        error
    };
}

const requestCategories = () => {
    return {
        type: CategoryType.FETCH_CATEGORIES_REQUEST
    };
}