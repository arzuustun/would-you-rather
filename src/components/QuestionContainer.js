import { render } from '@testing-library/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotFound from './NotFound';
import Question from './Question';
import ResultQuestion from './ResultQuestion';
import Login from './Login';

 class QuestionContainer extends Component{

render(){
	const { isError, isAnswered, id, authedUser } = this.props;

		if (authedUser === null) {
        	return <Login id={id} />
        }
        if(isError&& isAnswered===null){
            return(<NotFound/>)
        }
        else if (isAnswered!==null)
        {
        return (
        <div>
            {!isAnswered
            ? ( <Question id={id} /> )
            : ( <ResultQuestion id={id} /> )}
        </div>
            )
        }
        else {
            return(<div>....Loading....</div>)
        }
    }

}
function mapStateToProps ({ questions, authedUser }, props ) {
    const { id } = props.match.params;
    const question = questions[id];

    return {
        id,
        authedUser,
        isError: Object.entries(questions).length !== 0,
        isAnswered: question
                    ? question.optionOne.votes.includes(authedUser) || 
                      question.optionTwo.votes.includes(authedUser)
                    : null,
        
  }
 }
export default connect(mapStateToProps)(QuestionContainer)