@extends('layouts.user')

@section('style')
    <style>
        .news-card {
            background: url('{{ asset('storage/upload/file/berita/thumbnail/' . $berita->thumbnail) }}') center center no-repeat;
            background-size: 100%;
        }
    </style>
@endsection

@section('conten')
    <!-- ======= Blog Section ======= -->

    <!-- End Team Section -->
    <section id="blog" class="blog">
        <div class="container" data-aos="fade-up" style="margin-top: 100px">
            <div class="row">
                <div class="col-lg-8 entries">
                    <section id="team" class="team">
                        @php
                            $tekling = 0;
                            $ars = 0;
                        @endphp
                        <div class="container" data-aos="fade-up">
                            <div class="section-title">
                                <h2>{{ $berita->judul }}</h2>
                            </div>

                            <div class="row">
                                <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="news-card">
                                        <div class="border-card" style="border: none !important;">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12" style="margin-top: 50px">
                                    {!! $berita->header !!}
                                </div>
                                <div class="col-lg-12" style="margin-top: 50px">
                                    {!! $berita->isi !!}
                                </div>
                                <section class="gallery">
                                    <div class="container">
                                        <div class="section-title flex-column justify-content-center">
                                            <h2>Gallery</h2>
                                        </div>
                                        <div class="row gallery-container" data-aos="fade-up" data-aos-easing="ease-in-out"
                                            data-aos-duration="500">

                                            @foreach ($berita->file_berita as $image)
                                                <div class="col-lg-4 col-md-6 gallery-wrap filter-app">
                                                    <div class="gallery-item">
                                                        <img src="{{ asset('storage/upload/file/berita/gallery' . '/' . $image->file) }}"
                                                            class="img-fluid" alt=""
                                                            style="height: 200px !important;" />
                                                        <div class="gallery-info">
                                                            <h3></h3>
                                                            <div>
                                                                <a href="{{ asset('storage/upload/file/berita/gallery' . '/' . $image->file) }}"
                                                                    data-gallery="portfolioGallery" class="gallery-lightbox"
                                                                    title="App 2">
                                                                    <i class="bx bx-plus"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- End blog entries list -->

                <div class="col-lg-4">
                    <div class="sidebar">
                        <h3 class="sidebar-title">Search</h3>
                        <div class="sidebar-item search-form">
                            <form action="{{ route('news.cari') }}" method="POST">
                                @csrf
                                <input type="text" name="cari" />
                                <button type="submit"><i class="bi bi-search"></i></button>
                            </form>
                        </div>
                        <!-- End sidebar search formn-->

                        <h3 class="sidebar-title">Program Studi</h3>
                        <div class="sidebar-item categories">
                            <ul>
                                @foreach ($prodi as $prog)
                                    <form action="{{ route('news.cari') }}" method="POST">
                                        <li>
                                            @csrf
                                            @if ($prog->prodi == 'Teknik Lingkungan')
                                                <input type="hidden" name="cari" value="Teknik Lingkungan">
                                            @elseif($prog->prodi == 'Arsitektur')
                                                <input type="hidden" name="cari" value="Arsitektur">
                                            @endif
                                            <button type="submit">{{ $prog->prodi }}
                                                <span>
                                                    (@if ($prog->prodi == 'Teknik Lingkungan')
                                                        {{ $tekling }}
                                                    @elseif($prog->prodi == 'Arsitektur')
                                                        {{ $ars }}
                                                    @endif)
                                                </span></button>

                                        </li>
                                    </form>
                                @endforeach
                            </ul>
                        </div>
                        <!-- End sidebar categories-->

                        <h3 class="sidebar-title">Recent Posts</h3>
                        <div class="sidebar-item recent-posts">

                            @foreach ($terbaru as $baru)
                                @php
                                    $slug = enc($baru->id) . '-' . $baru->slug;
                                @endphp
                                <div class="post-item clearfix">
                                    <img src="{{ asset('storage/upload/file/berita/thumbnail/' . $baru->thumbnail) }}"
                                        alt="" />
                                    <h4>

                                        @csrf
                                        <input type="hidden" name="cari" value="{{ $baru->judul }}">
                                        <a href="{{ route('news.full', $slug) }}">{{ $baru->judul }}</a>

                                    </h4>
                                    <time
                                        datetime="2020-01-01">{{ $baru->created_at->formatLocalized('%A %e %B, %Y') }}</time>
                                </div>
                            @endforeach

                        </div>
                        <!-- End sidebar recent posts-->
                        <!-- End sidebar tags-->
                    </div>
                    <!-- End sidebar -->
                </div>
                <!-- End blog sidebar -->
            </div>
        </div>
    </section>
    <!-- End Blog Section -->
@endsection

@section('script')
@endsection
