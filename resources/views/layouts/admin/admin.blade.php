<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AdminLTE 3 | Dashboard</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('admin/plugins/fontawesome-free/css/all.min.css') }}">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Tempusdominus Bootstrap 4 -->
    <link rel="stylesheet"
        href="{{ asset('admin/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">

    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('admin/dist/css/adminlte.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/dist/css/style.css') }}">
    <!-- jQuery -->
    <script src="{{ asset('admin/plugins/jquery/jquery.min.js') }}"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="{{ asset('admin/plugins/jquery-ui/jquery-ui.min.js') }}"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->

    @yield('styles')
</head>

<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">

        <!-- Preloader -->
        <div class="preloader flex-column justify-content-center align-items-center">
            <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60"
                width="60">
        </div>

        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" class="nav-link"
                        onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">Logout</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Navbar Search -->


                <!-- Messages Dropdown Menu -->

                <!-- Notifications Dropdown Menu -->

                <li class="nav-item">
                    <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="index3.html" class="brand-link" style="text-align: center">
                <span class="brand-text font-weight-light">{{ Auth::user()->name }}</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">


                <!-- SidebarSearch Form -->
                <div class="form-inline">
                    <div class="input-group" data-widget="sidebar-search">
                        <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                            aria-label="Search">
                        <div class="input-group-append">
                            <button class="btn btn-sidebar">
                                <i class="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sidebar Menu -->
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        @if (Auth::user()->role == 'dosen')
                            <li class="nav-item">
                                <a href="{{ route('profile') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Profile
                                    </p>
                                </a>
                            </li>
                        @elseif (Auth::user()->role == 'admin' || Auth::user()->role == 'tu')
                            <li class="nav-item">
                                <a href="{{ route('milestone') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Renstra
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('kurikulum') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Kurikulum
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('aspek') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Aspek
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('akun') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Akun
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('fasilitas') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Fasilitas
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('informasi') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Informasi
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('berita') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Berita
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('conten') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Conten
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('carousel') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Slider
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('prodi_slider') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Slider Jurusan
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('dosen') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Dosen
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admin.monev.mengisi') }}" class="nav-link">
                                    <i class="nav-icon fas fa-th"></i>
                                    <p>
                                        Monev
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fas fa-copy"></i>
                                    <p>
                                        Master Data
                                        <i class="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="{{ route('prodi') }}" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Prodi</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('tahun') }}" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Tahun</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('kat.tracer') }}" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Tracer</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('monev.master') }}" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Master Monev</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="{{ route('admin.monev') }}" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Template Monev</p>
                                        </a>
                                    </li>
                                    @if (Auth::user()->role == 'admin')
                                        <li class="nav-item">
                                            <a href="{{ route('file') }}" class="nav-link">
                                                <i class="far fa-circle nav-icon"></i>
                                                <p>File</p>
                                            </a>
                                        </li>
                                    @endif
                                </ul>
                            </li>
                        @endif
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            @if ($title == 'Profile')
            @else
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Halaman {{ $title }}</h1>
                            </div><!-- /.col -->

                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
            @endif
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                @yield('content')
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
        <footer class="main-footer">
            <strong>Copyright &copy; <a href="https://adminlte.io">UPT UKRI</a>.</strong>
            All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0
            </div>
        </footer>

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->


    <script>
        $.widget.bridge('uibutton', $.ui.button)
    </script>
    <!-- Bootstrap 4 -->
    <script src="{{ asset('admin/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

    @yield('scripts')

    <!-- AdminLTE App -->
    <script src="{{ asset('admin/dist/js/adminlte.js') }}"></script>

</body>

</html>
