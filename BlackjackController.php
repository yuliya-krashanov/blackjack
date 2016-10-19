<?php namespace App\Playbetr\Modules\Blackjack;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BlackjackController extends Controller {

    protected $blackjack;

    public function __construct(BlackjackRepository $blackjack)
    {
        $this->blackjack = $blackjack;
    }

    public function index()
    {
        //$decks = $this->blackjack->genericDecks();
        return view('Blackjack::gameboard')/*->with('deck', $decks)*/;
    }

    public function getNewDeck(Request $request)
    {
        exit(json_encode(['deck' => $this->blackjack->genericDecks(), 'balance' => $this->blackjack->getBalance()]));
    }

}