import React from 'react';
import Card from './Card.jsx';

export default class Dealer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let cards = this.props.dealer.cards.map((card, i) => {
            return (<Card value={card.value} name={card.name} rank={card.rank} key={i}
                          hide={i == 1 && (this.props.gameStatus !== 'finish' && !this.props.openCard )}  />);
        });
        let score = this.props.dealer.score.reduce(function(res, current){
            if(res !== ''){
                return res + '/' + current;
            } else {
                return current;
            }
        }, '');

        if(cards && this.props.dealer.score.length) return  (
            <div className="dealer">
                <div className="cards" id="dealer-cards">
                    {cards}
                </div>
                <div className="score results">{score}</div>
            </div>);
        else return null;
    }
}

Dealer.propTypes = {
    dealer: React.PropTypes.object
};

Dealer.defaultProps = {
    dealer: {}
};