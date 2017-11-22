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
import { createPost } from './../../actions/post_actions'


class CreatingPostScreen extends Component {

    componentWillMount() {
        if (this.props.categories.length === 0)
            this.props.fetchCategories();
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
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;        
        return (
            <div>
                <h1>Creating Post</h1>
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
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>

        );
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

const mapStateToProps = ({ categoryData }) => {
    return { categories: categoryData.categories }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (values, cb) => dispatch(createPost(values, cb)),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default reduxForm({ validate, form: 'CreatingPostForm' })(connect(mapStateToProps, mapDispatchToProps)(CreatingPostScreen))