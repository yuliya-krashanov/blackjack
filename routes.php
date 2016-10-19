<?php

//use Illuminate\Routing\Route;

Route::group(['prefix' => 'blackjack'], function () {
    Route::get('/', '\App\Playbetr\Modules\Blackjack\BlackjackController@index');
    Route::post('/deck', '\App\Playbetr\Modules\Blackjack\BlackjackController@getNewDeck');
});