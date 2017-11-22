import _ from 'lodash'
import { PostType } from './../config/actiontypes'
export const postsReducer = (state = {
    posts:{},
    isFetching:false,
    error: null }, action) =>{            
    switch (action.type){
        case PostType.FETCH_POSTS_SUCCESS:
        console.log(action.posts)
            return {...state,
                posts: _.mapKeys(action.posts,'id'),
                isFetching:false
            };
        case PostType.FETCH_POSTS_FAILURE:            
            return {
                ...state,
                error: action.error
            }
        case PostType.FETCH_POSTS_REQUEST:
            return {
                ...state,
                posts: {},
                isFetching:true
            };            
        case PostType.VOTE_POST_SUCCESS:
            return {
                ...state,
                posts:{
                    ...state.posts,
                    [action.post.id]: action.post
                }
            }
        case PostType.FETCH_POST_DETAIL_SUCCESS:
            return {
                ...state,
                posts:{
                    [action.post.id]: action.post
                }
            }   
        case PostType.DELETE_POST_SUCCESS:
            return _.omit(state.posts, action.post);
        default:
            return state;
    }
}
