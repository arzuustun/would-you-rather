import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ListGroup, ListGroupItem ,Media } from 'reactstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
class ResultQuestion extends Component {
   
  render() {
  const { question, author ,selectedOption }=this.props;
  const optOneCount=question.optionOne.votes.length;
  const optTwoCount=question.optionTwo.votes.length;
  const sumCount= optOneCount + optTwoCount;
  const optOnePercentage =  Math.round((optOneCount/sumCount)*100);
  const optTwoPercentage = Math.round((optTwoCount/sumCount)*100);

    return (
        <ListGroup className='home-list-group-item result-list-group'>
        {
      
            <ListGroupItem key = { question.id } > 
            <ListGroupItem className="result-list-group-item">
            Asked By { author.name } 
            <Media
              alt={ author.id }
              src={ author.avatarURL }
              className='result-img-user'
             />
            </ListGroupItem>
            <Media body> 
          Results: 
            </Media>
            {selectedOption === 'optionOne' && <Media className="result-vote">Your Vote</Media>}
            <Media> 
            Would You Rather {question.optionOne.text } 
            </Media>
            <div className="text-center">{optOneCount} out of {sumCount} votes</div>
            <ProgressBar  striped variant="info" 
                         now={optOnePercentage} 
                         label={`${optOnePercentage}%`} />
            {selectedOption === 'optionTwo' && <Media className="result-vote">Your Vote</Media>}
            <Media> 
            Would You Rather {question.optionTwo.text } 
            </Media>
            <div className="text-center">{optTwoCount} out of {sumCount} votes</div>
          <ProgressBar striped variant="info" 
                       now={optTwoPercentage}
                       label={`${optTwoPercentage}%`}  />
           
           
            </ListGroupItem>
          
        }

        </ListGroup>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }, {id}) {
  //   const question =questions[id]
  // return {
  //  question:question,
  //  author: users[question.author],
  //  selectedOption: users[authedUser].answers[id]

  // }

return {
    question: questions[id],
     author: users[questions[id].author],
    selectedOption: users[authedUser].answers[id]
}
}


export default connect(mapStateToProps)(ResultQuestion) ;