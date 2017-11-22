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
import { createComment } from './../../actions/comment_actions'


class CreatingCommentScreen extends Component {
    
    componentWillMount() {
    
    }
    
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = touched && error ? 'error': null;
        
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
        this.props.createComment(post_id, values, () => {
            this.props.history.push(`/posts/${post_id}`);
        });
    }
    
    render() {
        const { handleSubmit } = this.props;
        const post_id = this.props.match.params.post_id;
        return (
            <div>
                <h1>Creating Comment</h1>
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
                    <Link to={`/posts/${post_id}`} className="btn btn-danger">Cancel</Link>
                </form>
            </div>
            
        );
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

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (post_id, values, cb) => dispatch(createComment(post_id, values, cb))
    }
}

export default reduxForm({validate, form: 'CreatingCommentForm'})(connect(null, mapDispatchToProps)(CreatingCommentScreen)
);
