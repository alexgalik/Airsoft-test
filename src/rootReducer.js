import {combineReducers} from 'redux';

import posts from './reducers/posts';
import comments from './reducers/comments';

export default combineReducers({
    posts,
    comments
});