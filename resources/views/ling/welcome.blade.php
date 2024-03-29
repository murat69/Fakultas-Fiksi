@extends('layouts.ling')

@section('style')
    <style>
        .imgakre {
            height: auto;
            width: 700px;
            margin-top: 30px;
        }
    </style>
@endsection

@section('conten')
    <section id="why-us" class="why-us section-bg">
        <div class="container-fluid" data-aos="fade-up">
            <div class="row">
                <div class="col-lg-7 align-items-stretch order-1 order-lg-2">
                    <div class="content text-center">
                        <h3><strong>Ketua Program Studi</strong></h3>
                    </div>

                    <div class="accordion-list text-center">
                        <h2>{{ $kap_ling->nama }}</h2>
                        <p>{!! $sambutan->isi !!}
                        </p>
                    </div>
                </div>

                <div class="img text-center col-lg-5 d-flex flex-column  order-2 order-lg-1"
                    style="background-image: url('{{ asset('storage/upload/file/' . $kap_ling->file->file) }}');"
                    data-aos="zoom-in" data-aos-delay="150">
                    &nbsp;
                </div>
            </div>
        </div>
    </section>

    <!-- ======= About Us Section ======= -->

    <section id="team" class="team">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Akreditasi</h2>
            </div>
            <div class="row">
                <div class="col-lg-12" style="font-size: 1.5em;">
                    {!! $akreditasi->isi !!}
                </div>
                <div class="col-lg-12 fade-kanan d-flex justify-content-center">
                    <img src="{{ asset('storage/upload/file/' . $akreditasi->file->file) }}" alt="" class="imgakre">
                </div>
            </div>
        </div>
    </section>

    <!-- End About Us Section -->

    <!-- ======= Why Us Section ======= -->
    <section id="why-us" class="why-us section-bg">
        <div class="container-fluid" data-aos="fade-up">
            <div class="row">
                <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1">
                    <div class="content text-center">
                        <h3><strong>VISI</strong></h3>
                    </div>

                    <div class="accordion-list">
                        <ul>
                            <li>
                                <p>
                                    {!! $visi->isi !!}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-5 align-items-stretch order-1 order-lg-2 img"
                    style="
                background-image: url('{{ asset('storage/upload/file/' . $visi->file->file) }}');
              "
                    data-aos="zoom-in" data-aos-delay="150">
                    &nbsp;
                </div>
            </div>

            <div class="row">
                <div class="col-lg-7 align-items-stretch order-1 order-lg-2">
                    <div class="content text-center">
                        <h3><strong>MISI</strong></h3>
                    </div>

                    <div class="accordion-list">
                        {!! $misi->isi !!}
                    </div>
                </div>

                <div class="img col-lg-5 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1"
                    style="background-image: url('{{ asset('storage/upload/file/' . $misi->file->file) }}');"
                    data-aos="zoom-in" data-aos-delay="150">
                    &nbsp;
                </div>
            </div>
        </div>
    </section>
    <!-- End Why Us Section -->

    <!-- ======= Cta Section ======= -->
    <section id="cta" class="cta"
        style="    background: linear-gradient(to right,
            rgba(128, 0, 0, 0.3),
            rgba(128, 0, 0, 0.3)),
        url({{ asset('storage/upload/file/Screenshot_13.png') }}) fixed center center;">
        <div class="container" data-aos="zoom-in">
            <div class="row">
                <div class="col-lg-9 text-center text-lg-start">
                    <h3>Capaian</h3>
                    <p>
                        {!! $capaian->isi !!}
                    </p>
                </div>

            </div>
        </div>
    </section>
    <!-- End Cta Section -->

    <!-- ======= Skills Section ======= -->
    <!-- ======= Skills Section ======= -->
    <section id="skills" class="skills">
        <div class="container" data-aos="fade-up">
            <div class="row">
                <div class="col-lg-12 pt-4 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
                    <div class="section-title">
                        <h2>Aspek Pembelajaran</h2>
                    </div>
                    <h3 class="fst-italic">
                        Aspek Pembelajaran yang dipelajari di Program Studi Arsitektur
                    </h3>

                    <div class="skills-content">
                        @foreach ($aspek as $asspek)
                            <div class="progress">
                                <span class="skill">{{ $asspek->aspek }} <i
                                        class="val">{{ $asspek->persenan . '%' }}</i></span>
                                <div class="progress-bar-wrap">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="{{ $asspek->persenan }}"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Skills Section -->
    <!-- End Skills Section -->

    <!-- ======= Pricing Section ======= -->
    <section id="pricing" class="pricing" style="background-color: #f3f5fa;">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Kurikulum</h2>
                <p>
                    Magnam dolores commodi suscipit. Necessitatibus eius consequatur
                    ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
                    quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
                    Quia fugiat sit in iste officiis commodi quidem hic quas.
                </p>
            </div>

            <div class="row">
                <div class="owl-carousel">
                    @foreach ($kurikulum as $kuri)
                        <div class="item" data-aos="fade-up" data-aos-delay="100">
                            <div class="box">
                                <h3>Semester {{ $kuri->semester }}</h3>
                                <ul>
                                    @foreach (json_decode($kuri->matkul) as $matkul)
                                        <li>
                                            <i class="bx bx-check"></i> {{ $matkul }}
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

        </div>
    </section>
    <!-- End Pricing Section -->



    <!-- ======= Team Section ======= -->
    <section id="team" class="team">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Dosen</h2>
            </div>

            <div class="row">
                @foreach ($dosen as $item)
                    <style>
                        .card{{ $item->id }} {
                            background: url('{{ asset('storage/upload/file/' . $item->file->file) }}') center center no-repeat;
                            background-size: 300px;
                        }

                        .card{{ $item->id }}:hover {
                            background: linear-gradient(42deg, rgba(0, 0, 0, 0.400) 50%, rgba(3, 3, 3, 0.400) 100%), url("{{ asset('storage/upload/file/' . $item->file->file) }}") center center no-repeat;
                            background-size: 300px;
                        }

                        .card{{ $item->id }}:hover h2,
                        .card{{ $item->id }}:hover p {
                            opacity: 1;

                        }

                        .card{{ $item->id }}:hover .fa {
                            opacity: 1;
                        }
                    </style>

                    <div class="col-lg-4 d-flex justify-content-center">
                        <div class="card card{{ $item->id }}">
                            <div class="border-card">
                                <h2>{{ $item->nama }}</h2>
                                <p>Dekan Fakultas Teknik Sipil Dan Perencanaan</p>
                                <div class="icons">
                                    <a href="{{ $item->schoolar }}">
                                        <i class="fa fa-graduation-cap" aria-hidden="true"><span>Schoolar</span></i></a>
                                    <a href="{{ $item->pddikti }}">
                                        <i class="fa fa-globe" aria-hidden="true"><span>PDDIKTI</span></i></a>
                                    <a href="{{ $item->linkedin }}">
                                        <i class="fa fa-linkedin" aria-hidden="true"><span>Lingkedin</span></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
    <!-- End Team Section -->
@endsection

@section('script')
@endsection
