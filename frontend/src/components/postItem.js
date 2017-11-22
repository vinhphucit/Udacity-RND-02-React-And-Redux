import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import EditButtons from './editButton'
import Score from './score'
import { votePost, deletePost } from './../actions/post_actions'
class PostItem extends Component{
    constructor(props){
        super(props);
    }

    upvotePost() {
        this.props.votePost(this.props.post.id, true);
    }
    
    downvotePost() {
        this.props.votePost(this.props.post.id, false);
    }
    
    deletePost() {
        this.props.deletePost(this.props.post.id, () => {
            this.props.history.push(`/`);    
        });
    }
    
    editPost() {
        this.props.history.push(`/posts/${this.props.post.id}/edit`);
    }

    generateTitle(post, is_detail) {
        if (is_detail) {
          return <h1>{post.title}</h1>;
        } else {
          return <Link to={`/posts/${post.id}`} ><h2>{post.title}</h2></Link>;
        }
      }
    
    generateEditButtons(is_detail) {
        if (is_detail) {
          return <EditButtons onEdit={() => {this.editPost()}} onDelete={() => {this.deletePost()}}/>;
        } else {
          return null;
        }
    }

    render(){
        const {post} = this.props
        const {is_detail} = this.props;

        return (
            <div>
                {this.generateTitle(post, is_detail)}
                <p>Author: {post.author} | in <Link to={`/${post.category}`}>{post.category}</Link></p>
                <p>{post.body}</p>
                <p>{post.commentCount} comment(s)</p>
                <Score score={post.voteScore} onUpvote={() => {this.upvotePost()}} onDownvote={() => {this.downvotePost()}} />
                {this.generateEditButtons(is_detail)}            
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = ({votePostData}) => {
    return {
        postData :votePostData
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        votePost: (post_id, is_upvote) => dispatch(votePost(post_id, is_upvote)),
        deletePost: (post_id, cb) => dispatch(deletePost(post_id,cb))        
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem))