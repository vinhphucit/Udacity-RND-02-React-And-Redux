import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import EditButtons from './editButton'
import Score from './score'
import { 
    Button,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import { voteComment, deleteComment } from './../actions/comment_actions'
class CommentItem extends Component{
    constructor(props){
        super(props);
    }

    upvoteComment() {
        this.props.voteComment(this.props.comment.id, true);
    }
    
    downvoteComment() {
        this.props.voteComment(this.props.comment.id, false);
    }
    
    deleteComment() {
        this.props.deleteComment(this.props.comment.id)
    }
    
    editComment() {
        const comment_id = this.props.comment.id;
        const post_id = this.props.postId
        this.props.history.push(`/posts/${post_id}/${comment_id}/edit`);
    }

    render(){
        const {comment} = this.props
        const {is_detail} = this.props;

        return (
            <ListGroupItem>            
                <p>{comment.body}</p>
                <p>By {comment.author}</p>
                <Score score={comment.voteScore} onUpvote={() => {this.upvoteComment()}} onDownvote={() => {this.downvoteComment()}} />
                <EditButtons onEdit={() => {this.editComment()}} onDelete={() => {this.deleteComment()}}/>
            </ListGroupItem>
        )
    }
}

const mapStateToProps = ({commentData}) => {
    return {
        commentData
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        voteComment: (comment_id, is_upvote) => dispatch(voteComment(comment_id, is_upvote)),
        deleteComment: (comment_id) => dispatch(deleteComment(comment_id))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentItem))