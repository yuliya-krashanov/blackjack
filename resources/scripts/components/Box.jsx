import React from 'react'
import Card from './Card.jsx';
import PlayerInterface from './PlayerInterface.jsx';

export default class Box extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let cards = this.props.cards.map((card) => {
            return (<Card value={card.value} name={card.name} rank={card.rank} key={card.name} />);
        });
        return (
            <div className="box">
                <label>Cards:</label>
                <div className="cards">
                    {cards}
                </div>
                <div className="score">{this.props.score}</div>
                <div className="bet">Bet: {this.props.bet}</div>
                <div className="result">{this.props.result}</div>
            </div>
        );
    }
}

Box.propTypes = {
    cards: React.PropTypes.array,
    result: React.PropTypes.number,
    bet: React.PropTypes.number
};
Box.defaultProps = {
    cards: [],
    result: 0,
    bet: 0
};