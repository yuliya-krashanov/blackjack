import React from 'react'
import Card from './Card.jsx';
import PlayerInterface from './PlayerInterface.jsx';

export default class Box extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let cards = this.props.cards.map((card) => {
            return (<Card value={card.value} name={card.name} rank={card.rank}  />);
        });
        return (
            <div className="box">
                {cards}
                <PlayerInterface cards={this.props.cards}  />
            </div>
        );
    }
}