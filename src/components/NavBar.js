import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { Nav,NavItem,Button} from 'reactstrap';

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
                  <NavLink  className="nav-item-home" to='/' exact>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="nav-item-other" to='/new'>
                    New Question
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink  className="nav-item-other" to='/leaderboard'>
                    Leader Board
                  </NavLink>
                </NavItem>

          		{user && (
          		  <div className="nav-item">
                    <NavItem className="nav-item-hello margin">
                      Hello, {user.name}    
                      <img 
                          src={user.avatarURL} 
                          alt={user.id}
                          className='nav-user-img'
                      />
                    </NavItem>
                    <NavItem>
					  <Button 
						onClick={this.handleLogOut}
            className='logout-btn'
					  >
						Logout
					  </Button>
                    </NavItem>
				  </div>
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