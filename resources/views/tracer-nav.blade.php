<ul class="nav nav-tabs mb-5">
  <li class="nav-item">
    <a class="nav-link @yield('lingkungan')" @hasSection('lingkungan') aria-current="page" @endif href="{{route('tracer')}}">Teknik Lingkungan</a>
  </li>
  <li class="nav-item">
    <a class="nav-link  @yield('arsitektur')" @hasSection('arsitektur') aria-current="page" @endif  href="{{route('tracer')}}">Arsitektur</a>
  </li>
</ul>

       <section id="faq" class="faq" style="padding: 0px !important">
           <div data-aos="fade-up">
               <div class="faq-list" style="padding: 0 !important;">
                   <ul>
                       <li data-aos="fade-up" data-aos-delay="100" style="background: #eeb020; padding-left: 0; padding-right: 0;border: 1px solid #eeb020;">
                           <a data-bs-toggle="collapse" class="collapse" data-bs-target="#item1">
                               <div class="person-bar">
                                   <span class="person-name">2019</span>
                               </div>

                               <i class="bx bx-chevron-down icon-show"></i>
                               <i class="bx bx-chevron-up icon-close"></i>
                           </a>
                           <div id="item1" class="collapse" data-bs-parent=".faq-list">
                               <ul>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Pencarian']) }}">Pencarian
                                           Pekerjaan (Waktu Tunggu)</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Kesesuaian']) }}">Kesesuaian
                                           Bidang Pekerjaan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Tingkat']) }}">Tingkat
                                           dan Ukuran Tempat Kerja
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Jenis']) }}">Jenis
                                           Instansi Pengguna Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'sikap']) }}">Penilaian
                                           Pengguna Terhadap
                                           sikap/etika lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Keahlian']) }}">Penilaian
                                           Pengguna Terhadap Keahlian
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Berbahasa']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berbahasa Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Penggunaan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Penggunaan Teknologi Informasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Berkomunikasi']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berkomunikasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Pengembangan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Pengembangan Diri Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2019, 'aspek' => 'Kepuasan']) }}">Penilaian
                                           Pengguna Terhadap Tingkat
                                           Kepuasan Instansi/Perusahaan Untuk Menggunakan</a>
                                   </li>

                               </ul>


                           </div>
                       </li>
                       <li data-aos="fade-up" data-aos-delay="100" style="background: #eeb020; padding-left: 0; padding-right: 0;border: 1px solid #eeb020;">
                           <a data-bs-toggle="collapse" class="collapse" data-bs-target="#item2">
                               <div class="person-bar">
                                   <span class="person-name">2020</span>
                               </div>

                               <i class="bx bx-chevron-down icon-show"></i>
                               <i class="bx bx-chevron-up icon-close"></i>
                           </a>
                           <div id="item2" class="collapse" data-bs-parent=".faq-list">
                               <ul>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Pencarian']) }}">Pencarian
                                           Pekerjaan (Waktu Tunggu)</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Kesesuaian']) }}">Kesesuaian
                                           Bidang Pekerjaan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Tingkat']) }}">Tingkat
                                           dan Ukuran Tempat Kerja
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Jenis']) }}">Jenis
                                           Instansi Pengguna Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'sikap']) }}">Penilaian
                                           Pengguna Terhadap
                                           sikap/etika lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Keahlian']) }}">Penilaian
                                           Pengguna Terhadap Keahlian
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Berbahasa']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berbahasa Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Penggunaan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Penggunaan Teknologi Informasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Berkomunikasi']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berkomunikasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Pengembangan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Pengembangan Diri Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2020, 'aspek' => 'Kepuasan']) }}">Penilaian
                                           Pengguna Terhadap Tingkat
                                           Kepuasan Instansi/Perusahaan Untuk Menggunakan</a>
                                   </li>

                               </ul>


                           </div>
                       </li>
                       <li data-aos="fade-up" data-aos-delay="100" style="background: #eeb020; padding-left: 0; padding-right: 0;border: 1px solid #eeb020;">
                           <a data-bs-toggle="collapse" class="collapse" data-bs-target="#item3">
                               <div class="person-bar">
                                   <span class="person-name">2021</span>
                               </div>

                               <i class="bx bx-chevron-down icon-show"></i>
                               <i class="bx bx-chevron-up icon-close"></i>
                           </a>
                           <div id="item3" class="collapse" data-bs-parent=".faq-list">
                               <ul>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Pencarian']) }}">Pencarian
                                           Pekerjaan (Waktu Tunggu)</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Kesesuaian']) }}">Kesesuaian
                                           Bidang Pekerjaan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Tingkat']) }}">Tingkat
                                           dan Ukuran Tempat Kerja
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Jenis']) }}">Jenis
                                           Instansi Pengguna Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'sikap']) }}">Penilaian
                                           Pengguna Terhadap
                                           sikap/etika lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Keahlian']) }}">Penilaian
                                           Pengguna Terhadap Keahlian
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Berbahasa']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berbahasa Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Penggunaan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Penggunaan Teknologi Informasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Berkomunikasi']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berkomunikasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Pengembangan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Pengembangan Diri Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2021, 'aspek' => 'Kepuasan']) }}">Penilaian
                                           Pengguna Terhadap Tingkat
                                           Kepuasan Instansi/Perusahaan Untuk Menggunakan</a>
                                   </li>

                               </ul>


                           </div>
                       </li>
                       <li data-aos="fade-up" data-aos-delay="100" style="background: #eeb020; padding-left: 0; padding-right: 0;border: 1px solid #eeb020;">
                           <a data-bs-toggle="collapse" class="collapse" data-bs-target="#item4">
                               <div class="person-bar">
                                   <span class="person-name">2022</span>
                               </div>

                               <i class="bx bx-chevron-down icon-show"></i>
                               <i class="bx bx-chevron-up icon-close"></i>
                           </a>
                           <div id="item4" class="collapse" data-bs-parent=".faq-list">
                               <ul>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Pencarian']) }}">Pencarian
                                           Pekerjaan (Waktu Tunggu)</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Kesesuaian']) }}">Kesesuaian
                                           Bidang Pekerjaan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Tingkat']) }}">Tingkat
                                           dan Ukuran Tempat Kerja
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Jenis']) }}">Jenis
                                           Instansi Pengguna Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'sikap']) }}">Penilaian
                                           Pengguna Terhadap
                                           sikap/etika lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Keahlian']) }}">Penilaian
                                           Pengguna Terhadap Keahlian
                                           Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Berbahasa']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berbahasa Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Penggunaan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Penggunaan Teknologi Informasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Berkomunikasi']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Berkomunikasi Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Pengembangan']) }}">Penilaian
                                           Pengguna Terhadap Kemampuan
                                           Pengembangan Diri Lulusan</a>
                                   </li>
                                   <li class="list-item">
                                       <a href="{{ route('tracer', ['tahun' => 2022, 'aspek' => 'Kepuasan']) }}">Penilaian
                                           Pengguna Terhadap Tingkat
                                           Kepuasan Instansi/Perusahaan Untuk Menggunakan</a>
                                   </li>

                               </ul>


                           </div>
                       </li>
                   </ul>
               </div>
           </div>
       </section>
