import React from 'react'
import $ from 'jquery';
import Dealer from './Dealer.jsx'
import Box from './Box.jsx'
import BetInterface from './BetInterface.jsx'
import PlayerInterface from './BetInterface.jsx'

export default class Table extends React.Component {
    constructor(props){
        super(props);
        let boxes = {};
        for (let i = 1; i <= this.props.numberOfBoxes; i++) {
            boxes[i] =  {
                bet: 0,
                cards: [],
                score: 0,
                result: ''
            }
        }

        this.betSizes = [5, 25, 100, 200, 500];

        this.state = {
            deck: [],
            boxes: boxes,
            dealer: {
                cards: [],
                score: 0
            },
            betInterface: true
        };

        this.bet = this.bet.bind(this);
        this.deal = this.deal.bind(this);
        this.deck = this.deck.bind(this);
        this.dealCards = this.dealCards.bind(this);
        this.hit = this.hit.bind(this);
        this.stand = this.stand.bind(this);
        this.double = this.double.bind(this);
        this.split = this.split.bind(this);
        this.insurance = this.insurance.bind(this);
    }

    componentDidMount(){
        this.deck();
    }

    bet(e){
        e.preventDefault();
        const amount = e.target.elements['bet-amount'].value;
        const box = e.target.elements['box-number'].value;
        if ((this.props.balance - amount) < 0)
            alert('Not enough money :(');
        else{
            this.state.boxes[box].bet += +amount;
            this.setState({
                boxes: this.state.boxes,
            });
            this.props.onUpdateBalance(-amount);
        }
    }

    deck(){
        $.get(this.props.deckSource, null,(result) => {
            this.setState({
                deck: result.deck,
            })}, 'json')
            .fail((xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            });
    }

    deal(){
        let boxes = this.state.boxes;
        let dealer = this.state.dealer;
        for (let box in boxes) {
            if (boxes[box].bet > 0){
                boxes[box].cards = boxes[box].cards.concat(this.dealCards(2))
            }
        }
        dealer.cards = dealer.cards.concat(this.dealCards(2));

        this.setState({ boxes: boxes, dealer: dealer, betInterface: false});
    }

    dealCards(number) {
        let deck = this.state.deck;
        let hand = [];

        for ( number; number > 0; number--){
            hand.push(deck.pop());
        }
        this.setState({deck: deck});
        return hand;
    }

    hit(){
        this.state.boxes[this.state.currentBox].cards.push(dealCards(1));
        this.setState({ boxes: this.state.boxes });
        this.checkScore();
    }

    stand(){
        this.changeBox();
    }

    double(){
        let boxes = this.state.boxes;
        const current = this.state.currentBox;
        boxes[current].bet *= 2;
        boxes[current].cards.push(dealCards(1));
        this.setState({ boxes: boxes });
        this.changeBox();
    }

    split(){

    }

    insurance(){

    }

    checkScore(){

    }

    changeBox (box = this.state.currentBox-1){
        if(!this.state.boxes.hasOwnProperty(box.toString())){
            this.finishGame()
        } else if (this.state.boxes[box].bet) {
            this.setState({ currentBox: box});
        } else this.changeBox(box - 1);
    }

    finishGame(){

    }

    render() {
        let boxes = [];

        const Interface = (this.state.betInterface == true) ?
            <BetInterface numberOfBoxes={this.props.numberOfBoxes} betSizes={this.betSizes} onChangeBets={this.bet} onDeal={this.deal} /> :
            <PlayerInterface onHit={this.hit} onStand={this.stand} onDouble={this.double} onSplit={this.split} currentPlayer={this.state.currentBox} />;
        for (let box in this.state.boxes){
            boxes.push(<Box cards={this.state.boxes[box].cards} result={this.state.boxes[box].score} bet={this.state.boxes[box].bet} key={box} />);
        }
        return (
            <div className="table">
                <p>Balance: {this.props.balance}</p>
                <div className="dealer-block">
                    <Dealer cards={this.state.dealer.cards} result={this.state.dealer.score} />
                </div>
                <div className="boxes">
                    {boxes}
                </div>
                {Interface}
            </div>
        );
    }
}

Table.propTypes = {
    numberOfBoxes: React.PropTypes.number,
    balance: React.PropTypes.number,
    deckSource: React.PropTypes.string,
    onUpdateBalance: React.PropTypes.func,
};
Table.defaultProps = {
    numberOfBoxes: 3,
    balance: 0,
    deckSource: '/blackjack/deck',
    onUpdateBalance: function(change){}
};