export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION_TO_USER='ANSWER_QUESTION_TO_USER'
export const ADD_QUESTION_TO_USER='ADD_QUESTION_TO_USER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }

} 

export function answerQuestionToUser (authedUser, qId, answer) {
	return {
    	type: ANSWER_QUESTION_TO_USER,
      	authedUser,
      	qId,
      	answer
    }
}
export function addQuestionToUser (question) {
	return {
    	type: ADD_QUESTION_TO_USER,
      	question,
    }
}