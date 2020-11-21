import {getInitialData} from '../utils/api';
import {receiveUsers} from './users'
import {recieveQuestion} from './questions'
//import {setAuthedUser} from './authedUser'
import { showLoading,hideLoading} from 'react-redux-loading'

//const AUTHED_ID='johndoe'

export function handleInitialData(){
    return(dispatch)=>{
      dispatch(showLoading());
        return getInitialData()
          .then(({users,questions})=>{
          dispatch(receiveUsers(users))          //write store
          dispatch(recieveQuestion(questions))
          //dispatch(setAuthedUser(AUTHED_ID))
          dispatch(hideLoading())
        }
        )
    }
}