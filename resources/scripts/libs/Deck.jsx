import { fromJS } from 'immutable';

export const shuffle = (array) => {
    let j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};

export const newDeck = (number) => {
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['S', 'C', 'H', 'D'];
    const numberOfCards = number * 52;
    const deck = [];

    let fullDeck = [];

    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({ "rank": r, "suit": s});
        });
    });

    for (let i=0; i < number; i++){
        fullDeck = fullDeck.concat(deck);
    }

    shuffle(deck);

    return fromJS(deck);
};