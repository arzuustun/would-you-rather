import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


export const ADD_QUESTION='ADD_QUESTION'
export const ADD_ANSWER='ADD_ANSWER'
export const RECIEVE_QUESTIONS='RECIEVE_QUESTIONS'

export function addQuestion (question){
return{
    type: ADD_QUESTION,
    question,
}
}
export function addAnswer(authedUser,parentid,answer){
    return{
        type: ADD_ANSWER,
        authedUser,
        parentid,
        answer,
    }
}
export function recieveQuestion(questions){
    return{
        type: RECIEVE_QUESTIONS,
        questions
    }
}

export function handleAddQuestion (optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
      
        dispatch(showLoading());
    
        return saveQuestion({
          optionOneText: optionOne,
            optionTwoText: optionTwo,
            author : authedUser,
      })
        .then((question) => {
        dispatch(addQuestion(question)) 
        dispatch(addQuestionToUser(question)) })
        .then(() => dispatch(hideLoading()))
  }
}

export function handleAddAnswer (parentid, answer) {

  return (dispatch, getState) => {
      const { authedUser } = getState();
 
        dispatch(showLoading());
        
        return saveQuestionAnswer({
          authedUser,
          parentid,
            answer
      })
        .then(() => { 
            dispatch(addAnswer(authedUser, parentid, answer))
         // dispatch(answerQuestionToUser(authedUser, parentid, answer))
         })
        .then(() => dispatch(hideLoading()))
  }
}