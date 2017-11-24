import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux';
import { fetchPost } from './../../actions/post_actions'
import { fetchComments } from './../../actions/comment_actions'
import PostItem from './../../components/postItem'
import CommentItem from './../../components/commentItem'
import NotFoundScreen from './../notFound'
class DetailPost extends Component {

    componentWillMount() {
        this.props.fetchPost(this.props.match.params.post_id)
        this.props.fetchComments(this.props.match.params.post_id)
    }

    renderComments() {
        const { comments } = this.props.commentData;

        if (comments) {

            return _.map(comments, comment => <CommentItem postId={this.props.match.params.post_id} key={comment.id} comment={comment} />);
        }
        return <div></div>

    }

    renderPost() {
        let { posts } = this.props.postData;
        const category = this.props.match.params.category
        if (posts) {
            return _.map(posts, post => <PostItem is_detail={true} key={post.id} post={post} />);
        }
        return <div></div>
    }

    render() {
        const post_id = this.props.match.params.post_id;
        const category = this.props.match.params.category
        const { isFetching, posts } = this.props.postData;        

        if (isFetching) {
            return (<div></div>)
        } else if (!posts || Object.keys(posts).length === 0 || !this.props.post || this.props.post.category !== category) {
            return <NotFoundScreen />
        } else {
            return (<div>
                <h1>Post Detail</h1>
                {this.renderPost()}
                <h2>Comments</h2>
                <Link to={`/${category}/${post_id}/newcomment`}>
                    <Button bsStyle="success">CREATE NEW COMMENT</Button>
                </Link>
                <ListGroup>
                    {this.renderComments()}
                </ListGroup>
                <Link to={`/${category}`}>
                    <Button bsStyle="success">BACK</Button>
                </Link>
            </div>
            )
        };
    }
}

const mapStateToProps = ({ postData, commentData }, ownProps) => {
    return { postData, commentData, post: postData.posts[ownProps.match.params.post_id], }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (post_id) => dispatch(fetchPost(post_id)),
        fetchComments: (post_id) => dispatch(fetchComments(post_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
