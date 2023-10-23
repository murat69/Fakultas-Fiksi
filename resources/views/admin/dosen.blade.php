@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
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
                        <button type="button" class="btn btn-primary buttonedit" data-toggle="modal" data-target="#myModal"
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
                                <form action="{{ route('dosen.store') }}" method="post" class="formkirim"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf
                                                    <div class="mb-3">
                                                        <label class="form-label">Nama</label>
                                                        <input type="text"
                                                            class="form-control nama @error('nama') is-invalid @enderror"
                                                            name="nama">
                                                        @error('nama')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Status Jabatan</label>
                                                        <select
                                                            class="form-control status @error('status') is-invalid @enderror"
                                                            name="status">

                                                            <option value="Dosen">
                                                                Dosen
                                                            </option>

                                                            <option value="Kaprodi">
                                                                Kaprodi
                                                            </option>

                                                            <option value="Dekan">
                                                                Dekan
                                                            </option>

                                                        </select>
                                                        @error('mime')
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
                                                        <label class="form-label">Foto (opsional)</label>
                                                        <div class="custom-file">
                                                            <input type="file"
                                                                class="custom-file-input file @error('file') is-invalid @enderror"
                                                                name="file" id_file="customFile" accept="image/*">
                                                            <label class="custom-file-label" for="customFile">
                                                                Pilih File
                                                        </div>
                                                        @error('file')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Schoolar</label>
                                                        <input type="text"
                                                            class="form-control schoolar @error('schoolar') is-invalid @enderror"
                                                            name="schoolar">
                                                        @error('schoolar')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Pddikti</label>
                                                        <input type="text"
                                                            class="form-control pddikti @error('pddikti') is-invalid @enderror"
                                                            name="pddikti">
                                                        @error('pddikti')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Linkedin</label>
                                                        <input type="text"
                                                            class="form-control linkedin @error('linkedin') is-invalid @enderror"
                                                            name="linkedin">
                                                        @error('linkedin')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Jurnal Judul</label>
                                                        <div class="input-group">
                                                            <input type="text" name="" class="form-control"
                                                                id="input-judul">
                                                        </div>
                                                        <label class="form-label">Jurnal Link</label>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <input type="text" name="" class="form-control"
                                                                id="input-link">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary"
                                                                    id="add-button">Tambah Jurnal</button>
                                                            </div>
                                                        </div>

                                                        <div id="output-container">
                                                            <div class="form-group"></div>
                                                            <!-- Output akan ditampilkan di sini -->
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Tutup</button>
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
                                <th>Prodi</th>
                                <th>Status Jabatan</th>
                                <th>Schoolar</th>
                                <th>Pddikti</th>
                                <th>Linkedin</th>
                                <th>Jurnal</th>
                                <th>Foto Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($dosen as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->nama }}</td>
                                    <td>{{ @$item->prodi->prodi }}</td>
                                    <td>{{ $item->status }}</td>
                                    <td>{{ $item->schoolar }}</td>
                                    <td>{{ $item->pddikti }}</td>
                                    <td>{{ $item->linkedin }}</td>
                                    <td>
                                        <div class="card overflow-auto" style="max-height: 100px">
                                            <div class="card-body">
                                                <ul class="list-group">
                                                    @foreach ($item->jurnal_link as $jurnal)
                                                        <li class="jurnal{{ $item->id }} list-group-item"
                                                            data-judul="{{ $jurnal->judul }}"
                                                            data-link="{{ $jurnal->link }}"
                                                            data-id-jurnal="{{ $jurnal->id }}"><a
                                                                class="jurnalid{{ $jurnal->id }}"
                                                                href="{{ $jurnal->link }}">{{ $jurnal->judul }}</a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
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
                                        <form action="{{ route('dosen.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal"
                                                data-nama="{{ $item->nama }}" data-prodi="{{ $item->prodi_id }}"
                                                data-id="{{ $item->id }}" data-schoolar="{{ $item->schoolar }}"
                                                data-pddikti="{{ $item->pddikti }}" data-status="{{ $item->status }}"
                                                data-linkedin="{{ $item->linkedin }}"
                                                data-url="{{ route('dosen.update', $item->id) }}">
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
                                <th>Prodi</th>
                                <th>Status Jabatan</th>
                                <th>Schoolar</th>
                                <th>Pddikti</th>
                                <th>Linkedin</th>
                                <th>Jurnal</th>
                                <th>Foto Profile</th>
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
    <script>
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

        $(document).on('click', '.delete-form', function() {
            var deleted_id = $(this).attr('data_deleted_id');
            var _token = $('input[name="_token"]').val();
            var formData = new FormData();
            formData.append('id', deleted_id);
            formData.append('_token', _token);

            console.log(formData);
            $.ajax({
                url: '{{ route('jurnal.deleted') }}',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log("bisa gan");
                    $('.jurnalid' + deleted_id).empty();
                    $('.jurnalid' + deleted_id).remove();
                },
                error: function(xhr, textStatus, errorThrown) {
                    // handle error response
                }
            });





        });

        $(document).on('change', '.link', function() {
            var input = $(this);
            var data_id_jurnal = input.attr('data_edited_id');
            var data_link = input.val();
            var _token = $('input[name="_token"]').val();

            $.ajax({
                url: '{{ route('jurnal.edited') }}',
                method: 'POST',
                data: {
                    data_id_jurnal: data_id_jurnal,
                    data_link: data_link,
                    _token: _token
                },
                success: function(response) {
                    // Tampilkan pesan sukses atau lakukan aksi lain yang diperlukan

                },
                error: function(xhr, status, error) {
                    // Tampilkan pesan error atau lakukan penanganan error lainnya
                    console.error('Terjadi kesalahan saat mengunggah data ke database');
                    console.error(xhr.responseText);
                }
            });
        });

        $(document).on('change', '.judul', function() {
            var input = $(this);
            var data_id_jurnal = input.attr('data_edited_id');
            var data_judul = input.val();
            var _token = $('input[name="_token"]').val();

            $.ajax({
                url: '{{ route('jurnal.edited') }}',
                method: 'POST',
                data: {
                    data_id_jurnal: data_id_jurnal,
                    data_judul: data_judul,
                    _token: _token
                },
                success: function(response) {
                    // Tampilkan pesan sukses atau lakukan aksi lain yang diperlukan
                    $('.jurnalid' + data_id_jurnal).empty();
                    $('.jurnalid' + data_id_jurnal).append(data_judul);
                },
                error: function(xhr, status, error) {
                    // Tampilkan pesan error atau lakukan penanganan error lainnya
                    console.error('Terjadi kesalahan saat mengunggah data ke database');
                    console.error(xhr.responseText);
                }
            });
        });

        $(document).on('click', '.buttonedit', function() {
            $('#output-container').empty();
            var data_id = $(this).attr('data-id');
            var data_prodi = $(this).attr('data-prodi');
            var data_nama = $(this).attr('data-nama');
            var data_url = $(this).attr('data-url');
            var data_schoolar = $(this).attr('data-schoolar');
            var data_pddikti = $(this).attr('data-pddikti');
            var data_linkedin = $(this).attr('data-linkedin');
            var data_status = $(this).attr('data-status');

            $('.jurnal' + data_id).each(function(index) {
                var data_link = $(this).attr('data-link');
                var data_judul = $(this).attr('data-judul');
                var data_id_jurnal = $(this).attr('data-id-jurnal');

                var newInput = $(
                    '<input type="text" name="jurnaledited[]" class="jurnalid' +
                    data_id_jurnal + ' form-control link" data_edited_id="' +
                    data_id_jurnal + '">').val(
                    data_link);
                var newInput2 = $(
                    '<input type="text" name="juduledited[]" class="jurnalid' +
                    data_id_jurnal + ' form-control judul" data_edited_id="' +
                    data_id_jurnal + '">').val(
                    data_judul);

                var newInput3 = $(
                    '<button type="button" style="margin-bottom: 20px;" class="jurnalid' +
                    data_id_jurnal + ' delete-form edited-deleted jurnal' +
                    data_id_jurnal +
                    '" data_deleted_id="' +
                    data_id_jurnal + '">Delete</button>'
                ).val(
                    data_judul);
                $('#output-container').append(newInput2);
                $('#output-container').append(newInput);
                $('#output-container').append(newInput3);
            });
            $('.nama').attr('value', data_nama);
            $('.schoolar').attr('value', data_schoolar);
            $('.pddikti').attr('value', data_pddikti);
            $('.linkedin').attr('value', data_linkedin);
            $('.prodi').val(data_prodi);
            $('.status').val(data_status);
            $('.formkirim').attr('action', data_url);
        });

        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
