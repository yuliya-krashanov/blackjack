import React from 'react'
import Card from './Card.jsx';

export default class Box extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        let newCards = nextProps.box.cards;
        //if (this.props.box.cards !== newCards)
    }

    handleBoxDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleBoxDrop(e){
        this.props.onBet(e, this.props.number);
    }

    render() {
        let cards = this.props.box.cards.map((card, i) => {
            return (<Card suit={card.suit} rank={card.rank} key={i}/>);
        });
        let score = this.props.box.score.reduce(function (res, current) {
            if (res !== '') {
                return res + '/' + current;
            } else {
                return current;
            }
        }, '');
        const gameResults = (cards.length) ?
            <div className="results">
                {(() => {
                    if (this.props.box.insurance)
                        return ( <div className="insurance">Insurance:{this.props.box.insurance}</div>);
                })()}
                {(() => {
                    if (this.props.box.result)
                        return (<div className={this.props.box.result.toLowerCase() + ' result'}>{this.props.box.result}</div>);
                    else return <div className="score">{score}</div>
                })()}
            </div> : null;
        return (
            <div className={'box ' + this.props.active} onDrop={this.handleBoxDrop.bind(this)} onDragOver={this.handleBoxDragOver}>
                {(() => {
                    if (this.props.box.win)
                        return (<div className="win">{this.props.box.win}</div>);
                    else return ( <div className="bet">{this.props.box.bet}</div>);
                })()}
                <div className="cards">
                    {cards}
                </div>
                {gameResults}
            </div>
        );

    }
}