import React from 'react';
import $ from 'jquery';
import Table from './Table.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            deck: {},
            balance: 0
        };
        this.newGame = this.newGame.bind(this);
    }

    componentDidMount(){
        this.newGame();
    }
    newGame(){
        $.post(this.props.source)
        .done((result) => {
            this.setState({
                deck: result.deck,
                balance: result.balance
            });
        })
        .fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    }

    render(){
        return ( <Table deck={this.state.deck} balance={this.state.balance} onNewGame={this.newGame} numberOfBoxes="3" />);
    }
}

Game.propTypes = {
    source: React.PropTypes.string
};
Game.defaultProps = {
    source: '/blackjack/deck'
};