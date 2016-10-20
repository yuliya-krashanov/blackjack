import React from 'react'

export default class PlayerInterface extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="play">
                <p className="current">{this.props.currentBox}</p>
                <div className="buttons">
                    <button onClick={this.props.hit}>Hit</button>
                    <button onClick={this.props.stand}>Stand</button>
                    <button onClick={this.props.double}>Hit</button>
                    <button onClick={this.props.split}>Split</button>
                </div>
            </div>
        );
    }
}

PlayerInterface.propTypes = {
    currentBox: React.PropTypes.number,
};
PlayerInterface.defaultProps = {
    currentBox: 3
};