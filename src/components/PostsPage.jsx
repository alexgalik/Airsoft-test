import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {fetchPost, updatePost, deletePost} from '../actions/postsActions';
import {fetchComments, saveComment} from '../actions/commentsActions';
import AddNewPost from "./AddNewPost"
import './styles/PostsPage.css'

class PostsPage extends Component {

    state = {
        id : this.props.post ? this.props.post.id : null,
        title: this.props.post ? this.props.post.title : '',
        body: this.props.post ? this.props.post.body : '',
        comments: this.props.comments ? this.props.comments : [],
        commentBody: "",
        isEditingOpen: false,
        errors: ""
    }
    
    componentWillMount(){
        this.props.fetchPost(Number(this.props.match.params.id))
        this.props.fetchComments()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.post.id,
            title: nextProps.post.title,
            body: nextProps.post.body,
            comments: nextProps.comments
        })
    }

    TogglePostModal = () => {
        this.setState(state => ({isEditingOpen: !state.isEditingOpen}));
    }

    handleCommentBodyChange = (e) =>{
        this.setState({commentBody: e.target.value})
    }

    updatePost = (updatedPost) =>{
        this.props.updatePost(this.state.id, updatedPost);
        this.TogglePostModal()
    }

    DeletePost = () => {
        this.props.history.push('/')
        this.props.deletePost(this.state.id);
    }
    
    SendComment = (e) => {
        e.preventDefault();
        const {commentBody} = this.state;
        let errors = "";
        if (commentBody === "") errors = "This field is required";
        this.setState({errors: errors});
        if (errors === ""){
            const comment ={
                postId: this.state.id,
                body: commentBody
            }
            this.props.saveComment(comment)
            this.setState({commentBody: ""})
        }
    }

    render(){
        return(
            <div className="postpage">
            <div className="field">
                <h1>Welcome to editing page</h1>
                <div className="field">                        
                    <Link to={`/`} className="ui green labeled submit icon button"><i className="home icon"></i>Home</Link>
                </div>
                <div className="field">
                    <div className="ui blue labeled submit icon button " onClick = {this.TogglePostModal.bind(this)}> 
                        <i className="icon edit"></i> Edit this post
                    </div> 
                    <div className="ui red labeled submit icon button " onClick = {this.DeletePost.bind(this)}> 
                        <i className="window close outline icon"></i> Delete this post
                    </div> 
                </div>

                {this.state.isEditingOpen &&
                    ReactDOM.createPortal(
                        <AddNewPost onClose = {this.TogglePostModal.bind(this)} onSubmit = {this.updatePost.bind(this)} post = {{"title": this.state.title, "body": this.state.body}}/>,
                        document.getElementById('post_portal')
                    )          
                }

                <div className="field">
                    <div className="ui ignored info attached message">{this.state.title}</div>
                    <div className="ui ignored bottom attached warning message"><p className = "text">{this.state.body}</p></div>
                </div>
                <h3 className="ui dividing header">Comments</h3>
                {this.state.comments.map(comment => {
                    return(
                        <div className="field" key = {comment.id}>                        
                            <div className="text">
                                {comment.body}
                            </div>
                            <hr/>
                        </div>)
                })}
                <form className="ui reply form" onSubmit={this.SendComment}>
                    <div className="field">
                        <textarea
                            name = "body"
                            id="body"
                            value= {this.state.commentBody}
                            onChange = {this.handleCommentBodyChange}
                        ></textarea>
                        {(this.state.errors) &&<div className = "ui negative message">{this.state.errors}</div>}
                    </div>
                    
                    <div className="field">
                    <button className="ui primary button" >Add comment</button>
                    </div>
                </form>

            </div>                      
            </div>
        )
    }
}

PostsPage.propTypes = {
    fetchComments: PropTypes.func.isRequired,
    fetchPost: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired, 
    updatePost: PropTypes.func.isRequired, 
    deletePost: PropTypes.func.isRequired
  }

const mapStateToProps = (state, props) => {
    return {
      post: state.posts.find(post => post.id === Number(props.match.params.id)),
      comments: state.comments.filter(comment => comment.postId === Number(props.match.params.id))
    }
  }

export default connect(mapStateToProps, {fetchPost, fetchComments, saveComment, updatePost, deletePost}) (PostsPage)