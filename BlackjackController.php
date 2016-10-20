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
        return view('Blackjack::gameboard');
    }

    public function getNewDeck()
    {
        exit(json_encode(['deck' => $this->blackjack->genericDecks()]));
    }

    public function getBalance()
    {
        exit(json_encode(['balance' => $this->blackjack->getBalance()]));
    }

}