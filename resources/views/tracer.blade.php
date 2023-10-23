@extends('layouts.user')

@section('style')
    <style>
        .person-bar {
            align-items: center;
        }

        .card {
            width: initial;
            background: #47117b;
            height: initial;
            margin-top: 15px;
            box-shadow: none;
            color: white;
        }

        .person-image {
            position: absolute;
            width: 50px;
            height: 50px;
            float: left;
            border-radius: 50%;
            left: 0;
            right: 0;
            left: -12px;
            top: -12px;
        }

        .form-group select {
            font-size: small;
        }

        .person-name {
            font-weight: bold;
            color: #ffffff;
        }

        .faq .faq-list li {
            border-radius: 0px !important;
        }

        .faq .faq-list .list-item {
            margin-top: 0px !important;
        }
    </style>
@endsection

@section('arsitektur', 'active')
@section('2020', 'active')

@section('conten')
    <section id="blog" class="blog">
        <div class="container mt-5" data-aos="fade-up">
            <div class="row">
                <div class="col-lg-12 entries">
                    <section id="team" class="team">
                        <div class="container-fluid row" data-aos="fade-up">
                            <div class="col-lg-9 col-md-9 col-sm-12">
                                <div class="section-title">
                                    <h2>{{ $title }}</h2>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        Tracer study terhadap alumni merupakan salah satu studi empiris
                                        yang diharapkan menyediakan informasi (umpan balik) untuk
                                        mengevaluasi hasil pendidikan di Fakultas Sosial dan Sastra Universitas Kebangsaan
                                        Republik indonesia. Informasi
                                        yang didapat kemudian dapat digunakan sebagai bahan evaluasi dan
                                        pengembangan lebih lanjut dalam menjamin kualitas pendidikan
                                        tinggi. Melalui kegiatan tracer study ini diharapkan mendapatkan
                                        informasi indikasi kekurangan pelaksanaan proses pembelajaran
                                        dari sebuah program studi dan menyediakan dasar-dasar
                                        pelaksanaan perencanaan baik yang bersifat akademik maupun
                                        non-akademik dimasa depan. Kegiatan tracer study diberlakukan
                                        untuk alumni yang setelah 2 (dua) tahun kelulusan.
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3  col-md-3 col-sm-12">
                                <div class="card ">
                                    <div class="card-body">
                                        <h4>Pencarian Tracer Studi</h4>

                                        <div class="form-group">
                                            <label for="kategori" class="form-label m-0"><small>Tahun</small></label>
                                            <select class="form-select tahun" id="tahun" name="tahun">
                                                <!-- Option items for Tahun -->
                                                @foreach ($tahuns as $data)
                                                    <option value="{{ $data->tahun }}">{{ $data->tahun }}</option>
                                                @endforeach
                                                <!-- Add more options as needed -->
                                            </select>
                                        </div>
                                        {{-- {{dd($tahun_filter)}} --}}
                                        <div class="form-group mt-2">
                                            <label for="prodi" class="form-label m-0"><small>Prodi</small></label>
                                            <select class="form-select prodi" id="prodi" name="prodi">
                                                <!-- Option items for Tahun -->
                                                @foreach ($prodis as $data)
                                                    <option value="{{ $data->prodi }}">{{ $data->prodi }}</option>
                                                @endforeach
                                                <!-- Add more options as needed -->
                                            </select>
                                        </div>

                                        <a href="" class="btn btn-primary btn-sm mt-2 buttonajax">Cari Data</a>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('script')
    <script>
        $(document).on('click', '.buttonajax', function() {

            var selectedTahun = $('.tahun').val();
            var selectedProdi = $('.prodi').val();
            var newURL = "{{ route('tracer', ['prodi' => ':prodi', 'tahun' => ':tahun']) }}";
            newURL = newURL.replace(':tahun', selectedTahun);
            newURL = newURL.replace(':prodi', selectedProdi);
            $('.buttonajax').attr('href', newURL);
        });
    </script>
@endsection
