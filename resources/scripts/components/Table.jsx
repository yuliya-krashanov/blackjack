import React from 'react'
import $ from 'jquery';
import Dealer from './Dealer.jsx'
import Box from './Box.jsx'
import BetInterface from './BetInterface.jsx'
import PlayerInterface from './PlayerInterface.jsx'
import FinishInterface from './FinishInterface.jsx'
import InsuranceInterface from './InsuranceInterface.jsx'

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
                double: false,
                result: '',
                insurance: 0,
                win: 0
            }
        }

        this.betSizes = [5, 25, 100, 200, 500];

        this.state = {
            deck: [],
            boxes: boxes,
            dealer: {
                cards: [],
                score: [],
                finish: false
            },
            gameStatus: 'bet',
            openCard: false,
            insurance: false,
            alreadyDouble: false
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
        this.rebet = this.rebet.bind(this);
        this.newGame = this.newGame.bind(this);
        this.changeBox = this.changeBox.bind(this);
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
        let noBet = true;
        for (let box in boxes) {
            if (boxes[box].bet > 0){
                noBet = false;
                boxes[box].cards = boxes[box].cards.concat(this.dealCards(2));
                boxes[box].score = this.countScore(boxes[box].cards);
                boxes[box].split = ( boxes[box].cards[0].value == boxes[box].cards[1].value );
                boxes[box].double = ( (boxes[box].score.includes(10) || boxes[box].score.includes(11)) && boxes[box].cards.length == 2 );
                boxes[box].result = this.checkScore(boxes[box]);
            }
        }
        if (noBet){
            alert('No bets!'); return;
        }
        dealer.cards = dealer.cards.concat(this.dealCards(2));
        dealer.score = this.countScore([dealer.cards[0]]);
        if (dealer.cards[0].value == 11) {
            this.setState({ boxes: boxes, dealer: dealer, gameStatus: 'insurance'});
        }else{
            this.setState({ boxes: boxes, dealer: dealer, gameStatus: 'play'});
        }
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
        if (box.result !== '' ) this.changeBox();
       // if (box.splited && box.cards[0].value == 11) this.stand();
    }

    stand(){
        let box = this.state.boxes[this.state.currentBox];
        if (box.score.length > 1) box.score.splice(0, box.score.length - 1);
        this.setState({boxes: this.state.boxes}, () =>  this.changeBox());
    }

    double(){
        let box = this.state.boxes[this.state.currentBox];
        this.props.onUpdateBalance(-box.bet);
        box.bet *= 2;
        box.cards = box.cards.concat(this.dealCards(1));
        box.score =  this.countScore(box.cards);
        box.result = this.checkScore(box);
        this.setState({ boxes: this.state.boxes, alreadyDouble: true }, () => this.stand());
    }

    split(){
        let box = this.state.boxes[this.state.currentBox];
        this.props.onUpdateBalance(-box.bet);
        const isAces = box.cards[0].value == 11;
        let firstBoxCards = [box.cards[0]].concat(this.dealCards(1));
        let secondBoxCards = [box.cards[1]].concat(this.dealCards(1));
        let firstBoxScore = this.countScore(firstBoxCards);
        let secondBoxScore = this.countScore(secondBoxCards);
        let boxes = this.state.boxes;

       boxes[this.state.currentBox] =  {
            bet: box.bet,
            cards: firstBoxCards,
            score: firstBoxScore,
            split: firstBoxCards[0].value == firstBoxCards[1].value,
            double: (firstBoxScore.includes(10) || firstBoxScore.includes(11)) && firstBoxScore.length == 2,
            splited: true,
            result: '',
            win: 0
        };
        for (let i = Object.keys(boxes).length; i > this.state.currentBox; i--){
            if (boxes.hasOwnProperty(i))  {
                Object.defineProperty(boxes, i+1, Object.getOwnPropertyDescriptor(boxes, i));
                delete boxes[i];
            }
        }
        this.state.boxes[this.state.currentBox + 1] =  {
            bet: box.bet,
            cards: secondBoxCards,
            score: secondBoxScore,
            split: secondBoxCards[0].value == secondBoxCards[1].value,
            double: (secondBoxScore.includes(10) || secondBoxScore.includes(11)) && secondBoxScore.length == 2,
            splited: true,
            result: '',
            win: 0
        };

        if (isAces) this.changeBox(this.state.currentBox - 1);
        else this.changeBox(this.state.currentBox + 1);
        this.setState({boxes: this.state.boxes});
    }

    insurance(){
        let box = this.state.boxes[this.state.currentBox];
        box.insurance = box.bet / 2;
        this.props.onUpdateBalance(-box.insurance);
        this.setState({ insurance: true, boxes: this.state.boxes }, () => {
            this.changeBox();
        });
    }

    openDealerCard(){
        this.setState({ gameStatus: 'play'});
        if (this.state.insurance){
            this.state.dealer.score = this.countScore(this.state.dealer.cards);
            this.setState({ openCard: true, dealer: this.state.dealer });
            if (this.state.dealer.cards[1].value == 10){
                this.finishGame();
                return;
            }
        }
        this.changeBox(this.props.numberOfBoxes);
    }

    newGame(){
        let boxes = {};
        for (let i = 1; i <= this.props.numberOfBoxes; i++) {
            boxes[i] =  {
                bet: 0,
                cards: [],
                score: [],
                split: false,
                double: false,
                result: '',
                insurance: 0,
                win: 0
            }
        }
        this.setState({
            boxes: boxes,
            dealer: {
                cards: [],
                score: [],
                finish: false
            },
            gameStatus: 'bet',
            openCard: false,
            insurance: false,
            alreadyDouble: false
        }, () => {
            this.deck();
        });
    }

    rebet(){
        let boxes = {};
        for (let i = 1; i <= this.props.numberOfBoxes; i++) {
            this.props.onUpdateBalance(-this.state.boxes[i].bet);
            boxes[i] =  {
                bet: this.state.boxes[i].bet,
                cards: [],
                score: [],
                split: false,
                double: false,
                result: '',
                insurance: 0,
                win: 0
            }
        }
        this.setState({
            boxes: boxes,
            dealer: {
                cards: [],
                score: [],
                finish: false
            },
            gameStatus: 'bet',
            openCard: false,
            insurance: false,
            alreadyDouble: false
        }, () => {
            this.deck();
            this.deal();
        });
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
            if(this.state.gameStatus == 'play')
                this.finishGame();
            else if(this.state.gameStatus == 'insurance')
                this.openDealerCard();
        } else if (this.state.boxes[box].bet && this.state.boxes[box].result == '') {
            this.setState({ currentBox: box});
        } else this.changeBox(box - 1);
    }

    finishGame(){
        this.dealDealer();
        this.setState({ gameStatus: 'finish'});
        this.gameResults();
    }

    gameResults(){
        let boxes = this.state.boxes;
        let dealerScore = this.state.dealer.score;
        let totalWin = 0;
        if (!this.state.dealer.blackjack){
            for(let box in boxes){
                if (boxes[box].result == '' && boxes.hasOwnProperty(box)){
                    if (dealerScore > 21){
                        boxes[box].result = 'WIN';
                    }else{
                        if (boxes[box].score > dealerScore) boxes[box].result = 'WIN';
                        else if (boxes[box].score < dealerScore) boxes[box].result = 'NO WIN';
                        else boxes[box].result = 'PUSH';
                    }
                }
                switch (boxes[box].result){
                    case 'WIN':
                        boxes[box].win = boxes[box].bet * 2;
                        break;
                    case 'PUSH':
                        boxes[box].win = boxes[box].bet;
                        break;
                    case 'BJ':
                        boxes[box].win = boxes[box].bet * 2.5;
                        break;
                    default:
                        break;
                }
                totalWin += boxes[box].win;
            }
        } else {
            for(let box in boxes){
                if (boxes[box].result == '' && boxes.hasOwnProperty(box)){
                    boxes[box].result = 'NO WIN';
                }
                switch (boxes[box].result){
                    case 'NO WIN':
                        boxes[box].win = boxes[box].insurance * 2;
                        break;
                    case 'BJ':
                        boxes[box].win = boxes[box].bet;
                        boxes[box].result = 'PUSH';
                        break;
                    default:
                        break;
                }
                totalWin += boxes[box].win;
            }
        }
        this.props.onUpdateBalance(totalWin);
        this.setState({boxes: boxes});
    }

    dealDealer(){
        let dealer = this.state.dealer;
        dealer.score =  this.countScore(dealer.cards);
        if (dealer.score[dealer.score.length - 1] < 17 || ( dealer.score[dealer.score.length - 1] > 17 && dealer.score[dealer.score.length - 1] < 21 && dealer.score.length > 1 ) ){
            dealer.cards = dealer.cards.concat(this.dealCards(1));
            this.setState({dealer: dealer});
            this.dealDealer();
        }else if (dealer.score.includes(21) && dealer.score.length == 2){
            dealer.blackjack = true;
            this.setState({dealer: dealer});
        }else {
            this.setState({dealer: dealer});
        }
    }

    render() {
        let boxes = [], Interface;
        const box = this.state.boxes[this.state.currentBox];
        switch (this.state.gameStatus) {
            case 'bet':
                Interface = <BetInterface numberOfBoxes={this.props.numberOfBoxes} betSizes={this.betSizes} onChangeBets={this.bet} onDeal={this.deal} />;
                break;
            case 'insurance':
                Interface = <InsuranceInterface currentBox={this.state.currentBox} onInsurance={this.insurance} onContinue={this.changeBox} />;
                break;
            case 'play':
                Interface = <PlayerInterface double={box.double} alreadyDouble={this.state.alreadyDouble} split={box.split} onHit={this.hit} onStand={this.stand} onDouble={this.double} onSplit={this.split} currentBox={this.state.currentBox}  />;
                break;
            case 'finish':
                Interface = <FinishInterface onRebet={this.rebet} onNewGame={this.newGame} />;
                break;
            default:
                break;
        }

        for (let box in this.state.boxes){
            boxes.push(<Box box={this.state.boxes[box]} key={box}  />);
        }
        return (
            <div className="table">
                <p>Balance: {this.props.balance}</p>
                <div className="dealer-block">
                    <Dealer dealer={this.state.dealer} openCard={this.state.openCard} gameStatus={this.state.gameStatus} />
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
    onUpdateBalance: React.PropTypes.func
};
Table.defaultProps = {
    numberOfBoxes: 3,
    balance: 0,
    deckSource: '/blackjack/deck',
    onUpdateBalance: function(change){}
};