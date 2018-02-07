import {SET_POSTS, ADD_POST, POST_FETCHED, POST_UPDATED, POST_DELETED} from '../actions/postsActions';

const posts = ((state = [], action ={}) => {
    switch(action.type){
        case SET_POSTS:
            return action.posts;
            
        case ADD_POST:
            return [
              ...state,
              action.post
            ];

        case POST_FETCHED:
            const index = state.findIndex(item => item.id === action.post.id);
            
            if (index > -1) {
                return state.map(item => {
                    if (item.id === action.post.id) return action.post;
                    else return item;
                });
            } else {
                return [
                    ...state,
                    action.post
                ];
            }

        case POST_UPDATED:
        return state.map(item => {
            if (item.id === action.post.id) return action.post;
            return item;
        });

        case POST_DELETED:
            return state.filter(item => item.id !== action.postId);
        default: return state;
    }
    
})
export default posts;