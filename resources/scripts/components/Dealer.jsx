import React from 'react';
import Card from './Card.jsx';

export default class Dealer extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        let cards = this.props.dealer.cards.map((card, i) => {
            if (i == 1 && (this.props.gameStatus !== 'finish' && !this.props.openCard )) { return '?' }
            return (<Card value={card.value} name={card.name} rank={card.rank} key={i}  />);
        });
        let score = this.props.dealer.score.reduce(function(res, current){
            if(res !== ''){
                return res + '/' + current;
            } else {
                return current;
            }
        }, '');

        return (
            <div className="dealer">
                <label htmlFor="dealer-cards">Dealer:</label>
                <div className="cards" id="dealer-cards">
                    {cards}
                </div>
                <div className="score">Score: {score}</div>
            </div>
        );
    }
}

Dealer.propTypes = {
    dealer: React.PropTypes.object
};

Dealer.defaultProps = {
    dealer: {}
};