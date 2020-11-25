import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";
import Login from "./Login";

class Home extends Component {
  state = {
    answered: false,
  };

  handleUnansweredQuestions = (e) => {
    e.preventDefault();

    this.setState({
      answered: false,
    });
  };
  handleAnsweredQuestions = (e) => {
    e.preventDefault();

    this.setState({
      answered: true,
    });
  };

  handleViewPool = (e, id) => {
    e.preventDefault();

    this.props.history.push(`/questions/${id}`);
  };

  render() {
    const {
      unansweredQuestions,
      answeredQuestions,
      users,
      authedUser,
    } = this.props;
    const { answered } = this.state;

    let questionList = unansweredQuestions;
    if (authedUser === null) {
      return <Login />;
    }

    if (answered) {
      questionList = answeredQuestions;
    }

    return (
      <div className="center">
        <ButtonGroup>
          <Button
            className="home-buttons"
            onClick={this.handleUnansweredQuestions}
          >
            Unanswered Questions
          </Button>
          <Button
            className="home-buttons"
            onClick={this.handleAnsweredQuestions}
          >
            Answered Questions
          </Button>
        </ButtonGroup>
        <ListGroup className="home-list-group-item">
          {questionList.map((question) => (
            <ListGroupItem key={question.id}>
              <div className="a-size" >{users[question.author].name} asks:</div>
              <Media body>
                <Media
                  alt={users[question.author].id}
                  src={users[question.author].avatarURL}
                  className="avatar"
                />
                <div className="home-div">
                  <Media heading>Would you rather</Media>
                  <span>
                    ... {question.optionOne.text.substring(0, 15)} ...
                  </span>
                  <Button
                    color="success"
                    className="home-button"
                    onClick={(e) => this.handleViewPool(e, question.id)}
                  >
                    View Poll
                  </Button>
                </div>
              </Media>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    users,
    authedUser,
    answeredQuestions: Object.values(questions)
      .filter(
        (quesId) =>
          quesId.optionOne.votes.includes(authedUser) ||
          quesId.optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => b.timestamp - a.timestamp),
    unansweredQuestions: Object.values(questions)
      .filter(
        (quesId) =>
          !quesId.optionOne.votes.includes(authedUser) &&
          !quesId.optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => b.timestamp - a.timestamp),
  };
}

export default withRouter(connect(mapStateToProps)(Home));
