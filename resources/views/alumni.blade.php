@extends('layouts.user')

@section('style')
    <style>
        section {
            padding: 7em 0;
        }
    </style>
@endsection

@section('conten')
    <section id="monev">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>{{ $title }}</h2>
            </div>
            <div class="row">
                <div class="col-lg-12 entries">
                    <!-- End blog entry -->
                    <div class="row">
                        <div class="col-md-6">
                            <p>
                                &emsp;Alumni adalah salah satu komponen penting atau stackholder dalam peningkatan mutu
                                perguruan tinggi. Peningkatan yang dimaksud adalah kemajuan almamater yang didapatkan dari
                                sumbang saran alumni terhadap beberapa aspek di kampus yang perlu dibenahi. Selain memajukan
                                almamater, alumni juga sebagai perpanjangan tangan atau pembentuk jaringan kerja yang
                                diharapkan dapat menciptakan ruangan kondusif di lingkungan kerja sehingga memudahkan adik
                                tingkat untuk diterima di lingkungan kerja yang sama.
                            </p>
                            <p>
                                &emsp;Untuk mewujudkan upaya tersebut, kami mengundang seluruh Alumni untuk berpartisipasi
                                dalam Program Pemutkhiran Data Alumni. Melalui program ini, diharapkan Universitas
                                Kebangsaan Republik Indonesia memiliki sumber data untuk mendorong terciptanya interaksi dan
                                kolaborasi yang kuat antara Alumni dan Universitas.
                            </p>
                            <div class="border border-warning p-3">
                                <p class="fst-italic">Jadilah bagian dari keikutsertaan tracer alumni <b>FTI UKRI</b>
                                    dengan mengisi form pada link di bawah ini :</p>
                                <a href="https://bit.ly/AlumniUpdateData" class="btn btn-primary"><i
                                        class='bx bx-bar-chart me-1'></i></box-icon>Update Data Alumni</a>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <img class="img-fluid w-100"
                                src="https://ftsp.ukri.ac.id/storage/upload/file/berita/thumbnail/file_1688902226_wisuda_prodi_arsitektur_ta_2021/2022.jpg" />
                        </div>

                        <div class="col-md-12 mt-3">
                            <img class="img-fluid" src="{{ asset('assets/img/exit-studi.jpeg') }}" />
                        </div>
                    </div>
                    <!-- End blog entries list -->
                </div>

            </div>
        </div>
    </section>
@endsection

@section('script')
@endsection
