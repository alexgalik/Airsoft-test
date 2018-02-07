import React, {Component} from 'react';
import './styles/AddNewPost.css'

export default class AddNewProject extends Component {

    state= {       
        title: this.props.post ? this.props.post.title : '',
        body: this.props.post ? this.props.post.body : '',
        errors: ""
    }
    handlePostNameChange = (e) => {
        this.setState({ title: e.target.value})
    }
    handlePostBodyChange = (e) => {
        this.setState({ body: e.target.value})
    }
    SendNewPost =(e) =>{
        e.preventDefault();
        const {title, body} = this.state;
        let errors = "";
        if (title === "" || body === "") errors = "All fields are required"
        this.setState({errors: errors});
        if (errors === ""){
            const newPost = {
                "title": title,
                "body": body
            }
            this.props.onSubmit(newPost)
        }

       
    }
    render(){
        return(
            <div className = "project_modal">                
                <form onSubmit={this.SendNewPost} className="ui form">
                    {this.props.children}
                    <div className="field">
                        <input 
                            type="text"
                            name="title"
                            placeholder="Type the title of a new post"
                            id="title"
                            value= {this.state.title}
                            onChange = {this.handlePostNameChange}
                        />
                    </div>
                   <div className="field">
                    <textarea
                            name = "body"
                            id="body"
                            value= {this.state.body}
                            onChange = {this.handlePostBodyChange}
                    ></textarea>
                    {(this.state.errors) &&<div className = "ui negative message">{this.state.errors}</div>}
                   </div>
                    
                    <button className="modal__add-button ui primary button">Save</button> 
                    <span className="modal__close-button ui button" onClick={this.props.onClose}>Close</span>                   
                </form>
                
            </div>
        )
    }
}