import * as ReadableAPIUtil from './../utils/api'
import { PostType } from './../config/actiontypes'

export const fetchPosts = (category) => dispatch => {
    dispatch(requestPosts());
    return ReadableAPIUtil.fetchPosts(category)
        .then((response) => {

            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then((response) => response.json())
        .then((posts) => {

            dispatch(receivePosts(posts))
        })
        .catch(() => dispatch(requestPostsFailure(true)));
}

export const fetchPost = (post_id) => dispatch => {
    dispatch(requestPost());
    return ReadableAPIUtil.fetchPostDetail(post_id)
        .then((response) => {

            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then((response) => response.json())
        .then((post) => {
            dispatch(receivePost(post))
        })
        .catch(() => dispatch(requestPostFailure(true)));
}

export const createPost = (values, cb) => dispatch => {
    const { author, title, body, category } = values
    return ReadableAPIUtil.postPost(author, title, body, category)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((post) => {
            if (cb) {
                cb();
            }
            dispatch(createPostSuccessfully(post))
        })
}

export const editPost = (post_id, values, cb) => dispatch => {
    const { author, title, body, category } = values
    return ReadableAPIUtil.updatePost(post_id, author, title, body, category)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((post) => {
            if (cb) {
                cb();
            }
            dispatch(editPostSuccessfully(post))
        })
}

export const deletePost = (post_id, cb) => dispatch => {
    return ReadableAPIUtil.deletePost(post_id)
        .then((response) => {

            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then((response) => response.json())
        .then((post) => {
            if (cb) {
                cb()
            }
            dispatch(deletePostSuccessfully(post))
        });
}

export const votePost = (post_id, is_upvote) => dispatch => {
    return ReadableAPIUtil.votePost(post_id, is_upvote)
        .then((response) => {

            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then((response) => response.json())
        .then((post) => {
            dispatch(receiveVotePost(post))
        });
}

export const requestSort = (sortType) => {
    return {
        type: PostType.SORT_BY_TYPE,
        sortType
    }
}
const deletePostSuccessfully = (post) => {
    return {
        type: PostType.DELETE_POST_SUCCESS,
        post
    }
}
const receiveVotePost = (post) => {
    return {
        type: PostType.VOTE_POST_SUCCESS,
        post
    }
}

const createPostSuccessfully = (post) => {
    return {
        type: PostType.ADD_POST_SUCCESS,
        post
    }
}

const editPostSuccessfully = (post) => {
    return {
        type: PostType.EDIT_POST_SUCCESS,
        post
    }
}

const receivePosts = (posts) => {
    return {
        type: PostType.FETCH_POSTS_SUCCESS,
        posts
    }
}

const requestPostsFailure = (error) => {
    return {
        type: PostType.FETCH_POSTS_FAILURE,
        error
    };
}

const requestPosts = () => {
    return {
        type: PostType.FETCH_POSTS_REQUEST
    };
}

const receivePost = (post) => {
    return {
        type: PostType.FETCH_POST_DETAIL_SUCCESS,
        post
    }
}

const requestPostFailure = (error) => {
    return {
        type: PostType.FETCH_POST_DETAIL_FAILURE,
        error
    };
}

const requestPost = () => {
    return {
        type: PostType.FETCH_POST_DETAIL_REQUEST
    };
}