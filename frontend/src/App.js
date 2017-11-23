import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import  HomeScreen  from './screens/home'
import  CreatingPostScreen  from './screens/creatingPost'
import PostDetailScreen  from './screens/detailPost'
import CreatingCommentScreen  from './screens/creatingComment'
import EditingPostScreen  from './screens/editPost'
import EditingCommentScreen  from './screens/editComment'
import NotFoundScreen  from './screens/notFound'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">          
        <div className='container'>          
          <Switch>
            <Route exact path='/' component={HomeScreen}/>        
            <Route exact path='/newpost' component={CreatingPostScreen}/>  
            <Route exact path="/:category" component={HomeScreen}/>
            <Route exact path='/:category/:post_id' component={PostDetailScreen}/>    
            <Route exact path='/:category/:post_id/newcomment' component={CreatingCommentScreen}/>
            <Route exact path='/:category/:post_id/edit' component={EditingPostScreen}/>
            <Route exact path='/:category/:post_id/:comment_id/edit' component={EditingCommentScreen}/>
            <Route path="*" component={NotFoundScreen} />
          </Switch>
        </div>          
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
