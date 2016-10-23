import React from 'react'

export default class InsuranceInterface extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="insurance"> 
                <button onClick={this.props.onInsurance}>Insurance {this.props.currentBox} box</button>               
                <button onClick={this.props.onContinue}>Continue</button>
            </div>            
        );
    }
}