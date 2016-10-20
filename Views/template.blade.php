<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    @section('styles')
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @show
</head>
<body>

<div class="container">
    @yield('content')
</div>


@yield('scripts-footer')
</body>
</html>