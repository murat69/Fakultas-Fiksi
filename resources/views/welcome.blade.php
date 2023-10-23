@extends('layouts.user')

@section('style')
    <style>
        @if (isset($dekan->file->file))
            .card0 {
                background: url('{{ asset('storage/upload/file/' . $dekan->file->file) }}') center center no-repeat;
                background-size: 300px;
            }
        @else
            .card0 {
                background: url('{{ asset('assets/img/istockphoto-1327592506-612x612.jpg') }}') center center no-repeat;
                background-size: 300px;
            }
        @endif

        @if (isset($dekan->file->file))
            .card0:hover {
                background: linear-gradient(42deg, rgba(0, 0, 0, 0.400) 50%, rgba(3, 3, 3, 0.400) 100%), url("{{ asset('storage/upload/file/' . $dekan->file->file) }}") center center no-repeat;
                background-size: 300px;
            }
        @else
            .card0:hover {
                background: linear-gradient(42deg, rgba(0, 0, 0, 0.400) 50%, rgba(3, 3, 3, 0.400) 100%), url("{{ asset('assets/img/istockphoto-1327592506-612x612.jpg') }}") center center no-repeat;
                background-size: 300px;
            }
        @endif
        .card0:hover h2,
        .card0:hover p {
            opacity: 1;

        }

        .card0:hover .fa {
            opacity: 1;
        }
    </style>
@endsection

@section('conten')
    <!-- ======= Clients Section ======= -->
    <section id="why-us" class="why-us section-bg">
        <div class="container-fluid" data-aos="fade-up">
            <div class="row">
                <div class="col-lg-7 align-items-stretch order-1 order-lg-2">
                    <div class="content text-center">
                        <h3><strong>Dekan</strong></h3>
                    </div>

                    <div class="accordion-list text-center">
                        <h2>{{ @$dekan->nama }}</h2>
                        <p>{!! $sambutan->isi !!}
                        </p>
                    </div>
                </div>

                <div class="img text-center col-lg-5 d-flex flex-column  order-2 order-lg-1"
                    style="background-image: url('{{ asset('storage/upload/file/' . @$sambutan->file->file) }}');"
                    data-aos="zoom-in" data-aos-delay="150">
                    &nbsp;
                </div>
            </div>
        </div>
    </section>
    <!-- End Cliens Section -->

    <!-- ======= About Us Section ======= -->
    <section id="about" class="about">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Program Studi</h2>
            </div>

            <div class="row content">
                <div id="cardarsi" class="col-lg-6 d-flex justify-content-end" style="margin-top: 10px">
                    <div class="card-sasing">

                        <div class="contentBx">
                            <h2 style="font-size: 1.9em;">Teknik Informatika</h2>


                            <a href="{{ route('program-studi', 'Teknik Informatika') }}" style="margin-top: 10px">Read
                                More</a>
                        </div>
                    </div>
                </div>
                <div id="cardteling" class="col-lg-6 d-flex d-flex justify-content-start" style="margin-top: 10px">
                    <div class="card-ilkom">
                        <div class="contentBx">
                            <h2>Sistem Informasi</h2>


                            <a href="{{ route('program-studi', 'Sastra Inggris') }}" style="margin-top: 10px">Read More</a>
                        </div>
                    </div>
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
                        <h3><strong>{{ $visi->judul }}</strong></h3>
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
                        <h3><strong>{{ $misi->judul }}</strong></h3>
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

    <!-- ======= Skills Section ======= -->

    <!-- End Skills Section -->

    <!-- ======= Team Section ======= -->
    <section id="team" class="team">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Struktur</h2>
            </div>

            <div class="row">
                <div class="col-lg-4 d-flex justify-content-center">
                    <div class="card card0">
                        <div class="border-card">
                            <h2>{{ @$dekan->nama }}</h2>
                            <p>Dekan Fakultas Ilmu Komputer dan Sistem Informasi</p>
                            <div class="icons">
                                <a href="{{ @$dekan->schoolar }}">
                                    <i class="fa fa-graduation-cap" aria-hidden="true"><span>Schoolar</span></i></a>
                                <a href="{{ @$dekan->pddikti }}">
                                    <i class="fa fa-globe" aria-hidden="true"><span>PDDIKTI</span></i></a>
                                <a href="{{ @$dekan->linkedin }}">
                                    <i class="fa fa-linkedin" aria-hidden="true"><span>Lingkedin</span></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                @foreach ($kaprodi as $item)
                    <style>
                        @if (isset($item->file->file))
                            .card{{ $item->id }} {
                                background: url('{{ asset('storage/upload/file/' . @$item->file->file) }}') center center no-repeat;
                                background-size: 300px;
                            }
                        @else
                            .card{{ $item->id }} {
                                background: url('{{ asset('assets/img/istockphoto-1327592506-612x612.jpg') }}') center center no-repeat;
                                background-size: 300px;
                            }
                        @endif

                        @if (isset($item->file->file))
                            .card{{ $item->id }}:hover {
                                background: linear-gradient(42deg, rgba(0, 0, 0, 0.400) 50%, rgba(3, 3, 3, 0.400) 100%), url("{{ asset('storage/upload/file/' . $item->file->file) }}") center center no-repeat;
                                background-size: 300px;
                            }
                        @else
                            .card{{ $item->id }}:hover {
                                background: linear-gradient(42deg, rgba(0, 0, 0, 0.400) 50%, rgba(3, 3, 3, 0.400) 100%), url("{{ asset('assets/img/istockphoto-1327592506-612x612.jpg') }}") center center no-repeat;
                                background-size: 300px;
                            }
                        @endif

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
                                <p>{{ $item->status }} {{ $item->prodi->prodi }}</p>
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
