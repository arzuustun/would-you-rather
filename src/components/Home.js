import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup,ListGroup, ListGroupItem ,Media} from 'reactstrap';

class Home extends Component {
    state={
      answered:false,
    }

      handleUnansweredQuestions = ( e ) => {
        e.preventDefault();

        this.setState({
          answered: false,
        });
      }
      handleAnsweredQuestions = ( e ) => {
        e.preventDefault();

        this.setState({
          answered: true,
        });
      }
      // handleViewPool = ( e,id ) => {
      //   e.preventDefault();

      //   this.history.push(`/questions/${id}`)
      // }


  render() {
    const { unansweredQuestions, answeredQuestions, users} = this.props;
    const { answered } = this.state;

    let questionList=unansweredQuestions;
     
   // if (autedUser===null) { return <Login/>}

   if ( answered ) {
     questionList = answeredQuestions;
   }

    return (
      <div className='center'>
        <ButtonGroup>
        <Button className='home-buttons'onClick = { this.handleUnansweredQuestions }>
        Unanswered Questions
        </Button>
        <Button className='home-buttons' onClick = { this.handleAnsweredQuestions }> 
        Answered Questions
        </Button>
        
        </ButtonGroup>
        <ListGroup className='home-list-group-item'>
        {
          questionList.map(question=> (
            <ListGroupItem key = { question.id } > 
            <ListGroupItem>
            {users[question.author].name} asks:
            </ListGroupItem>
            <Media body> 
            <Media
              alt={ users[question.author].id }
              src={ users[question.author].avatarURL }
              className='avatar'
             />
            
            <Media heading>
            Would you rather
            </Media>
            <br /> <br />
            <span>
          ... {question.optionOne.text.substring(0,15)  } ...
            </span>
            <br /> <br />
            <Button color="success"  > 
              {/* onClick ={(e) => this.handleViewPoll(e, question.id)} */}

              View Poll
            </Button>
            </Media>


            </ListGroupItem>
          ))

        }

        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    //    	answeredQuestions: Object.values(questions).filter(qid => qid.optionOne.votes.includes(authedUser) 
    //                                                        || qid.optionTwo.votes.includes(authedUser))
    //   													   .sort((a,b) => b.timestamp - a.timestamp),
    // unansweredQuestions: Object.keys(questions)
    //                       .filter((id) => !users[authedUser].answers.includes(id))

    //                       .sort((a, b) => b.timestamp - a.timestamp),
    users,
   authedUser,
   answeredQuestions: Object.values(questions).filter(quesId => quesId.optionOne.votes.includes(authedUser) || quesId.optionTwo.votes.includes(authedUser))
                                              .sort((a,b) => b.timestamp - a.timestamp),
   unansweredQuestions: Object.values(questions).filter(quesId => !quesId.optionOne.votes.includes(authedUser) && !quesId.optionTwo.votes.includes(authedUser))
                                              .sort((a,b) => b.timestamp - a.timestamp),
   
  }
}


export default connect(mapStateToProps)(Home) ;