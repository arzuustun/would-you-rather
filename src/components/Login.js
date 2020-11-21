import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { setAuthedUser } from '../actions/authedUser';
import Select from 'react-select';
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
        
        if (goToHome || authedUser) {
        	return <Home />
        }
		return (
			<div>
                <h3>Welcome to the Would You Rather App!</h3>
                <h6>Please sign in to continue</h6>
                <hr/>
                <h2>Sign In</h2>
                <Select
                onChange={this.handleOnChange} 
                options={users} 
                getOptionLabel={(option)=>option.id}
                   getOptionValue={(option)=>option.name}
                placeholder='Select User'
                isSearchable={false}
                />
                <button 
                    type='submit'
			        disabled={user === ''}
					onClick={this.handleSubmit}>
                    Sign In
                </button>
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

export default connect(mapStateToProps)(Login)