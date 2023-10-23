@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            @include('layouts/flash')
            <div class="card">
                <div class="card-header">
                    <!-- Button trigger modal -->
                    <div class="col-md-8" style="margin-top: 10px; margin-bottom: 10px;">
                        <button type="button" class="btn btn-primary buttoneditfile" data-toggle="modal"
                            data-target="#file" data-mime-file="" data-file="" data-id-file="" data-nama=""
                            data-url="{{ route('file.store') }}">
                            Tambah Data {{ $title }}
                        </button>
                    </div>
                    <!-- Modal -->
                    <div class="modal
                            fade" id="file" tabindex="-1"
                        aria-labelledby="myModal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="myModal">Input Data {{ $title }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="{{ route('file.store') }}" method="post" class="formkirimfile"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf
                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">Nama File</label>
                                                        <input type="text" name="nama" class="nama form-control"
                                                            id="exampleInputEmail1" />
                                                        @error('nama')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="mb-3">
                                                            <label class="form-label">File</label>
                                                            <div class="custom-file">
                                                                <input type="file"
                                                                    class="custom-file-input file @error('file') is-invalid @enderror"
                                                                    name="file" id_file="customFile">
                                                                <label class="custom-file-label" for="customFile">
                                                                    Pilih File
                                                            </div>
                                                            @error('file')
                                                                <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Type data</label>
                                                        <select
                                                            class="form-control mime @error('mime') is-invalid @enderror"
                                                            name="mime">
                                                            @foreach ($mime as $item)
                                                                <option value="{{ $item->id }}">
                                                                    {{ $item->mime }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                        @error('mime')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>
                                                    <input type="hidden" class="data_old_file" name="data_old_file">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
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
                                <th>Nama</th>
                                <th>File</th>
                                <th> Type Data</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($file as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->nama }}</td>
                                    <td><a
                                            href="{{ asset('storage/upload/file/' . $item->file) }}">{{ $item->file }}</a>
                                    </td>
                                    <td>{{ $item->mime->mime }}</td>
                                    <td>
                                        <form action="{{ route('file.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttoneditfile"
                                                data-toggle="modal" data-target="#file" data-mime="{{ $item->mime_id }}"
                                                data-nama="{{ $item->nama }}" data-old-file="{{ $item->file }}"
                                                data-url-file="{{ route('file.update', $item->id) }}">
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
                                <th>Nama</th>
                                <th>File</th>
                                <th> Type Data</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <!-- Button trigger modal -->
                    <div class="col-md-8" style="margin-top: 10px; margin-bottom: 10px;">
                        <button type="button" class="btn btn-primary buttonedit" data-toggle="modal" data-target="#mime"
                            data-mime="" data-id="" data-url="{{ route('mime.store') }}">
                            Tambah Data Type Data
                        </button>
                    </div>
                    <!-- Modal -->
                    <div class="modal
                            fade" id="mime" tabindex="-1"
                        aria-labelledby="myModal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="myModal">Input Type Data</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="{{ route('mime.store') }}" method="post" class="formkirim">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf
                                                    <div class="mb-3">
                                                        <label class="form-label">Type Data</label>
                                                        <input type="text"
                                                            class="form-control mime @error('mime') is-invalid @enderror"
                                                            name="mime" placeholder="Gunakan lowercase">
                                                        @error('mime')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>
                                                    <input type="hidden" name="id" class="id">
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
                    <table id="example30" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th> Type Data</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($mime as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->mime }}</td>
                                    <td>
                                        <form action="{{ route('mime.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#mime" data-mime="{{ $item->mime }}"
                                                data-url="{{ route('mime.update', $item->id) }}">
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
                                <th> Type Data</th>
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
    {{-- Script halaman --}}
    <script src="{{ asset('admin/plugins/jquery/jquery.min.js') }}"></script>
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
    <script>
        $(function() {
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            $("#example30").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#example32_wrapper .col-md-6:eq(0)');
        });



        $(document).on('click', '.buttoneditfile', function() {
            var data_old_file = $(this).attr('data-old-file');
            var data_nama = $(this).attr('data-nama');
            var data_mime = $(this).attr('data-mime');
            var data_url_file = $(this).attr('data-url-file');
            console.log(data_nama, data_old_file, data_url_file);
            $('.mime').val(data_mime);
            $('.data_old_file').attr('value', data_old_file);
            $('.nama').attr('value', data_nama);
            $('.formkirimfile').attr('action', data_url_file);
        });



        $(document).on('click', '.buttonedit', function() {
            var data_mime = $(this).attr('data-mime');
            var data_url = $(this).attr('data-url');
            $('.mime').attr('value', data_mime);
            $('.formkirim').attr('action', data_url);
        });


        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
