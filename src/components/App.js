import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import QuestionContainer from './QuestionContainer';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import NavBar from './NavBar';
import NotFound from './NotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {

    return (
      <Router>
      <Fragment>
      <LoadingBar />
      <div> 
        <NavBar/>
        {this.props.loading === true
              ? null
              : <Switch>
               <Route path='/' exact component={Login} />
               <Route path='/questions/:id' component={QuestionContainer} />
               <Route path='/new' exact component={NewQuestion} />
               <Route path='/leaderboard' component={LeaderBoard} />
               <Route component={NotFound} />

                </Switch>}
     </div>
   </Fragment>
 </Router>
    )
  }
}

export default connect()(App);
