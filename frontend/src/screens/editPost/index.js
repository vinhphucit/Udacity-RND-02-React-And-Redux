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
import { fetchCategories } from './../../actions/category_actions';
import { editPost, fetchPost } from './../../actions/post_actions'
import NotFoundScreen from './../notFound'

class EditingPostScreen extends Component {
    constructor(){
        super()
        this.isInitialized = false;
    }
    componentWillMount() {
        if (this.props.categories.length === 0) {
            this.props.fetchCategories();
        }
        this.props.fetchPost(this.props.match.params.post_id)
    }

    componentDidMount() {
        
    }
    componentWillReceiveProps(){
        console.log("this.isInitialized:"+this.isInitialized)
        if(!this.isInitialized)
            this.handleInitialize();
    }
    handleInitialize() {
        if (this.props.post) {
            const initData = {
                "author": this.props.post.author,
                "title": this.props.post.title,
                "body": this.props.post.body,
                "category": this.props.post.category
            };
            this.props.initialize(initData);
            this.isInitialized = true
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error' : null;
        return (
            <FormGroup validationState={className}>
                <label htmlFor="{field.name}">{field.label}</label>
                <FormControl
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }

    renderCategoryFields(field) {
        const { categories } = this.props;
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error' : null;
        return (
            <FormGroup validationState={className}>
                <label>{field.label}</label>
                <select {...field.input} className="form-control">
                    <option value="" className="disabled">-- Select category --</option>
                    {_.map(categories, category => (
                        <option
                            key={category.name}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </FormGroup>
        );
    }

    onSubmit(values) {
        const post_id = this.props.match.params.post_id;
        const category = this.props.match.params.category
        this.props.editPost(post_id, values, () => {
            this.props.history.push(`/${category}`);
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const post_id = this.props.match.params.post_id
        const category = this.props.match.params.category

        const { isFetching, posts } = this.props.postData;
        
        if (isFetching) {
            return (<div></div>)
        } else if (!posts || Object.keys(posts).length === 0 || !this.props.post || this.props.post.category !== category || this.props.post.deleted === true) {
            return <NotFoundScreen />
        } else {
            return (
                <div>
                    <h1>Editing Post</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            name="category"
                            label="Category:"
                            component={field => this.renderCategoryFields(field)}
                        >
                        </Field>
                        <Field
                            label="Author:"
                            name="author"
                            type="text"
                            component={this.renderField}
                        />
                        <Field
                            label="Title:"
                            name="title"
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
                        <Link to={`/${category}`} className="btn btn-danger">Cancel</Link>
                    </form>
                </div>

            )
        };
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title!"
    }

    if (!values.author) {
        errors.author = "Enter a name!"
    }

    if (!values.body) {
        errors.body = "Enter some content!"
    }

    if (!values.category) {
        errors.category = "Select some content!"
    }

    return errors;
}

const mapStateToProps = ({ categoryData, postData }, ownProps) => {
    return {
        categories: categoryData.categories,
        post: postData.posts[ownProps.match.params.post_id],
        postData: postData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPost: (post_id, values, cb) => dispatch(editPost(post_id, values, cb)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchPost: (post_id) => dispatch(fetchPost(post_id))
    }
}

export default reduxForm({ validate, form: 'EditingPostForm' })(connect(mapStateToProps, mapDispatchToProps)(EditingPostScreen));
