import {SET_COMMENTS, ADD_COMMENT} from '../actions/commentsActions';

const comments = ((state = [], action ={}) => {
    switch (action.type) {
        case SET_COMMENTS:
            return action.comments;
        case ADD_COMMENT:
            return [
              ...state,
              action.comment
            ];
        default:
          return state;
      }
})

export default comments;