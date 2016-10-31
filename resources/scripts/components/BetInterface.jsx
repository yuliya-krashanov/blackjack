import React from 'react'

export default class BetInterface extends React.Component {
    constructor(props) {
        super(props);
    }

    handleBetDragStart(e) {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData("bet", e.target.innerHTML);
        return true;
    }

    handleClick(e){
        if (this.props.mobile)
            this.props.onChangeBets(e, 1, e.target.innerHTML);
    }

    render() {
        const bets = this.props.betSizes.map((bet, i) => {
            return (<li draggable="true" onClick={this.handleClick.bind(this)} onDragStart={this.handleBetDragStart} key={i}>{bet}</li>)
        });
        let boxes = [];
        for (let i = 1; i <= this.props.numberOfBoxes; i++){
            boxes.push(<option key={i} value={i}>{i}</option>)
        }
        return (
            <div className="bet-block">
                <ul className="bets buttons">
                    {bets}
                </ul>
                <div className="buttons">
                    <button onClick={this.props.onDeal}>Deal</button>
                </div>
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