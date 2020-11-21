import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { Nav,NavItem} from 'reactstrap';

class NavBar extends Component {
  	handleLogOut = (e) => {
    	e.preventDefault();
      
      	const { dispatch } = this.props;
      	dispatch(setAuthedUser( null ));
      	this.props.history.push('/');
    }
  
	render () {
      const { user } = this.props;

    	return(
              <Nav>
                <NavItem>
                  <NavLink to='/' exact activeClassName='active'>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/add' activeClassName='active'>
                    New Question
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/leaderboard' activeClassName='active'>
                    Leader Board
                  </NavLink>
                </NavItem>

          		{user && (
          		  <Fragment>
                    <NavItem>
                      Hello, {user.name}    
                      <img 
                          src={user.avatarURL} 
                          alt={user.id}
                          className='nav-user-img'
                      />
                    </NavItem>
                    <NavItem>
					  <button 
						onClick={this.handleLogOut}
						className='logout-btn'
					  >
						Logout
					  </button>
                    </NavItem>
				  </Fragment>
        		)}
              </Nav>
        );
    }
} 

function mapStateToProps ({ users, authedUser }) {
    return {
      user:authedUser
           ? users[authedUser]
           :null
    };
}

export default withRouter(connect(mapStateToProps)(NavBar));