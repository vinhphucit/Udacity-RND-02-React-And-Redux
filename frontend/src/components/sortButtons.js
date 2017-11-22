import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {requestSort} from './../actions/post_actions';

import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

class SortButtons extends Component {

  sortByDate() {
    this.props.requestSort('byDate');
  }

  sortByScore() {
    this.props.requestSort('byScore');
  }

  getActiveButton() {      
    const {sortType} = this.props;
    
    if (sortType) {
      return (sortType === 'byDate') ? 1 : 2;
    }
    return 0;
  }


  render() {
    return (
        <div className="sortButtons">
            <h4>Sort Posts</h4>
            
            <ToggleButtonGroup type="radio" name="options" defaultValue={this.getActiveButton()}>
              <ToggleButton value={1} onClick={() => {this.sortByDate()}}><strong>By Date</strong> newer on top</ToggleButton>
              <ToggleButton value={2} onClick={() => {this.sortByScore()}}><strong>By Score</strong> higher on top</ToggleButton>
            </ToggleButtonGroup>
        
        </div>
    )
  }
}

function mapStateToProps ({sortType}) {
    return {sortType}
}

function mapDispatchToProps (dispatch) {
  return {
    requestSort: (sortType) => dispatch(requestSort(sortType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortButtons);
