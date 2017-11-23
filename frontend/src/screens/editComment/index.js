import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { editComment, fetchComment } from './../../actions/comment_actions'
import NotFoundScreen from './../notFound'


class EditingComment extends Component {

    componentWillMount() {
        this.props.fetchComment(this.props.match.params.comment_id);
    }
    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        if (this.props.comment) {
            const initData = {
                "author": this.props.comment.author,
                "body": this.props.comment.body
            };
            this.props.initialize(initData);
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error' : null;
        return (
            <FormGroup validationState={className}>
                <label htmlFor="{field.name}">{field.label}</label>
                <FormControl
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }

    onSubmit(values) {
        const post_id = this.props.match.params.post_id;
        const comment_id = this.props.match.params.comment_id;
        this.props.editComment(comment_id, values, () => {
            this.props.history.push(`/posts/${post_id}`);
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const post_id = this.props.match.params.post_id;
        const category = this.props.match.params.category
        const { isFetching, comments } = this.props.commentData;
        this.handleInitialize()
        if (isFetching) {
            return (<div></div>)
        } else if (!comments || Object.keys(comments).length === 0 || this.props.comment.parentId !== post_id) {
            return <NotFoundScreen />
        } else {
            return (
                <div>
                    <h1>Editing Comment</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Author:"
                            name="author"
                            type="text"
                            component={this.renderField}
                        />

                        <Field
                            label="Content:"
                            name="body"
                            type="text"
                            component={this.renderField}
                        />
                        <Button type="submit" bsStyle="primary">Submit</Button>
                        <Link to={`/${category}/${post_id}`} className="btn btn-danger">Cancel</Link>
                    </form>
                </div>

            )
        };
    }
}

function validate(values) {
    const errors = {};
    if (!values.author) {
        errors.author = "Enter a name!"
    }

    if (!values.body) {
        errors.body = "Enter some content!"
    }

    return errors;
}

const mapStateToProps = ({ commentData }, ownProps) => {
    return { comment: commentData.comments[ownProps.match.params.comment_id], commentData }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComment: (comment_id) => dispatch(fetchComment(comment_id)),
        editComment: (comment_id, values, cb) => dispatch(editComment(comment_id, values, cb))
    }
}

export default reduxForm({ validate, form: 'EditingCommentForm' })(connect(mapStateToProps, mapDispatchToProps)(EditingComment));
