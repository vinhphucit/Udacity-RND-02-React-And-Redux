import _ from 'lodash'
import { CommentType } from './../config/actiontypes'
export const commentsReducer = (state = {
    comments:{},
    isFetching:false,
    error: null }, action) =>{            
    switch (action.type){
        case CommentType.FETCH_COMMENTS_SUCCESS:        
            return {...state,
                comments: _.mapKeys(action.comments,'id'),
                isFetching:false
            };
        case CommentType.FETCH_COMMENTS_FAILURE:      
        case CommentType.FETCH_COMMENT_FAILURE:              
            return {
                ...state,
                isFetching:false,
                error: action.error, 
                comments:{}
            }
        case CommentType.FETCH_COMMENTS_REQUEST:
        case CommentType.FETCH_COMMENT_REQUEST:
            return {
                ...state,
                comments: {},
                isFetching:true
            };            
        case CommentType.VOTE_COMMENT_SUCCESS:
            return {
                ...state,
                comments:{
                    ...state.comments,
                    [action.comment.id]: action.comment
                }
            }
        case CommentType.FETCH_COMMENT_SUCCESS:        
            return { 
                ...state,
                isFetching:false,
                comments:{
                    [action.comment.id]: action.comment
                }
            };
        case CommentType.DELETE_COMMENT_SUCCESS:
            var newState = {...state}
            delete newState.comments[action.comment.id]
            return newState;
        default:
            return state;
    }
}
