<?php

namespace App\Playbetr\Modules\Blackjack;

use App\Playbetr\Modules\Shuffle\ShuffleRepository;

class BlackjackRepository {

    protected $decksNumber;
    protected $shuffleRepository;

    public function __construct(ShuffleRepository $shuffleRepository)
    {
        $this->decksNumber = config('blackjack.decks_number');
        $this->shuffleRepository = $shuffleRepository;
    }

    public function genericDecks()
    {
        $numberOfCards = $this->decksNumber * 52;
        $fullDeck = [];
        $shuffledDeck = [];
        $deck = $this->getDeck();

        for ( $i = 0; $i < $this->decksNumber; $i++){
            $fullDeck = array_merge($fullDeck, $deck);
        }

        $shuffle = $this->shuffleRepository->createShuffle(0, $numberOfCards-1);
        $shuffle = $this->shuffleRepository->doShuffle(['shuffle_id' => $shuffle->id, 'client_seed' => str_random(64)]);

        foreach(json_decode($shuffle->final_shuffle, true) as $key){
            $shuffledDeck[] = $fullDeck[$key];
        }

        return $this->genericValuableShuffledDeck($shuffledDeck);
    }

    /**
     * Return current user balance
     *
     * @return int
     */
    public function getBalance()
    {
        return 5000;
    }

    private function genericValuableShuffledDeck($shuffledDeck)
    {
        $values = ['A' => 11, 'J' => 10, 'Q' => 10, 'K' => 10];
        return array_map(function($card) use ($values) {
           $value = is_string($card['rank']) ?  $values[$card['rank']] : $card['rank'];
           return ['value' => $value, 'name' => $card['rank'] . $card['suit'], 'rank' => $card['rank']];
        }, $shuffledDeck);
    }

    /**
     * Return one not-shuffled deck
     *
     * @return array
     */
    private function getDeck()
    {
        $ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
        $suits = ['S', 'C', 'H', 'D'];

        $deck = [];

        foreach ($ranks as $rank){
            foreach ($suits as $suit){
                $deck[] = array('rank' => $rank, 'suit' => $suit);
            }
        }

        return $deck;
    }

}