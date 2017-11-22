import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { categoriesReducer } from './category_reducers'
import { postsReducer } from './post_reducers'
import { commentsReducer } from './comment_reducers'
import { postsSortReducer } from './sort_posts_reducers'
const rootReducer = combineReducers({
    postData: postsReducer,
    categoryData : categoriesReducer,
    commentData : commentsReducer,
    sortType: postsSortReducer,
    form: formReducer
});

export default rootReducer;
