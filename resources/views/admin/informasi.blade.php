@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <!-- summernote -->
    <link rel="stylesheet" href="{{ asset('admin/plugins/summernote/summernote-bs4.min.css') }}">
    <style>
        .input-container {
            margin-bottom: 50px;
        }
    </style>
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            @include('layouts/flash')
            <div class="card">
                <div class="card-header">
                    <!-- Button trigger modal -->
                    <div class="col-md-8" style="margin-top: 10px; margin-bottom: 10px;">
                        <button type="button" class="btn btn-primary buttonadd" data-toggle="modal" data-target="#myModal"
                            data-prodi="" data-id="" data-url="{{ route('dosen.store') }}">
                            Tambah Data {{ $title }}
                        </button>
                    </div>
                    <!-- Modal -->
                    <div class="modal
                            fade" id="myModal" tabindex="-1"
                        aria-labelledby="myModal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="myModal">Input Data {{ $title }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="{{ route('informasi.store') }}" method="post" class="formkirim"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf

                                                    <div class="mb-3">
                                                        <label class="form-label">Header</label>
                                                        <input type="text"
                                                            class="form-control header @error('header') is-invalid @enderror"
                                                            name="header">
                                                        @error('header')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>


                                                    <div class="mb-3">
                                                        <label class="form-label">Judul</label>
                                                        <input type="text"
                                                            class="form-control judul @error('judul') is-invalid @enderror"
                                                            name="judul">
                                                        @error('judul')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="summernote" class="form-label">isi</label>
                                                        <textarea id="summernote" class="isi" name="isi"></textarea>
                                                        @error('isi')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Status</label>
                                                        <select
                                                            class="form-control status @error('status') is-invalid @enderror"
                                                            name="status">
                                                            <option value="beasiswa">
                                                                Beasiswa
                                                            </option>
                                                            <option value="karir">
                                                                Karir
                                                            </option>
                                                        </select>
                                                        @error('status')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button class="btn btn-primary" type="submit">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Header</th>
                                <th>Judul</th>
                                <th>Isi</th>
                                <th>Statu</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($informasi as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->header }}</td>
                                    <td>{{ $item->judul }}</td>
                                    <td>{!! $item->isi !!}</td>
                                    <td>
                                        {{ $item->status }}
                                    </td>
                                    <td>
                                        <form action="{{ route('informasi.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal" data-judul="{{ $item->judul }}"
                                                data-header="{{ $item->header }}" data-isi="{{ $item->isi }}"
                                                data-status="{{ $item->status }}"
                                                data-url="{{ route('informasi.update', $item->id) }}">
                                                Edit
                                            </a> |
                                            <button type="submit" class="btn btn-sm btn-outline-danger"
                                                onclick="return confirm('Apakah Anda Yakin?')">Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @php
                                    $no++;
                                @endphp
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>No</th>
                                <th>Header</th>
                                <th>Judul</th>
                                <th>Isi</th>
                                <th>Statu</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
    </div>
@endsection


@section('scripts')
    <script src="{{ asset('admin/plugins/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/bs-custom-file-input/bs-custom-file-input.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/jszip/jszip.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/pdfmake/pdfmake.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/pdfmake/vfs_fonts.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.html5.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.print.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/datatables-buttons/js/buttons.colVis.min.js') }}"></script>
    <!-- Summernote -->
    <script src="{{ asset('admin/plugins/summernote/summernote-bs4.min.js') }}"></script>
    <script>
        $('#summernote').summernote({
            placeholder: 'DESKRIPSI ISI',
            tabsize: 2,
            height: 120,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ]
        });

        $(document).ready(function() {
            $('#add-button').click(function() {
                var inputValue = $('#input-link').val();
                var inputValue2 = $('#input-judul').val();
                if (inputValue !== '' && inputValue2 !== '') {
                    var newInput = $('<input type="text" name="jurnal[]" class="form-control">').val(
                        inputValue).prop(
                        'readonly', true);
                    var newInput2 = $('<input type="text" name="judul[]" class="form-control">').val(
                        inputValue2).prop(
                        'readonly', true);
                    $('#output-container').append(newInput2);
                    $('#output-container').append(newInput);
                    $('#input-link').val('');
                    $('#input-judul').val('');
                }
            });
        });

        $(function() {
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            $('#example2').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
            });
        });

        $(document).on('click', '.buttonedit', function() {
            var data_status = $(this).attr('data-status');
            var data_isi = $(this).attr('data-isi');
            var data_url = $(this).attr('data-url');
            var data_judul = $(this).attr('data-judul');
            var data_header = $(this).attr('data-header');
            $('.isi').summernote('code', data_isi);
            $('.judul').attr('value', data_judul);
            $('.header').attr('value', data_header);
            $('.status').val(data_status);
            $('.formkirim').attr('action', data_url);
        });

        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
