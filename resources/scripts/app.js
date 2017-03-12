import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game.jsx";
import 'lodash';


ReactDOM.render(
    <Game balanceSource="/blackjack/balance"/>,
    document.getElementById('blackjack')
);