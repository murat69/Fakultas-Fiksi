<ul class="nav nav-tabs mb-5">
    @foreach ($monev as $data)
        <li class="nav-item">
            <a class="nav-link @yield('dosen')" @hasSection('dosen')
                aria-current="page"
    @endif href="{{ route('monev.all', ['tahun' => $tahun]) }}">{{ $data->aspek }}</a>
    </li>
    @endforeach
    </li>
</ul>
