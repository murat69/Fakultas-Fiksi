@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <!-- summernote -->
    <link rel="stylesheet" href="{{ asset('admin/plugins/summernote/summernote-bs4.min.css') }}">
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            @include('layouts/flash')
            <div class="card">
                <div class="card-header">
                    <!-- Button trigger modal -->
                    @if (Auth::user()->role == 'admin')
                        <div class="col-md-8" style="margin-top: 10px; margin-bottom: 10px;">
                            <button type="button" class="btn btn-primary buttonadd" data-toggle="modal"
                                data-target="#myModal" data-prodi="" data-id="" data-url="{{ route('conten.store') }}">
                                Tambah Data {{ $title }}
                            </button>
                        </div>
                    @endif
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
                                <form action="{{ route('conten.store') }}" method="post" class="formkirim"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">
                                                    @csrf
                                                    <div class="mb-3">
                                                        <label class="form-label">judul</label>
                                                        <input type="text"
                                                            class="form-control judul @error('judul') is-invalid @enderror"
                                                            name="judul"
                                                            @if (Auth::user()->role !== 'admin') @readonly(true) @endif>
                                                        @error('judul')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Program Studi</label>
                                                        <select
                                                            class="form-control kategori @error('kategori') is-invalid @enderror"
                                                            name="kategori">
                                                            <option value="0" selected>
                                                                Fakultas
                                                            </option>
                                                            @foreach ($prodi as $item)
                                                                <option value="{{ $item->id }}">
                                                                    {{ $item->prodi }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                        @error('kategori')
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
                                                        <label class="form-label">Foto </label>
                                                        <div class="custom-file">
                                                            <input type="file"
                                                                class="custom-file-input file @error('file') is-invalid @enderror"
                                                                name="file" accept="image/*" id_file="customFile">
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
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th>Isi</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($conten as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->judul }}</td>
                                    <td>
                                        @if ($item->kategori == 0)
                                            Fakultas
                                        @else
                                            @foreach ($prodi as $items)
                                                @if ($items->id == $item->kategori)
                                                    {{ $items->prodi }}
                                                @endif
                                            @endforeach
                                        @endif
                                    </td>
                                    <td>{!! $item->isi !!}</td>

                                    <td style="text-align: center">
                                        @if ($item->file_id !== null)
                                            <img src="{{ asset('storage/upload/file/' . $item->file->file) }}"
                                                alt="" style="height: 100px; width: auto;">
                                        @else
                                            <img src="{{ asset('storage/upload/file/Default_pfp.png') }}" alt=""
                                                style="height: 100px; width: auto;">
                                        @endif
                                    </td>
                                    <td>
                                        <form action="{{ route('conten.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal"
                                                data-judul="{{ $item->judul }}" data-isi="{{ $item->isi }}"
                                                data-kategori="{{ $item->kategori }}"
                                                data-url="{{ route('conten.update', $item->id) }}">
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
                                <th>Judul</th>
                                <th>Kategori</th>
                                <th>Isi</th>
                                <th>Image</th>
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
            var data_judul = $(this).attr('data-judul');
            var data_isi = $(this).attr('data-isi');
            var data_kategori = $(this).attr('data-kategori');
            var data_url = $(this).attr('data-url');
            $('.isi').summernote('code', data_isi);
            $('.judul').val(data_judul);
            $('.kategori').val(data_kategori);
            $('.formkirim').attr('action', data_url);
        });

        $(document).on('click', '.buttonadd', function() {
            var data_nama = '';
            var data_url = $(this).attr('data-url');
            $('.nama').attr('value', data_nama);
            $('.formkirim').attr('action', data_url);
        });


        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
