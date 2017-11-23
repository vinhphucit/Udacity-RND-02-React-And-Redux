import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    ListGroupItem
} from 'react-bootstrap';
import {PropTypes} from 'prop-types'
export default class CategoriesList extends Component {

    componentDidMount(){
    }

    componentWillMount() {
        
    }

    renderList() {
        const { categories } = this.props;
        if (categories) {
             return _.map(categories, category => {
                return (
                    <ListGroupItem
                        key={category.path}
                    >
                        <Link
                            to={`/${category.path}`}
                            onClick={() => this.props.fetchCategoryPosts(category.path)}
                        >
                        {category.name}
                        </Link>
                    </ListGroupItem>
                );
            });
        }
        return (
            <div>Loading</div>
        );
    }
    
    render() {
        return (
            <div>
                <ListGroupItem>
                    <Link to="/" onClick={() => this.props.fetchCategoryPosts()}>All</Link>
                </ListGroupItem>
                <div>{this.renderList()}</div>
            </div>
        );
    }
}

CategoriesList.propTypes = {
    fetchCategoryPosts: PropTypes.func
}
