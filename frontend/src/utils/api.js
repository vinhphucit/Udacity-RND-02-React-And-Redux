import { guid } from './helpers';

const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': 'd'
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers: headers })

export const fetchPosts = (category) => {
  if (category) {
    return fetch(`${api}/${category}/posts`, { headers: headers })
  } else {
    return fetch(`${api}/posts`, { headers: headers })
  }
}

export const fetchPostDetail = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers: headers })

export const postPost = (author, title, body, category) => {
  const jsonBody = JSON.stringify({
    id: guid(),
    timestamp: Date.now(),
    title: title,
    author: author,
    body: body,
    category: category
  });

  return fetch(`${api}/posts`, { method: 'POST', body: jsonBody, headers: headers })
}

export const updatePost = (post_id, author, title, body, category) => {
  const jsonBody = JSON.stringify({
    timestamp: Date.now(),
    title: title,
    author: author,
    body: body,
    category: category
  });

  return fetch(`${api}/posts/${post_id}`, { method: 'PUT', body: jsonBody, headers: headers })
}

export const deletePost = (post_id) => {
  return fetch(`${api}/posts/${post_id}`, { method: 'DELETE', headers: headers })
}

export const fetchComments = (post_id) =>
  fetch(`${api}/posts/${post_id}/comments`, { headers: headers })

export const fetchComment = (comment_id) =>
  fetch(`${api}/comments/${comment_id}`, { headers: headers })


export const postComment = (postId, author, body) => {
  const jsonBody = JSON.stringify({
    id: guid(),
    timestamp: Date.now(),
    parentId: postId,
    author: author,
    body: body,
  })
  return fetch(`${api}/comments`, { method: 'POST', body: jsonBody, headers: headers })
}

export const updateComment = (commentId, author, body) => {
  const jsonBody = JSON.stringify({
    timestamp: Date.now(),
    author: author,
    body: body
  })
  return fetch(`${api}/comments/${commentId}`, { method: 'PUT', body: jsonBody, headers: headers })
}


export const deleteComment = (comment_id) => {
  return fetch(`${api}/comments/${comment_id}`, { method: 'DELETE', headers: headers })
}

export const votePost = (postId, isUpvote) => {
  const jsonBody = JSON.stringify({ "option": isUpvote ? "upVote" : "downVote" });
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    body: jsonBody,
    headers: headers
  })
}

export const voteComment = (commentId, isUpvote) => {
  const jsonBody = JSON.stringify({
    option: isUpvote ? 'upVote' : 'downVote'
  });
  return fetch(`${api}/comments/${commentId}`, { method: 'POST', body: jsonBody, headers: headers })
}