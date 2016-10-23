import React from 'react'

export default class FinishInterface extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="bet-block">
                <button onClick={this.props.onRebet}>Rebet</button>
                <button onClick={this.props.onNewGame}>New Bets</button>
            </div>
        );
    }
}


FinishInterface.propTypes = {
    onNewGame: React.PropTypes.func,
    onRebet: React.PropTypes.func
};