import React from 'react'
import Dealer from './Dealer.jsx'
import Box from './Box.jsx'
import BetInterface from './BetInterface.jsx'

export default class Table extends React.Component {
    constructor(props){
        super(props);
        let boxes = {};
        for (let i = 1; i <= this.props.numberOfBoxes; i++) {
            boxes[i] =
            {
                bet: 0,
                cards: [],
                score: 0
            }
        }

        this.betSizes = [5, 25, 100, 200, 500];

        this.state = {
            deck: this.props.deck,
            balance: this.props.balance,
            boxes: boxes,
            dealer: {
                cards: [],
                score: 0
            }
        };

        this.bet = this.bet.bind(this);
        this.deal = this.deal.bind(this);
        this.dealCards = this.dealCards.bind(this);
    }

    bet(e){
        e.preventDefault();
        console.log(e.target);
       /* if ((this.state.balance - amount) < 0)
            console.log('No money');
        else{
           // this.state.boxes[box].bet += amount;
            this.setState({
                boxes: this.state.bets,
                //balance: this.state.balance - amount
            });
        }*/
    }

    deal(){
        let boxes = this.state.boxes;
        let dealer = this.state.dealer;
        for (let box in boxes) {
            if (box.bet > 0){
                box.cards.push(this.dealCards(2))
            }
        }
        dealer.cards.push(this.dealCards(2));
    }

    dealCards(number) {
        let deck = this.state.deck;
        let hand = [];

        for ( number; number > 0; number--){
            hand.push(deck.pop());
        }
        this.setState()
    }

    render() {
        let boxes = [];
        for (let box in this.state.boxes){
            boxes.push(<Box cards={box.cards} result={box.score} bet={box.bet} />);
        }
        return (
            <div className="table">
                <p>Balance: {this.state.balance}</p>
                <button onClick={this.props.onNewGame}>New Game</button>
                <Dealer cards={this.state.dealer.cards} result={this.state.dealer.score} />
                {boxes}
                <BetInterface numberOfBoxes={this.props.numberOfBoxes} betSizes={this.betSizes} onChangeBets={this.bet} onDeal={this.deal} />
            </div>
        );
    }
}

Table.propTypes = {
    numberOfBoxes: React.PropTypes.number,
    deck: React.PropTypes.arrayOf(React.PropTypes.object),
    balance: React.PropTypes.number
};
Table.defaultProps = {
    numberOfBoxes: 3,
    deck: [],
    balance: 0
};