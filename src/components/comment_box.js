import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {
    //Constructor is the right place to initialize state
    constructor(props) {
        //calling super allow access functions/methods in the parent objects
        super(props);

        this.state = { comment: '' };
    }
    handleChange(event) {
        this.setState({ comment: event.target.value })
    }

    handleSubmit(event) {
    //prevent submiting to the backend
        event.preventDefault();
        
        this.props.saveComment(this.state.comment);
        this.setState({ comment: '' })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="comment-box">
                <h4>Add a comment</h4>
                <textarea 
                //we tell the textarea what value is
                value={this.state.comment} 
                onChange={this.handleChange.bind(this)}/>
                {/* When the button is click, it will  submit the form(action: submit) */}
                <div>
                    <button action="submit">Submit Comment</button>
                </div>
            </form>
        )
    }
}

export default connect(null, actions)(CommentBox);