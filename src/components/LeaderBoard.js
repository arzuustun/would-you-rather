import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LeaderBoard extends Component{
render(){
	const { users, authedUser } = this.props;

      	if (authedUser === null) {
          return <Redirect to='/' />
        }

return(
<Fragment>
{users && users.map((user,index)=>(
<div key={user.id} className='leader-board-div'>
    <div className='leader-board-left'>
        <img
        alt={ user.id }
        src={ user.avatarURL }
        className='avatar'
        />
    </div>
 
 <div className='leader-board-center'>
 <h2>{user.name}</h2>
<h5>Answered Questions &nbsp;
<span> {user.answeredQuestions}</span>
</h5>
<hr></hr>
<h5> Created Question &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
    <span>{user.createdQuestions}</span>
</h5>
<div className='leader-board-right'>
    <h5>Score</h5> 
    <h2>{user.score}</h2>
</div>
</div>

</div>
))}
</Fragment>
)
}
}
function mapStateToProps({users, authedUser}){
    let usersArray = [];
  
    Object.entries(users).forEach(
      ([key, value]) => {
        
            usersArray.push({
              id: value.id,
                name: value.name,
                avatarURL: value.avatarURL,
                answeredQuestions: Object.entries(value.answers).length,
                createdQuestions: value.questions.length,
                score: Object.entries(value.answers).length + value.questions.length,
          })
      }
  )
console.log(usersArray)
  return {
      users: usersArray.sort((a,b) => b.score - a.score),
      authedUser
  }  
}
export default connect(mapStateToProps)(LeaderBoard);