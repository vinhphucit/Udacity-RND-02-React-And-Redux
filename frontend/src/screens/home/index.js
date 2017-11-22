import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import { Link} from 'react-router-dom'
import {fetchCategories} from './../../actions/category_actions'
import {fetchPosts} from './../../actions/post_actions'
import PostItem from './../../components/postItem'
import _ from 'lodash';
import {Button} from 'react-bootstrap';

import SortButtons from './../../components/sortButtons'
class HomeScreen extends Component{
    componentDidMount(){        
        this.props.fetchCategories();      
        this.props.fetchPosts();  
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
                    
           <div>
                <h1>Posts</h1>
                <Link to="newpost">
                    <Button bsStyle="success">CREATE NEW POST</Button>
                </Link>
                <SortButtons/>
                <ol>
                {this.renderPostList()}
                </ol> 
           </div>
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
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)