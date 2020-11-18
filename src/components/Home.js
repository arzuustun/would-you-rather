import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

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
        <div>
        <button onClick = { this.handleUnansweredQuestions }>
        Unanswered Questions
        </button>
        <button onClick = { this.handleAnsweredQuestions }> 
        Answered Questions
        </button>
        
        </div>
        <div>
        {
          questionList.map(question=> (
            <div key = { question.id } > 
            <div>
            {users[question.author].name} asks:
            </div>
            <div>
            <img
              alt={ users[question.author].id }
              src={ users[question.author].avatarURL }
              className='avatar'
             />
            </div>
            <div> 
            <span>
            Would you rather
            </span>
            <br /> <br />
            <span>
          ... {question.optionOne.text.substring(0,15)  } ...
            </span>
            <br /> <br />
            <button  > 
              {/* onClick ={(e) => this.handleViewPoll(e, question.id)} */}

              View Poll
            </button>
            </div>


            </div>
          ))

        }

        </div>
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