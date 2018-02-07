export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const POST_FETCHED = 'POST_FETCHED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_DELETED = 'POST_DELETED';

const handleResponse=(response) =>{
    if (response.ok) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

export const setPosts = posts =>{
    return{
        type: SET_POSTS,
        posts
    }
}

export const addPost = post =>{
    return {
      type: ADD_POST,
      post
    }
  }

export const postFetched = post => {
    return {
      type: POST_FETCHED,
      post
    }
  }

export const postUpdated = post => {
    return {
      type: POST_UPDATED,
      post
    }
  }

  export const  postDeleted = postId => {
    return {
      type: POST_DELETED,
      postId
    }
  }
  

export const fetchPosts = () => {
    return dispatch => {
        fetch('/posts')
        .then(res => res.json())
        .then(data => dispatch(setPosts(data)));
    }
}


export const savePost= data => {
    return dispatch => {
      return fetch('/posts', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleResponse)
      .then(data => dispatch(addPost(data)));
    }
  }

export const fetchPost= id => {
    return dispatch => {
      fetch(`/posts/${id}`)
        .then(res => res.json())
        .then(data => dispatch(postFetched(data)));
    }
}

export const updatePost = (id, data) => {
  return dispatch => {
    return fetch(`/posts/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(postUpdated(data)));
  }
}

export const  deletePost = id => {
  return dispatch => {
    return fetch(`/posts/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(postDeleted(id)));
  }
}