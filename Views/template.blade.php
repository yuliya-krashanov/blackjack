<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>
    @section('styles')
        <link rel="stylesheet" href="{{ asset('vendor/blackjack/css/blackjack.css') }}">
    @show
</head>
<body>

<div class="container">
    @yield('content')
</div>


@yield('scripts-footer')
</body>
</html>