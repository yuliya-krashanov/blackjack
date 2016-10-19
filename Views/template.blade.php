<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    @section('styles')
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    @show
</head>
<body>

<div class="container">
    @yield('content')
</div>


@yield('scripts-footer')
</body>
</html>