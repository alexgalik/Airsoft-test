import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPosts, savePost} from '../actions/postsActions';
import PropTypes from "prop-types"
import AddNewPost from "./AddNewPost"
class App extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }
  state = {
    isAddNewPostOpen: false
  }

  TogglePostModal = () => {
    this.setState(state => ({isAddNewPostOpen: !state.isAddNewPostOpen}));
  }

  handleNewPost = (newPost) => {
    this.props.savePost(newPost)
    this.TogglePostModal()
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to dashbord</h1>
        <h3>Click links to do some actions :)</h3><br/>
        <div className="ui blue labeled submit icon button" onClick = {this.TogglePostModal.bind(this)}> 
          <i className="icon edit"></i> Add New Post
        </div>

        {this.state.isAddNewPostOpen &&
          ReactDOM.createPortal(
            <AddNewPost onClose = {this.TogglePostModal.bind(this)}  onSubmit = {this.handleNewPost.bind(this)}/>,
            document.getElementById('post_portal')
          )          
        }

        <div className="ui three cards">
        {this.props.posts.map(post => {
           return(<div className="ui card" key = {post.id}>
              <div className="content">
                  <div className="header"><Link to={`/userposts/${post.id}`}>{post.title}</Link></div>
                  <div className="column"><p>{post.body}</p></div>
              </div>
          </div>)
        })}         
		    </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, {fetchPosts,savePost})(App);
