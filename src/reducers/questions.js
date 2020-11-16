import { RECIEVE_QUESTIONS } from '../actions/questions'

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECIEVE_QUESTIONS :
      return {
        ...state,
        ...action.tweets
      }
    default :
      return state
  }
} 