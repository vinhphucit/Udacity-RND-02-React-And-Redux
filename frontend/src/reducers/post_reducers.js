import _ from 'lodash'
import { PostType } from './../config/actiontypes'
export const postsReducer = (state = {
    posts:{},
    isFetching:false,
    error: null }, action) =>{            
    switch (action.type){
        case PostType.FETCH_POSTS_SUCCESS:
            return {...state,
                posts: _.mapKeys(action.posts,'id'),
                isFetching:false
            };
        case PostType.FETCH_POSTS_FAILURE:            
        case PostType.FETCH_POST_DETAIL_FAILURE:
            return {
                ...state,
                isFetching:false,
                posts: [],
                error: action.error
            }
        case PostType.FETCH_POSTS_REQUEST:
        case PostType.FETCH_POST_DETAIL_REQUEST:
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
                isFetching:false,
                posts:{
                    [action.post.id]: action.post
                }
            }   
        case PostType.DELETE_POST_SUCCESS:
            var newState = {...state}
            delete newState.posts[action.post.id]
            return newState;
        default:
            return state;
    }
}
