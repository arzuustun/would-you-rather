import { RECEIVE_USERS ,ANSWER_QUESTION_TO_USER, ADD_QUESTION_TO_USER } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
      case ADD_QUESTION_TO_USER :
        return {
          ...state,
          [action.question.author]: { 
            ...state[action.question.author], 
            questions: state[action.question.author].questions.concat([action.question.id])
          }
        }
      case ANSWER_QUESTION_TO_USER :
        return {
          ...state,
          [action.authedUser]: { 
            ...state[action.authedUser], 
            answers: {
            	...state[action.authedUser].answers,
              	[action.quesId]: action.answer
            }
          }
        }
      
    default :
      return state
  }
} 