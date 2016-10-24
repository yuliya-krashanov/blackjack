import React from 'react'
import Card from './Card.jsx';

export default class Box extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let cards = this.props.box.cards.map((card, i) => {
            return (<Card value={card.value} name={card.name} rank={card.rank} key={i}/>);
        });
        let score = this.props.box.score.reduce(function (res, current) {
            if (res !== '') {
                return res + '/' + current;
            } else {
                return current;
            }
        }, '');
        const gameResults = (cards.length) ?
            <div>
                {(() => {
                    if (this.props.box.insurance)
                        return ( <div className="insurance">Insurance:{this.props.box.insurance}</div>);
                })()}
                <div className="score">Score: {score}</div>
                <div className="result">Result: {this.props.box.result}</div>
                <div className="win">Win: {this.props.box.win}</div>
            </div> : null;
        return (
            <div className="box">
                <label>Cards:</label>
                <div className="cards">
                    {cards}
                </div>
                {gameResults}
                <div className="bet">Bet: {this.props.box.bet}</div>
            </div>
        );

    }
}