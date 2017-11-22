import  {PostType} from '../config/actiontypes';

export const postsSortReducer = (state = 'byDate', action) => {
    switch (action.type) {
        case PostType.SORT_BY_TYPE:
            return action.sortType
        default:
            return state;
    }
}