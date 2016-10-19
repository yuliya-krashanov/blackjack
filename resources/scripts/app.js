import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game.jsx";
import 'lodash';


ReactDOM.render(
    <Game source="/blackjack/deck"/>,
    document.getElementById('blackjack')
);