<?php

//use Illuminate\Routing\Route;

Route::group(['prefix' => 'blackjack'], function () {
    Route::get('/', '\App\Playbetr\Modules\Blackjack\BlackjackController@index');
    Route::get('/deck', '\App\Playbetr\Modules\Blackjack\BlackjackController@getNewDeck');
    Route::get('/balance', '\App\Playbetr\Modules\Blackjack\BlackjackController@getBalance');
});