import React from 'react';
import $ from 'jquery';
import Table from './Table.jsx';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0
        };
        this.getBalance = this.getBalance.bind(this);
        this.updateBalance = this.updateBalance.bind(this);
    }

    componentDidMount(){
        this.getBalance();
    }

    getBalance(){
        $.get(this.props.balanceSource, null,(result) => {
            this.setState({
                balance: result.balance
            })}, 'json')
        .fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    }

    updateBalance(change){
        this.setState({
            balance: this.state.balance + change
        });
        /*$.post(this.props.balanceSource, null,(result) => {
            console.log(result.deck);
            this.setState({
                balance: result.balance
            })}, 'json')
            .fail((xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            });*/
    }

    render(){
        return ( <Table deckSource='/blackjack/deck' balance={this.state.balance} onUpdateBalance={this.updateBalance} numberOfBoxes={3} />);
    }
}

Game.propTypes = {
    balanceSource: React.PropTypes.string
};
Game.defaultProps = {
    balanceSource: '/blackjack/balance'
};