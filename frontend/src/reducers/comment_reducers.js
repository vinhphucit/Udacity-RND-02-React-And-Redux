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
            return {
                ...state,
                error: action.error
            }
        case CommentType.FETCH_COMMENTS_REQUEST:
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
                comments:{
                    [action.comment.id]: action.comment
                }
            };
        case CommentType.DELETE_COMMENT_SUCCESS:
            return _.omit(state.comments, action.comment);
        default:
            return state;
    }
}
