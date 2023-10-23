<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />

    <title>FTSP UKRI</title>
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
                        <ul @if ($hero !== 'ada') style="background: #eeb020cf;" @endif>
                            <li><a href="{{ route('Arsitektur') }}">Arsitektur</a></li>
                            <li><a href="{{ route('lingkungan') }}">Teknik Lingkungan</a></li>
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
                        <ul @if ($hero !== 'ada') style="background: #eeb020cf;" @endif>
                            <li><a href="{{route('monev.dosen')}}">Kepuasan Dosen</a></li>
                            <li><a href="{{route('monev.mahasiswa')}}">Kepuasan Mahasiswa</a></li>
                            <li><a href="{{route('monev.tendik')}}">Kepuasan Tenaga Pendidik</a></li>
                            <li><a href="{{route('monev.mitra')}}">Kepuasan Mitra Kerjasama</a></li>
                        </ul>
                    </li>

                    <li class="dropdown">
                        <a href="#"><span>Informasi</span> <i class="bi bi-chevron-down"></i></a>
                        <ul @if ($hero !== 'ada') style="background: #eeb020cf;" @endif>
                            <li><a href="{{ route('beasiswa') }}">Beasiswa & Karir</a></li>
                            <li><a href="{{route('tracer')}}">Tracer Studi</a></li>
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
        <section id="hero" class="hero-ars d-flex align-items-center">
            <div class="overlay">
                <div class="" style="margin: 0 auto">
                    <div class="col-lg-12 text-center" data-aos="fade-up" data-aos-delay="200">
                        <h1>TEKNIK LINGKUNGAN</h1>
                        <h2>Universitas Kebangsaan Republik Indonesia</h2>
                    </div>

                </div>
            </div>
            <!-- Ubah link dalam "src" sesuai video yang diinginkan -->

            <video style="min-width: 100%;
  min-height: 100vh;
  z-index: 1;" src="{{ asset('assets/vid/TL.mp4') }}"
                loop muted autoplay></video>
        </section>
        <!-- End Hero -->
    @elseif($hero == 'panjang')
        <section id="hero" class="d-flex align-items-center" style="height: 100vh !important">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                        data-aos="fade-up" data-aos-delay="200">
                        <h1>Under Contruction</h1>
                    </div>
                    <div class="col-lg-6 order-1 order-lg-2 hero-img">
                        <div class="owl-carousel">
                            <div class="item" style="margin-left: 50px">
                                <img src="assets/img/60028-removebg-preview.png" class="img-fluid" alt=""
                                    style="width: 500px !important" />
                            </div>
                        </div>
                    </div>
                </div>
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
                            FAKULTAS TEKNIK SIPIL DAN PERENCANAAN <br />Universitas
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
                        <a href="https://e-jurnal.ukri.ac.id/index.php/arcade" target="_blank"><img
                                src="{{ asset('assets/img/arcade.png') }}" alt=""
                                style="width: auto; height:60px;margin-top: 30px;"></a>
                        <a href="https://e-jurnal.ukri.ac.id/index.php/envirosan" target="_blank"><img
                                src="{{ asset('assets/img/envirosan.png') }}" alt=""
                                style="width: auto; height:60px; margin-top: 30px;"></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container footer-bottom clearfix">
            <div class="copyright">
                &copy; Copyright <strong><span>FTSP</span></strong>. All Rights Reserved
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

    <div id="preloader"></div>
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
            $(".owl-carousel").owlCarousel({

                center: true,
                autoplay: true,
                autoplayTimeout: 5000,
                animateOut: "zoomOut",
                animateIn: "zoomIn",
                stagePadding: 0,
                smartSpeed: 450,
                loop: true,
                nav: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 1,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: true,
                        loop: true
                    }
                }
            });

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
