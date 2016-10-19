@extends('Blackjack::template')

@section('title', 'Blackjack')

@section('styles')
    @parent
@endsection

@section('content')
    <div id="blackjack">

    </div>
@endsection

@section('scripts-footer')
    @parent
    <script src="{{ asset('vendor/blackjack/js/app.js') }}"></script>
    <script>
       /* import Table from "react/lib/ReactDOM";
        let Blackjack = React.createClass({
            getInitialState: function(){
                return {
                    deck:
                }
            },
            render: function() {
                return (
                     <Table decks={this.state.deck} />
                );
            }
        });
        ReactDOM.render(<App />, document.getElementById('blackjack'));*/
    </script>
@endsection