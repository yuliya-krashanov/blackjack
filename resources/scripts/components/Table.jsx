import React from 'react'
import $ from 'jquery';
import Dealer from './Dealer.jsx'
import Box from './Box.jsx'
import BetInterface from './BetInterface.jsx'
import PlayerInterface from './PlayerInterface.jsx'

export default class Table extends React.Component {
    constructor(props){
        super(props);
        let boxes = {};
        for (let i = 1; i <= this.props.numberOfBoxes; i++) {
            boxes[i] =  {
                bet: 0,
                cards: [],
                score: [],
                split: false,
                result: ''
            }
        }

        this.betSizes = [5, 25, 100, 200, 500];

        this.state = {
            deck: [],
            boxes: boxes,
            dealer: {
                cards: [],
                score: 0,
                finish: false
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
       /* this.countScore= this.countScore.bind(this);
        this.checkScore = this.checkScore.bind(this);*/
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
                boxes[box].cards = boxes[box].cards.concat(this.dealCards(2));
                boxes[box].score = this.countScore(boxes[box].cards);
                boxes[box].split = (boxes[box].cards[0].value == boxes[box].cards[1].value);
                boxes[box].result = this.checkScore(boxes[box]);
            }
        }
        dealer.cards = dealer.cards.concat(this.dealCards(2));
        this.setState({ boxes: boxes, dealer: dealer, betInterface: false});
        this.changeBox(this.props.numberOfBoxes);
    }

    dealCards(number) {
        let deck = this.state.deck;
        let hand = [];

        for ( number; number > 0; number--){
            hand.push(deck.shift());
        }
        this.setState({deck: deck});
        return hand;
    }

    hit(){
        let box = this.state.boxes[this.state.currentBox];
        box.cards = box.cards.concat(this.dealCards(1));
        box.score =  this.countScore(box.cards);
        box.result = this.checkScore(box);
        this.setState({ boxes: this.state.boxes });
        if (box.result !== '') this.changeBox();
    }

    stand(){
        let box = this.state.boxes[this.state.currentBox];
        if (box.score.length > 1) box.score.splice(0, box.score.length - 1);
        this.changeBox();
    }

    double(){
        let box = this.state.boxes[this.state.currentBox];
        this.props.onUpdateBalance(-box.bet);
        box.bet *= 2;
        box.cards = box.cards.concat(this.dealCards(1));
        box.score =  this.countScore(box.cards);
        box.result = this.checkScore(box);
        this.setState({ boxes: this.state.boxes });
        this.changeBox();
    }

    split(){
        let box = this.state.boxes[this.state.currentBox];
        const removedCard = box.cards.shift();
        this.state.boxes.push({
            bet: box.bet,
            cards: [removedCard],
            score: this.countScore([removedCard]),
            split: false,
            splited: true,
            result: ''
        })
    }

    insurance(){

    }

    countScore(cards){
        let scoreSum = 0;
        let aces = 0;
        cards.forEach((card) => {
            scoreSum += card.value;
            aces += card.rank == 'A' ? 1 : 0;
        });
        let score = [];
        if (aces){
            if(scoreSum <= 21) score.push(scoreSum);
            for (aces; aces > 0; aces--){
                scoreSum -= 10;
                if (scoreSum <= 21 || aces == 1)
                    score.unshift(scoreSum);
            }
        } else score.push(scoreSum);
        return score;
    }

    checkScore(box){
        if (box.cards.length == 2 && box.score.includes(21) && !box.splited){
            return "BJ";
        } else if ( box.score.length < 2 && box.score[0] > 21){
            return "BUST";
        }
        return '';
    }

    changeBox (box = this.state.currentBox-1) {
        if(!this.state.boxes.hasOwnProperty(box.toString())){
            this.finishGame();
        } else if (this.state.boxes[box].bet && this.state.boxes[box].result == '') {
            this.setState({ currentBox: box});
        } else this.changeBox(box - 1);
    }

    finishGame(){
        let boxes = this.state.boxes;
        this.dealDealer();
        this.state.dealer.finish = true;
        this.setState({dealer: this.state.dealer});
        this.gameResults();
    }

    gameResults(){
        let boxes = this.state.boxes;
        boxes.forEach((box, i) => {

        });
    }

    dealDealer(){
        let dealer = this.state.dealer;
        dealer.score =  this.countScore(dealer.cards);
        if (dealer.score[dealer.score.length - 1] < 17 || ( dealer.score[dealer.score.length - 1] > 17 && dealer.score[dealer.score.length - 1] < 21 && dealer.score.length > 1 ) ){
            dealer.cards = dealer.cards.concat(this.dealCards(1));
            this.setState({dealer: dealer});
            this.dealDealer();
        }else {
            this.setState({dealer: dealer});
        }
    }

    render() {
        let boxes = [];
        const box = this.state.boxes[this.state.currentBox];
        const Interface = (this.state.betInterface == true) ?
            <BetInterface numberOfBoxes={this.props.numberOfBoxes} betSizes={this.betSizes} onChangeBets={this.bet} onDeal={this.deal} /> :
            <PlayerInterface onHit={this.hit} onStand={this.stand} onDouble={this.double} onSplit={this.split} currentBox={this.state.currentBox} split={box.split} />;
        for (let box in this.state.boxes){
            boxes.push(<Box box={this.state.boxes[box]} key={box}  />);
        }
        return (
            <div className="table">
                <p>Balance: {this.props.balance}</p>
                <div className="dealer-block">
                    <Dealer dealer={this.state.dealer} />
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