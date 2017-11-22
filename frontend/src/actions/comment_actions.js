import * as ReadableAPIUtil from './../utils/api'
import { CommentType } from './../config/actiontypes'

export const fetchComments = (post_id) => dispatch => {
    dispatch(requestComments());
    return ReadableAPIUtil.fetchComments(post_id)
    .then((response) => {
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        return response;
    })
    .then((response) => response.json())
    .then((comments) => {        
        
        dispatch(receiveComments(comments))
    })
    .catch(() => dispatch(requestCommentsFailure(true)));
}

export const fetchComment = (comment_id) => dispatch => {
    dispatch(requestComment());
    return ReadableAPIUtil.fetchComment(comment_id)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then((response) => response.json())
    .then((comment) => {        
        dispatch(receiveComment(comment))
    })
    .catch(() => dispatch(requestCommentsFailure(true)));
}

export const createComment = (post_id, values, cb) => dispatch => {
    const {author, body} = values
    return ReadableAPIUtil.postComment(post_id, author,  body)
    .then((response) => {        
        if (!response.ok) {
            throw Error(response.statusText);
        }        
        return response;
    })
    .then((response) => response.json())
    .then((comment) => {       
        if(cb){
            cb();
        } 
        dispatch(createCommentSuccessfully(comment))
    })
}

export const editComment = (comment_id, values, cb) => dispatch => {
    const { author,  body} = values
    return ReadableAPIUtil.updateComment(comment_id, author,  body)
    .then((response) => {        
        if (!response.ok) {
            throw Error(response.statusText);
        }        
        return response;
    })
    .then((response) => response.json())
    .then((comment) => {       
        if(cb){
            cb();
        } 
        dispatch(editCommentSuccessfully(comment))
    })
}
export const deleteComment = (comment_id) => dispatch => {
    return ReadableAPIUtil.deleteComment(comment_id)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        return response;
    })
    .then((response) => response.json())
    .then((comment) => {        
        dispatch(deleteCommentSuccessfully(comment))
    });
}

export const voteComment = (comment_id, is_upvote) => dispatch => {
    return ReadableAPIUtil.voteComment(comment_id, is_upvote)
    .then((response) => {
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        return response;
    })
    .then((response) => response.json())
    .then((comment) => {        
        dispatch(receiveVoteComment(comment))
    });
}

const receiveComment = (comment) => {
    return {
        type: CommentType.FETCH_COMMENT_SUCCESS,
        comment
    }
}

const requestComment = () => {
    return {
        type: CommentType.FETCH_COMMENT_REQUEST
    };
}

const receiveVoteComment = (comment) => {
    return {
        type: CommentType.VOTE_COMMENT_SUCCESS,
        comment
    }
}

const createCommentSuccessfully = (comment) => {
    return {
        type: CommentType.POST_COMMENT_SUCCESS,
        comment
    }
}
const deleteCommentSuccessfully = (comment) => {
    return {
        type: CommentType.DELETE_COMMENT_SUCCESS,
        comment
    }
}
const editCommentSuccessfully = (comment) => {
    return {
        type: CommentType.UPDATE_COMMENT_SUCCESS,
        comment
    }
}

const receiveComments = (comments) => {
    return {
        type: CommentType.FETCH_COMMENTS_SUCCESS,
        comments
    }
}

const requestCommentsFailure = (error) => {
    return {
        type: CommentType.FETCH_COMMENTS_FAILURE,
        error
    };
}

const requestComments = () => {
    return {
        type: CommentType.FETCH_COMMENTS_REQUEST
    };
}