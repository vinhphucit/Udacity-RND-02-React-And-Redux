import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import { Link} from 'react-router-dom'
import {fetchCategories} from './../../actions/category_actions'
import {fetchPosts} from './../../actions/post_actions'
import PostItem from './../../components/postItem'
import _ from 'lodash';
import CategoriesList from './../../components/categoriesList'
import {Button, Row, Col} from 'react-bootstrap';

import SortButtons from './../../components/sortButtons'
class HomeScreen extends Component{
    componentDidMount(){        
        this.props.fetchCategories();    
        if(this.props.match.params.category)  {
            this.props.fetchPosts(this.props.match.params.category);  
        }else{
            this.props.fetchPosts()
        }
        
    }
    changeCategory = (categoryName) => {
        this.props.fetchPosts(categoryName);  
    }
    renderPostList(){
        let {posts} = this.props.postData;
       
        if (posts) {
            const {sortType} = this.props;
            if(sortType === 'byDate'){
                posts = _.sortBy(posts, 'timestamp').reverse()
            }else if (sortType === 'byScore'){
                posts = _.sortBy(posts, 'voteScore').reverse()
            }
            return _.map(posts, post => <PostItem is_detail={false} key={post.id} post={post}/>);
        }
        return <div>Loading...</div>
    }

    render(){
        
        return (    
            <Row>
            <Col md={2}>
                <h3>Categories</h3>
                <CategoriesList categories={this.props.categoryData.categories} fetchCategoryPosts={this.changeCategory}/>
            </Col>
            <Col md={10}>
                <Row>
                    <h1>Posts</h1>
                    <Link to="newpost">
                        <Button bsStyle="success">CREATE NEW POST</Button>
                    </Link>
                    <SortButtons/>
                    <ol>
                    {this.renderPostList()}
                    </ol> 
                </Row>
            </Col>
        </Row>
           
        )
    }
}

const mapStateToProps = ({categoryData, postData, sortType}) => {
    return {
        categoryData,
        postData,
        sortType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        fetchPosts: (category) => dispatch(fetchPosts(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)