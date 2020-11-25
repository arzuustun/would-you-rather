import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';
import {ListGroup, ListGroupItem ,Media ,Button} from 'reactstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ResultQuestion from './ResultQuestion';
class Question extends Component{
    state={
        answer:'',
        toResult: false
    }

    handleChange= (e)=> {
        const answer = e.target.value;

        this.setState({
            answer,
        })
    }
    handleSubmit = (e)=> {
        e.preventDefault();
      
        const { answer } = this.state;
        const { dispatch, id } = this.props;
    
        dispatch( handleAddAnswer(id, answer ));
    
        this.setState({
            answer:'',
            toResult: true,
      })

    }
    render(){
        const { question, author, id } = this.props;
        const { answer, toResult } = this.state;
       
		if (toResult) {
          return (<ResultQuestion id={id} />)
        }

        return(
       <ListGroup className='home-list-group-item result-list-group'>
       {/* { */}
            <ListGroupItem> 
            <div className="result-list-group-item">
            { author.name }  asks:
            <Media
              alt={ author.id }
              src={ author.avatarURL }
              className='result-img-user'
             />
             <br></br> <br></br>
             Would You Rather...
            </div>
            <FormControl component="fieldset">
            <RadioGroup onChange={this.handleChange}>
                <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text } onChange={this.handleChange}  />
                <FormControlLabel value="optionTwo"  control={<Radio />} label={question.optionTwo.text } onChange={this.handleChange}  />
            </RadioGroup>
            </FormControl>
            <Button 
                        className="question-buton"
						type='submit'
						disabled={answer === ''}
                        onClick={this.handleSubmit}
					>
						Submit
					</Button>
            </ListGroupItem>
        {/* } */}
        </ListGroup>
        )
    // return(
    //     <div className='home-list-group-item result-list-group'>
    //           <div>
    //               {author.name} asks:
    //           </div>
    //           <hr/>
    //         <div>
    //             <img
    //                 alt={ author.id }
    //                 src={ author.avatarURL }
    //                 className='result-img-user'
    //             />
    //         </div>
    //         <div>
    //             <h2>Would You Rather ...</h2>
    //             <div>
    //               <input
    //                   type='radio'
    //                   name='option'
    //                   value='optionOne'
    //                   onChange={this.handleChange}
    //               />
    //               <span>{question.optionOne.text}</span>
    //             </div>
    //             <div>
    //               <input
    //                   type='radio'
    //                   name='option'
    //                   value='optionTwo'
    //                   onChange={this.handleChange}
    //               />
    //               <span>{question.optionTwo.text}</span>
    //             </div>
    //             <button
    //                 type='submit'
    //                 disabled={answer === ''}
    //                 onClick={this.handleSubmit}
    //             >
    //                 Submit
    //             </button>
    //         </div>
    //       </div>
    // )
     }
}

function mapStateToProps ({ questions, users, authedUser }, {id}) {
//     const question =questions[id]
//   return {
//    question:question,
//    author: users[question.author],
//    id
//   }
return {
    question: questions[id],
      author: users[questions[id].author],
      id,
} 
}
export default connect(mapStateToProps)(Question);