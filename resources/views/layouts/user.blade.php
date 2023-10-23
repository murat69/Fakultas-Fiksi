<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />

    <title>FIKSI UKRI</title>
    <meta content="" name="description" />
    <meta content="" name="keywords" />

    <!-- Favicons -->
    <link href="{{ asset('assets/img/ukri-logo.png') }}" rel="icon" />
    <link href="{{ asset('assets/img/ukri-logo.png') }}" rel="apple-touch-icon" />

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet" />

    <!-- Vendor CSS Files -->
    <link href="{{ asset('assets/vendor/aos/aos.css') }}" rel="stylesheet" />
    <link href="{{ asset('assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet" />
    <link href="{{ asset('assets/vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('assets/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('assets/vendor/remixicon/remixicon.css') }}" rel="stylesheet" />
    <link href="{{ asset('assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet" />

    <link rel="stylesheet" href="{{ asset('assets/owlcarousel/assets/owl.carousel.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/owlcarousel/assets/owl.theme.default.min.css') }}" />

    <!-- Template Main CSS File -->
    <link href="{{ asset('assets/css/style.css') }}?v={{ time() }}" rel="stylesheet" />

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

    <!-- =======================================================
  * Template Name: Arsha - v4.9.1
  * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->

    <!-- javascript -->
    <script src="{{ asset('assets/vendors/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/owlcarousel/owl.carousel.js') }}"></script>

    <style>
        #header.header-scrolled,
        #header.header-inner-pages,
        .bg-red,
        .back-to-top,
        #footer {
            background: #47117b;
        }

        #header.header-scrolled .navbar a {
            color: white !important;
        }

        #header.header-scrolled .navbar .active,
        #header.header-scrolled .navbar li:hover>a {
            color: yellow !important;
        }

        .navbar .dropdown ul {
            background: #282727c2;
        }

        .header-scrolled .dropdown ul,
        .bg-red .dropdown ul {
            background: #47117b;
        }

        .daftar-arsi:hover {
            background: #003619;
        }

        .why-us .content h3,
        .section-title h2,
        #footer .footer-top .footer-contact h3 {
            color: #47117b;
        }

        .navbar a {
            font-weight: bold;
        }

        .owl-carousel .owl-item>div {
            display: flex;
            align-items: center;
        }

        .owl-carousel .layer {
            content: "";
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: #58505054;
            top: 0;
            left: 0;
        }

        .owl-carousel .text-slider {
            position: absolute;
            /* top: 45%; */
            z-index: 2;
            color: white;
            margin-left: 5em;
        }

        .owl-carousel .text-slider h3 {
            font-size: 3.5rem;
            line-height: 1.2em;
        }

        .owl-carousel .text-slider p {
            font-size: 1rem;
            line-height: 1.8em;
            margin-bottom: 1em;
        }

        .owl-carousel video {
            height: 100vh;
            width: 100%;
            object-fit: fill; // use "cover" to avoid distortion
            /* position: absolute; */
        }

        .owl-dots {
            display: none;
        }
    </style>
    @yield('style')
</head>

