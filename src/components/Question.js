import React, { Component } from 'react';
import { connect } from 'react-redux';


class Question extends Component{
    render(){
        return(

            <div>question</div>
        )
    }
}

function mapStateToProps(){
    return{
        
    }
}
export default connect()(Question);