import React from 'react';
import Card from './Card.jsx';

export default class Dealer extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        let cards = this.props.cards.map((card) => {
            return (<Card value={card.value} name={card.name} rank={card.rank}  />);
        });
        return (
            <div className="dealer">
                {cards}
                <div className="result">{this.props.result}</div>
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