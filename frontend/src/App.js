import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route} from 'react-router-dom'
import  HomeScreen  from './screens/home'
import  CreatingPostScreen  from './screens/creatingPost'
import PostDetailScreen  from './screens/detailPost'
import CreatingCommentScreen  from './screens/creatingComment'
import EditingPostScreen  from './screens/editPost'
import EditingCommentScreen  from './screens/editComment'
class App extends Component {
  render() {
    return (
      <div className="App">          
        <div className='container'>          
            <Route exact path='/' component={HomeScreen}/>        
            <Route exact path='/newpost' component={CreatingPostScreen}/>  
            <Route exact path='/posts/:post_id' component={PostDetailScreen}/>    
            <Route exact path='/posts/:post_id/newcomment' component={CreatingCommentScreen}/>
            <Route exact path='/posts/:post_id/edit' component={EditingPostScreen}/>
            <Route exact path='/posts/:post_id/:comment_id/edit' component={EditingCommentScreen}/>
        </div>          
      </div>
    );
  }
}

export default App;
