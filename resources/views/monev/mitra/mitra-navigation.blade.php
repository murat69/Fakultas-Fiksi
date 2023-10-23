<ul class="nav nav-tabs mb-5">
  <li class="nav-item">
    <a class="nav-link @yield('identitas')" @hasSection('identitas') aria-current="page" @endif href="{{route('monev.mahasiswa')}}">IDENTITAS RESPONDEN</a>
  </li>
  <li class="nav-item">
    <a class="nav-link @yield('tangible')" @hasSection('tangible') aria-current="page" @endif href="{{route('monev.mahasiswa', ['aspek'=>'tangible'])}}">ASPEK TANGIBLES</a>
  </li>
  <li class="nav-item">
    <a class="nav-link @yield('reliability')" @hasSection('reliability') aria-current="page" @endif href="{{route('monev.mahasiswa', ['aspek'=>'reliability'])}}">ASPEK RELIABILITY </a>
  </li>
  <li class="nav-item">
    <a class="nav-link @yield('responsive')" @hasSection('responsive') aria-current="page" @endif href="{{route('monev.mahasiswa', ['aspek'=>'responsive'])}}">ASPEK RESPONSIVENESS </a>
  </li>

  <li class="nav-item">
    <a class="nav-link @yield('assurance')" @hasSection('assurance') aria-current="page" @endif href="{{route('monev.mahasiswa', ['aspek'=>'assurance'])}}">ASPEK ASSURANCE </a>
  </li>
  
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle  @yield('aspek_lain')" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">ASPEK LAINNYA</a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="{{route('monev.mahasiswa', ['aspek'=>'emphathy'])}}">ASPEK EMPHATHY</a></li>
      <li><a class="dropdown-item" href="{{route('monev.mahasiswa', ['aspek'=>'kemahasiswaan'])}}">ASPEK KHUSUS LAYANAN KEMAHASISWAAN</a></li>
    </ul>
  </li>
</ul>