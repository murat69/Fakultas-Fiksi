@extends('layouts.user')

@section('conten')
    <section class="fasilitas section-bg" data-aos="fade-up" date-aos-delay="200" style="margin-top: 100px">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <img src="assets/img/crop.jpg" class="img-fluid" alt="" />
                </div>

                <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
                    <div class="icon-box">
                        <div class="icon"><i class="bx bx-laptop"></i></div>
                        <h4 class="title"><a href="">{{ $lab->judul }}</a></h4>
                        <p class="description">
                            {!! $lab->isi !!}
                        </p>
                    </div>

                    <div class="icon-box">
                        <div class="icon"><i class="bx bx-buildings"></i></div>
                        <h4 class="title"><a href="">{{ $kelas->judul }}</a></h4>
                        <p class="description">
                            {!! $kelas->isi !!}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Why Us Section -->

    <!-- ======= Portfolio Section ======= -->
    <section class="gallery">
        <div class="container">
            <div class="section-title flex-column justify-content-center">
                <h2>Gallery Fasilitas</h2>
            </div>
            <div class="row gallery-container" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                @foreach ($fasilitas as $item)
                    <div class="col-lg-4 col-md-6 gallery-wrap filter-app">
                        <div class="gallery-item">
                            <img src="{{ asset('storage/upload/file/' . $item->file->file) }}" class="img-fluid"
                                alt="" />
                            <div class="gallery-info">
                                <h3>{{ $item->status }}</h3>
                                <div>
                                    <a href="{{ asset('storage/upload/file/' . $item->file->file) }}"
                                        data-gallery="portfolioGallery" class="gallery-lightbox" title="App 1">
                                        <i class="bx bx-plus"></i>
                                    </a>
                                    <a href="gallery-details.html" title="Gallery Details">
                                        <i class="bx bx-link"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
