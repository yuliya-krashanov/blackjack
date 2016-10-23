import React from 'react'

export default class BetInterface extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const bets = this.props.betSizes.map((bet, i) => {
            return (<option key={i} value={bet}>{bet}</option>)
        });
        let boxes = [];
        for (let i = 1; i <= this.props.numberOfBoxes; i++){
            boxes.push(<option key={i} value={i}>{i}</option>)
        }
        return (
            <div className="bet-block">
                <form onSubmit={this.props.onChangeBets}>
                    <select name="bet-amount" id="bet-amount">
                        {bets}
                    </select>
                    <select name="box-number" id="box-number">
                        {boxes}
                    </select>
                    <button>Bet</button>
                </form>
                <button onClick={this.props.onDeal}>Deal</button>
            </div>
        );
    }
}

BetInterface.propTypes = {
    numberOfBoxes: React.PropTypes.number,
    betSizes: React.PropTypes.arrayOf(React.PropTypes.number),
    onDeal: React.PropTypes.func
};
BetInterface.defaultProps = {
    numberOfBoxes: 3,
    betSizes: [5, 25, 100, 200, 500]
};