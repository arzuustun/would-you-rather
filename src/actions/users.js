export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION_TO_USER='ANSWER_QUESTION_TO_USER'
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }

} 

export function answerQuestionToUser (authedUser, qid, answer) {
	return {
    	type: ANSWER_QUESTION_TO_USER,
      	authedUser,
      	qid,
      	answer
    }
}