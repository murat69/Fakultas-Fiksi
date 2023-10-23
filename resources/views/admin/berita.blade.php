@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/summernote/summernote-bs4.min.css') }}">

    <style>
        .scroll-container {
            white-space: nowrap;
            /* atur konten tidak dibungkus ke baris baru */
            overflow-x: scroll;
            /* atur overflow-x menjadi scroll */
            height: 200px;
            /* atur tinggi scroll container */
        }

        .image-wrapper {
            position: relative;
            display: inline-block;
            margin: 10px;
            min-width: 100px;
            min-height: 100px;
            max-height: 150px;
        }

        .image-wrapper img {
            display: block;
            width: 100%;
            height: auto;
            width: 100px;
            margin-left: 20px;

        }

        .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            visibility: hidden;
            opacity: 0;
            transition: all 0.3s ease;
        }

        .image-wrapper:hover .overlay {
            visibility: visible;
            opacity: 1;
        }

        .overlay button {
            margin: 10px;
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
                        <button type="button" class="btn btn-primary buttonedit" data-toggle="modal" data-target="#myModal"
                            data-prodi="" data-id="" data-url="{{ route('berita.store') }}">
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
                                <form action="{{ route('berita.store') }}" method="post" class="formkirim"
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

                                                    <div class="form-group">
                                                        <label>Date:</label>
                                                        <div class="input-group date" id="reservationdate"
                                                            data-target-input="nearest">
                                                            <input type="text"
                                                                class="form-control datetimepicker-input tanggal"
                                                                data-target="#reservationdate" name="tanggal" />
                                                            <div class="input-group-append" data-target="#reservationdate"
                                                                data-toggle="datetimepicker">
                                                                <div class="input-group-text"><i class="fa fa-calendar"></i>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <label class="form-label">Program Studi</label>
                                                        <select
                                                            class="form-control prodi @error('prodi') is-invalid @enderror"
                                                            name="prodi">
                                                            @foreach ($prodi as $item)
                                                                <option value="{{ $item->id }}">
                                                                    {{ $item->prodi }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                        @error('mime')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Thumbnail</label>
                                                        <div class="custom-file">
                                                            <input type="file"
                                                                class="custom-file-input thumbnail @error('thumbnail') is-invalid @enderror"
                                                                name="thumbnail" accept="image/*" id_file="thumbnail">
                                                            <label class="custom-file-label" for="thumbnail">
                                                                Pilih File
                                                        </div>
                                                        @error('file')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>


                                                    <div class="mb-3">
                                                        <label class="form-label">Foto Gallery (Maksimal 5)</label>
                                                        <div class="custom-file">
                                                            <input type="file"
                                                                class="custom-file-input file @error('file') is-invalid @enderror"
                                                                name="file[]" accept="image/*" multiple id="customFile"
                                                                id_file="customFile">
                                                            <label class="custom-file-label" for="customFile">
                                                                Pilih File
                                                        </div>
                                                        @error('file')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div id="output-container">
                                                        <!-- Output akan ditampilkan di sini -->
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
                                <th>Prodi</th>
                                <th>Tanggal</th>
                                <th>Thumbnail</th>
                                <th>File</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($berita as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->header }}</td>
                                    <td>{{ $item->judul }}</td>
                                    <td>{!! Str::limit(strip_tags($item->isi), 200) !!}</td>
                                    <td>{{ @$item->prodi->prodi }}</td>
                                    <td>{{ $item->tanggal }}</td>
                                    <td>
                                        <img src="{{ asset('storage/upload/file/berita/thumbnail/' . $item->thumbnail) }}"
                                            alt="" style="height: 100px; width: auto;">
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary" data-toggle="modal"
                                            data-target="#modalimg{{ $no }}">
                                            gallery berita
                                        </button>
                                    </td>
                                    <td>
                                        <form action="{{ route('berita.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal"
                                                data-isi="{{ $item->isi }}" data-judul="{{ $item->judul }}"
                                                data-prodi="{{ $item->prodi_id }}"
                                                data-url="{{ route('berita.update', $item->id) }}"
                                                data-tanggal="{{ $item->tanggal }}" data-header="{{ $item->header }}">
                                                Edit
                                            </a> |
                                            <button type="submit" class="btn btn-sm btn-outline-danger"
                                                onclick="return confirm('Apakah Anda Yakin?')">Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                <div class="modal
                                                fade"
                                    id="modalimg{{ $no }}" tabindex="-1" aria-labelledby="modalimg"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Upload / Edit
                                                    Gallery</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>

                                            <div class="modal-body">
                                                </style>
                                                <div class="container">
                                                    <div class="row justify-content-center">
                                                        <div class="col-md-12">
                                                            <div class="scroll-container">

                                                                @foreach ($item->file_berita as $image)
                                                                    <div class="image-wrapper">
                                                                        <img class="img_gallery_{{ $image->id }}"
                                                                            src="{{ asset('storage/upload/file/berita/gallery' . '/' . $image->file) }}"
                                                                            alt=""
                                                                            style=" min-width: 150px; min-height: 150px; max-height: 150px;">
                                                                        <div class="overlay">

                                                                            <form
                                                                                action="{{ route('berita.img_delete', $image->id) }}"
                                                                                method="post">
                                                                                @csrf
                                                                                @method('delete')
                                                                                <button type="submit"
                                                                                    class="btn btn-sm btn-outline-danger"
                                                                                    onclick="return confirm('Apakah Anda Yakin?')">Delete</button>
                                                                            </form>

                                                                            <label for="file-input-{{ $image->id }}"
                                                                                class="btn btn-primary edit"
                                                                                style="margin-top: 10px">Edit
                                                                            </label>

                                                                            <form id="uploadForm-{{ $image->id }}"
                                                                                class="uploadForm"
                                                                                enctype="multipart/form-data">

                                                                                <input id="file-input-{{ $image->id }}"
                                                                                    class="file-input" type="file"
                                                                                    name="file" style="display: none;"
                                                                                    data_id_img="{{ $image->id }}"
                                                                                    data_old_file="{{ $image->file }}"
                                                                                    data-judul="{{ $item->judul }}"
                                                                                    data-header="{{ $item->header }}">
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                @endforeach

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <form action="{{ route('berita.image', $item->id) }}" method="post"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    @if (count($item->file_berita) >= 5)
                                                        <h4>Image gallery sudah penuh</h4>
                                                    @elseif(count($item->file_berita) < 5)
                                                        <div class="mb-3">
                                                            <label class="form-label">Foto Gallery (Maksimal 5)</label>
                                                            <div class="custom-file">
                                                                <input type="file"
                                                                    class="custom-file-input file @error('file') is-invalid @enderror"
                                                                    name="images[]" accept="image/*" multiple
                                                                    id="tambahimg" id_file="tambahimg"
                                                                    data-max="{{ count($item->file_berita) }}">
                                                                <label class="custom-file-label" for="tambahimg">
                                                                    Pilih File
                                                            </div>
                                                        </div>
                                                        <button class="btn btn-primary" type="submit">Upload
                                                            Gambar</button>
                                                    @endif
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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
                                <th>Prodi</th>
                                <th>Tanggal</th>
                                <th>Thumbnail</th>
                                <th>File</th>
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
    <script src="{{ asset('admin/plugins/moment/moment.min.js') }}"></script>
    <script src="{{ asset('admin/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') }}"></script>
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

            $("#reservationdate").datetimepicker({
                format: 'YYYY-MM-DD',
                locale: 'id'
            });

            $('.file-input').change(function() {
                var id_img = $(this).attr('data_id_img');
                var old_file = $(this).attr('data_old_file');
                var data_judul = $(this).attr('data-judul');
                var _token = $('input[name="_token"]').val();
                var formData = new FormData($('#uploadForm-' + id_img)[0]);
                formData.append('id_img',
                    id_img);
                formData.append('_token', _token);
                formData.append('old_file',
                    old_file);
                formData.append('data_judul', data_judul);
                $.ajax({
                    url: '{{ route('berita.img_edit') }}',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        $(data['id_img']).attr('src', '../storage/upload/file/berita/gallery/' +
                            data[
                                'foto']);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        // handle error response
                    }
                });
            });

            // Mendapatkan elemen input file
            var fileInput = $('#customFile');

            // Mendengarkan peristiwa perubahan pada input file
            fileInput.on('change', function() {
                // Mendapatkan daftar file yang diupload
                var files = fileInput[0].files;

                // Memeriksa jumlah file yang diupload
                if (files.length > 5) {
                    // Jika jumlah file lebih dari 5, menghapus file yang melebihi batas
                    fileInput.val('');
                    // Menampilkan pesan kesalahan
                    alert('Anda hanya dapat mengupload maksimal 5 file.');
                }
            });

            var filetambah = $('#tambahimg');


            // Mendengarkan peristiwa perubahan pada input file
            filetambah.on('change', function() {
                var datamax = 5 - $(this).attr('data-max');
                // Mendapatkan daftar file yang diupload
                var files = filetambah[0].files;
                console.log(files);
                console.log(datamax);

                // Memeriksa jumlah file yang diupload
                if (files.length > datamax) {
                    // Jika jumlah file lebih dari 5, menghapus file yang melebihi batas
                    filetambah.val('');
                    // Menampilkan pesan kesalahan
                    alert('Anda hanya dapat mengupload maksimal ' + datamax + ' file.');
                }
            });

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

            var data_prodi = $(this).attr('data-prodi');
            var data_judul = $(this).attr('data-judul');
            var data_isi = $(this).attr('data-isi');
            var data_url = $(this).attr('data-url');
            var data_tanggal = $(this).attr('data-tanggal');
            var data_header = $(this).attr('data-header');
            $('.isi').summernote('code', data_isi);
            $('.tanggal').attr('value', data_tanggal);
            $('.header').attr('value', data_header);
            $('.judul').attr('value', data_judul);
            $('.prodi').val(data_prodi);
            $('.formkirim').attr('action', data_url);
        });

        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
