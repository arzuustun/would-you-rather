import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { setAuthedUser } from '../actions/authedUser';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

const imageUserLabel=({ name, avatarURL }) => (
    <div className='login-single-user'>
        <img src={avatarURL} alt={name} className='login-img-user' />
      {name}
    </div>
  );
class Login extends Component{
    state={
        user: '',
        goToHome:false
    };
    handleOnChange=(value)=>{
        this.setState({
            user:value.id,
        })
    }
    handleSubmit = (e) => {
        const {user}= this.state;
		const { dispatch, id } = this.props;

		e.preventDefault();

		if (user !== '') {
            dispatch(setAuthedUser(user));
            this.setState({
                user: '',
                  goToHome: id === null
                          ? true
                          : false,
            });
		}

        if (id !== null) {
        	this.props.history.push(`/questions/${id}`)
        }
	};
render()
{
        const { user,goToHome} = this.state;
        const { users,authedUser} = this.props;
        
        if (goToHome || !!authedUser) {
        	return <Home />
        }
        
		return (
			<div>
                <div className='login-list-group font-size'>Welcome to the Would You Rather App! <br/> <br/>
                <h6>Please sign in to continue</h6><br/>
                <h2>Sign In</h2><br/>
                </div>
               
                <div className='home-list-group-item'>
                <Select
                onChange={this.handleOnChange} 
                formatOptionLabel={imageUserLabel}
                options={users} 
                getOptionLabel={(option)=>option.id}
                getOptionValue={(option)=>option.name}
                placeholder='Select User'
                isSearchable={false}
                />
                <br/> <br/>
                <button color="success" 
                    className="login-sign-in"
                    type='submit'
			        disabled={user === ''}
					onClick={this.handleSubmit}>
                    Sign In
                </button>
            </div>
            </div>
		);
    
}
}
function mapStateToProps ({ users,authedUser}, {id}) {
	return {
        authedUser,
    	users: Object.values(users),
      	id: id ? id : null
	}
}

export default withRouter(connect(mapStateToProps)(Login));