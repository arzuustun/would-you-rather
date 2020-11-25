import { RECIEVE_QUESTIONS ,ADD_QUESTION,ADD_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECIEVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
      case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question,
      }
      case ADD_ANSWER :
      return {
        ...state,
        [action.qId]: {
          ...state[action.qId], 
            [action.answer]: { 
              ...state[action.qId][action.answer], 
              votes: state[action.qId][action.answer].votes.concat([action.authedUser]) 
            }}
      }
    default :
      return state;
  }
} 

     