<body>
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top  @if ($hero !== 'ada') bg-red @endif">
        <div class="d-flex align-items-center">
            <nav id="navbar" class="navbar">
                <ul>
                    <li>
                        <a class="nav-link scrollto @if ($title == 'HOME') active @endif"
                            href="{{ route('home') }}">Home</a>
                    </li>
                    <li>
                        <a class="nav-link scrollto @if ($title == 'Milestone') active @endif"
                            href="{{ route('milestones') }}">Renstra</a>
                    </li>
                    <li>
                        <a class="nav-link scrollto @if ($title == 'Riset & Publikasi Ilmiah') active @endif"
                            href="{{ route('riset') }}">Riset & Publikasi Ilmiah</a>
                    </li>
                    <li class="dropdown">
                        <a href="#"><span>Prodi</span> <i class="bi bi-chevron-down"></i></a>
                        <ul @if ($hero !== 'ada')  @endif>
                            @foreach ($view_var['prodi'] as $key => $prodi)
                                <li><a
                                        href="{{ route('program-studi', str_replace(' ', '-', $prodi->prodi)) }}">{{ $prodi->prodi }}</a>
                                </li>
                            @endforeach
                        </ul>
                    </li>
                    <li>
                        <a href="" class="nav-link scrollto logo"><img
                                src="{{ asset('assets/img/ukri-logo.png') }}" alt="" />
                        </a>
                    </li>
                    <li><a class="nav-link scrollto @if ($title == 'Berita') active @endif"
                            href="{{ route('news') }}">Berita</a></li>
                    <li>
                        <a class="nav-link scrollto @if ($title == 'Fasilitas') active @endif"
                            href="{{ route('fasilitas-ukri') }}">Fasilitas</a>
                    </li>

                    <li class="dropdown">
                        <a href="#"><span>Monev</span> <i class="bi bi-chevron-down"></i></a>
                        <ul @if ($hero !== 'ada')  @endif>
                            @foreach ($view_var['monev'] as $key => $monev)
                                <li><a
                                        href="{{ route('monev.all', ['aspek' => $monev->nama]) }}">{{ $monev->nama }}</a>
                                </li>
                            @endforeach
                        </ul>
                    </li>

                    <li class="dropdown">
                        <a href="#"><span>Informasi</span> <i class="bi bi-chevron-down"></i></a>
                        <ul @if ($hero !== 'ada')  @endif>
                            <li><a href="{{ route('beasiswa') }}">Beasiswa & Karir</a></li>
                            <li><a href="{{ route('tracer') }}">Tracer Studi</a></li>
                            <li><a href="{{ route('alumni') }}">Alumni</a></li>
                        </ul>
                    </li>
                    <li>
                        <a class="daftar-arsi scrollto @if ($title == 'Fasilitas') active @endif"
                            href="https://pmb.ukri.ac.id/">Hubungi Kami</a>
                    </li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle "></i>
            </nav>
        </div>
    </header>
    <!-- End Header -->

    @if ($hero == 'ada')
        <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center" style="background: none;padding:0;overflow:hidden">
            <div class="owl-carousel col-md-12">
                @foreach ($view_var['slider'] as $key => $slider)
                    <div>
                        @if ($slider->kategori == 'gambar')
                            <img src="{{ asset('files/' . $slider->file) }}" class="img-fluid w-100 "
                                key="{{ $key }}" style="max-height: 100vh" />
                            <div class="layer"></div>
                            <div class="col-md-5 text-slider">
                                <h1>{{ Str::title($slider->judul) }}</h1>
                                <p>{{ Str::ucfirst($slider->deskription) }}</p>
                            </div>
                        @else
                            <video style="max-height: 100vh" muted>
                                <source src="{{ asset('files/' . $slider->file) }}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="layer"></div>
                            <div class="col-md-5 text-slider">
                                <h1>{{ Str::title($slider->judul) }}</h1>
                                <p>{{ Str::ucfirst($slider->deskription) }}</p>
                            </div>
                        @endif
                    </div>
                @endforeach
            </div>
        </section>
        <!-- End Hero -->
    @elseif($hero == 'prodi')
        <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center" style="background: none;padding:0;overflow:hidden">
            <div class="owl-carousel col-md-12">
                @php
                    $view_var['slider'] = $slider;
                @endphp
                @foreach ($view_var['slider'] as $key => $slider)
                    <div>
                        @if ($slider->kategori == 'gambar')
                            <img src="{{ asset('files/' . $slider->file) }}" class="img-fluid w-100 "
                                key="{{ $key }}" style="max-height: 100vh" />
                            <div class="layer"></div>
                            <div class="col-md-5 text-slider">
                                <h1>{{ Str::title($slider->judul) }}</h1>
                                <p>{{ Str::ucfirst($slider->deskription) }}</p>
                            </div>
                        @else
                            <video style="max-height: 100vh" muted>
                                <source src="{{ asset('files/' . $slider->file) }}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="layer"></div>
                            <div class="col-md-5 text-slider">
                                <h1>{{ Str::title($slider->judul) }}</h1>
                                <p>{{ Str::ucfirst($slider->deskription) }}</p>
                            </div>
                        @endif
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    <main id="main">
        @yield('conten')
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    <footer id="footer">
        <div class="footer-top section-bg">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 footer-contact">
                        <h3>
                            FAKULTAS ILMU KOMPUTER DAN SISTEM INFORMASI<br />Universitas
                            Kebangsaan Republik Indonesia
                        </h3>
                        <p>
                            Jl. Terusan Halimun No.37, Lkr. Sel. Kec. Lengkong Kota
                            Bandung<br />
                            Jawa Barat 40263<br /><br />
                            <strong>Phone:</strong> (022) 7301987<br />
                            <strong>Email:</strong> info@ukri.ac.id<br />
                        </p>
                    </div>
                    <div class="col-lg-6 footer-contact">
                        <h3>
                            JOURNAL
                            <hr style=" border-top: 3px solid; color :black !important;">
                        </h3>
                        <a href="https://e-jurnal.ukri.ac.id/index.php/jesii" target="_blank"><img
                                src="{{ asset('assets/img/logo/jesiii-removebg-preview.png') }}" alt=""
                                style="width: auto; height: 49px; margin-top: 30px; margin-right: 38px;"></a>
                        <a href="https://e-jurnal.ukri.ac.id/index.php/JuSTISe" target="_blank"><img
                                src="{{ asset('assets/img/logo/justice-removebg-preview.png') }}"
                                alt="" style="width: auto; height:60px; margin-top: 30px;"></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container footer-bottom clearfix">
            <div class="copyright">
                &copy; Copyright <strong><span>FIKSI </span></strong>
                {{ date('Y') > '2023' ? '2023 - ' . date('Y') : date('Y') }}. All Rights Reserved
            </div>
            <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/ -->
                Designed by UPT UKRI
            </div>
        </div>
    </footer>
    <!-- End Footer -->

    <div id="preloader" style="background:#47117b"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>

    <!-- Vendor JS Files -->
    <script src="{{ asset('assets/vendor/aos/aos.js') }}"></script>
    <script src="{{ asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/glightbox/js/glightbox.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/isotope-layout/isotope.pkgd.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/swiper/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/waypoints/noframework.waypoints.js') }}"></script>
    <script src="{{ asset('assets/vendor/php-email-form/validate.js') }}"></script>

    <!-- Template Main JS File -->
    <script src="{{ asset('assets/js/main.js') }}"></script>

    <link rel="stylesheet" href="{{ asset('assets/css/animate.css') }}" />
    <script>
        jQuery(document).ready(function($) {
            // $(".owl-carousel").owlCarousel({
            //     items: 1,
            //     autoplay: true,
            //     autoplayTimeout: 5000,
            //     animateOut: "zoomOut",
            //     animateIn: "zoomIn",
            //     stagePadding: 30,
            //     smartSpeed: 450,
            //     loop: true,
            //     nav: true,
            // });


            var owl = $('.owl-carousel');
            var autoplay = 5000;
            owl.owlCarousel({
                items: 1,
                loop: true,
                // margin:10,
                autoplay: true,
                mouseDrag: false,
                autoplayTimeout: autoplay,
                // autoplayHoverPause:true
            });

            owl.on('translated.owl.carousel', function(event) {
                var current_target = event.target;
                var active_slide = $(current_target).find('.owl-item.active div').children();
                var typeContent = active_slide[0].tagName.toLowerCase();
                // console.log(active_slide);
                if (typeContent == 'video') {
                    // this.trigger('stop.owl.autoplay');
                    owl.trigger('stop.owl.autoplay')
                    $(active_slide)[0].play();
                    $(active_slide)[0].onended = function() {
                        owl.trigger('next.owl.carousel');
                        owl.trigger('play.owl.autoplay', [autoplay])
                    }
                }
            })

            $('.play').on('click', function() {
                owl.trigger('play.owl.autoplay', [autoplay])
            })
            $('.stop').on('click', function() {
                owl.trigger('stop.owl.autoplay')
            })



            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                $("#cardarsi").removeClass("justify-content-end");
                $("#cardarsi").addClass("justify-content-center");
                $("#cardteling").removeClass("justify-content-start");
                $("#cardteling").addClass("justify-content-center");
            } else {
                $("#cardarsi").removeClass("justify-content-center");
                $("#cardarsi").addClass("justify-content-end");
                $("#cardteling").removeClass("justify-content-center");
                $("#cardteling").addClass("justify-content-start");
            }
        });
    </script>

    @yield('script')
</body>

</html>
