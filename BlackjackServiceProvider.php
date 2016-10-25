<?php namespace App\Playbetr\Modules\Blackjack;

use Illuminate\Support\ServiceProvider;

class BlackjackServiceProvider extends ServiceProvider {

    public function boot()
    {
        $this->publishes([
            __DIR__.'/config/blackjack.php' => config_path('blackjack.php')
        ], 'config');
/*
        $this->publishes([
            __DIR__.'/database/migrations/' => database_path('migrations')
        ], 'migrations');
*/
        $this->publishes([
            __DIR__.'/public' => public_path('vendor/blackjack'),
        ], 'public');
        require(__DIR__.'/routes.php');
        $this->loadViewsFrom(__DIR__.'/Views', 'Blackjack');
    }

    public function register() {
        //
    }
}