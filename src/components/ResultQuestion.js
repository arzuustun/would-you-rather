import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';
import {ListGroup, ListGroupItem ,Media} from 'reactstrap';

class ResultQuestion extends Component {
   
  render() {

   const { question, author ,selectedOption }=this.props;
  


    return (
    //  <div className='center'>
        <ListGroup className='home-list-group-item'>
        {
      
            <ListGroupItem key = { question.id } > 
            <ListGroupItem>
            Asked By { author.name } 
            </ListGroupItem>
            <Media body> 
            <Media
              alt={ author.id }
              src={ author.avatarURL }
              className='avatar'
             />
            <Media heading>
            Results:
            </Media>
            <span>
            Would You Rather {question.optionOne.text } 
            </span>
            <span>
            Would You Rather {question.optionTwo.text } 
            </span>
            </Media>
            </ListGroupItem>
          
        }

        </ListGroup>
     // </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }, {id}) {
//     const question =questions[id]
//   return {
//    question:question,
//    author: users[question.author],
//    yourVote: users[authedUser].answers[id]

//   }
console.log('user',users);
console.log('questions',questions);
console.log('autheduser',authedUser);
console.log('id',id);
return {
    question: questions[id],
     author: users[questions[id].author],
    selectedOption: users[authedUser].answers[id]
}
}


export default connect(mapStateToProps)(ResultQuestion) ;