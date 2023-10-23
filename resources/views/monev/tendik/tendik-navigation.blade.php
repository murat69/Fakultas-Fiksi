<ul class="nav nav-tabs mb-5">
  <li class="nav-item">
    <a class="nav-link @yield('gaji')" @hasSection('gaji') aria-current="page" @endif href="{{route('monev.tendik')}}">ASPEK KEPUASAN ATAS GAJI</a>
  </li>
  <li class="nav-item">
    <a class="nav-link @yield('promosi')" @hasSection('promosi') aria-current="page" @endif href="{{route('monev.tendik', ['aspek'=>'promosi'])}}">ASPEK PELUANG PROMOSI</a>
  </li>
  <li class="nav-item">
    <a class="nav-link @yield('penghargaan')" @hasSection('penghargaan') aria-current="page" @endif href="{{route('monev.tendik', ['aspek'=>'penghargaan'])}}">ASPEK PENGHARGAAN</a>
  </li>
  
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle  @yield('aspek_lain')" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">ASPEK LAINNYA</a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="{{route('monev.tendik', ['aspek'=>'supervisi'])}}">ASPEK KEPUASAN ATAS SUPERVISI</a></li>
      <li><a class="dropdown-item" href="{{route('monev.tendik', ['aspek'=>'kompensasi'])}}">ASPEK KOMPENSASI</a></li>
      <li><a class="dropdown-item" href="{{route('monev.tendik', ['aspek'=>'formalitas'])}}">ASPEK FORMALITAS PEKERJAAN</a></li>
      <li><a class="dropdown-item" href="{{route('monev.tendik', ['aspek'=>'konflik'])}}">ASPEK KONFLIK PEKERJAAN</a></li>
      <li><a class="dropdown-item" href="{{route('monev.tendik', ['aspek'=>'makna'])}}">ASPEK KEBERMANKAAN TUGAS</a></li>
      <li><a class="dropdown-item" href="{{route('monev.tendik', ['aspek'=>'komunikasi'])}}">ASPEK KOMUNIKASI ORGANISASIONAL</a></li>
    </ul>
  </li>
</ul>