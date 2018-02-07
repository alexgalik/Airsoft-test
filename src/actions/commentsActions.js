export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

const handleResponse=(response) =>{
    if (response.ok) {
      return response.json();
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

export const setComments = comments =>{
    return{
        type: SET_COMMENTS,
        comments
    }
}

export const addComment = comment => {
    return {
      type: ADD_COMMENT,
      comment
    }
  }

export const fetchComments = () => {
    return dispatch => {
        fetch('/comments')
        .then(res => res.json())
        .then(data => dispatch(setComments(data)));
    }
}

export const saveComment= data => {
    return dispatch => {
      return fetch('/comments', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleResponse)
      .then(data => dispatch(addComment(data)));
    }
  }