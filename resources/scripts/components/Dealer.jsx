import React from 'react';
import Card from './Card.jsx';

export default class Dealer extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        let cards = this.props.cards.map((card, i) => {
            return (<Card value={card.value} name={card.name} rank={card.rank} key={i}  />);
        });
        return (
            <div className="dealer">
                <label htmlFor="dealer-cards">Dealer:</label>
                <div className="cards" id="dealer-cards">
                    {cards}
                </div>
                <div className="score">{this.props.score || ''}</div>
            </div>
        );
    }
}

Dealer.propTypes = {
    cards: React.PropTypes.array,
    result: React.PropTypes.number
};
Dealer.defaultProps = {
    cards: [],
    result: 0
};