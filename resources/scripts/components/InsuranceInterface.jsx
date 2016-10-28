import React from 'react'

export default class InsuranceInterface extends React.Component {
    constructor(props){
        super(props);
        this.onContinue = this.onContinue.bind(this);
    }
    onContinue(){
        this.props.onContinue();
    }
    render(){
        return (
            <div className="insurance buttons">
                <button onClick={this.props.onInsurance}>Insurance {this.props.currentBox} box</button>
                <button onClick={this.onContinue}>No, continue</button>
            </div>            
        );
    }
}