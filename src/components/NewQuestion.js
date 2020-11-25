import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import { Button,ListGroup, ListGroupItem , FormGroup,Label,Form, Input} from 'reactstrap';

class NewQuestion extends Component {
    state={
        optionOne:'',
        optionTwo:'',
        goToHome:false
    }

    handleChangeOptOne = (e) => {
        const optionOne = e.target.value
    
        this.setState({
          optionOne
        })
      }

      handleChangeOptTwo = (e) => {
        const optionTwo = e.target.value
    
        this.setState ({
          optionTwo
        })
      }
      
      handleSubmit = (e) => {
        e.preventDefault()
    
        const {  optionOne,optionTwo } = this.state
        const { dispatch } = this.props
    
        // todo: Add Question to Store
    
        dispatch(handleAddQuestion(optionOne, optionTwo))
    
        this.setState(() => ({
          optionOne:'',
          optionTwo:'',
          goToHome: true,
        }))
      }
render(){
        const { optionOne,optionTwo,goToHome } =this.state;
        const { authedUser } = this.props;

        if( goToHome === true || authedUser===null ){
            return <Redirect to='/' />
        }

    return(
        <ListGroup className='home-list-group margin-top'> 
        <ListGroupItem>Create New Question 
            <br/>
        <h6 className='new-question-h6' >Complete the question: 
        <br/><br/> Would you rather ...</h6>
       
        <Form className='new-tweet' onSubmit={this.handleSubmit}>
         <FormGroup>
        <Label>Option One</Label>
        <Input placeholder='Enter Option One Text Here'
          	   onChange={this.handleChangeOptOne}
  			   text={optionOne}/>
      </FormGroup>
      <FormGroup>
        <Label>Option Two</Label>
        <Input placeholder='Enter Option One Text Here'
          	   onChange={this.handleChangeOptTwo}
  			   text={optionTwo}/>
      </FormGroup>
          <Button color="success" className="home-button"
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
              Submit
          </Button>
        </Form>
        </ListGroupItem>
      </ListGroup>

    )
}

}

function mapStateToProps({authedUser}) {
	return {
    	authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion);