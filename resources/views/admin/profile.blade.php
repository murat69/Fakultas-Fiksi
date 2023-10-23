@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <style>
        .input-container {
            margin-bottom: 50px;
        }

        .pp {
            height: 200px;
            width: 416px;
            overflow: hidden;
            background: url("{{ asset('storage/upload/file/' . $dosen->file->file) }}");
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    </style>
@endsection

@section('content')



    <div class="container-fluid">

        <div class="modal fade" id="myModal1" tabindex="-1" aria-labelledby="myModal1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModal">Input Data {{ $title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="{{ route('profile.update', $dosen->id) }}" method="post" class="formkirim"
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
                                            <select class="form-control status @error('status') is-invalid @enderror"
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
                                            <select class="form-control prodi @error('prodi') is-invalid @enderror"
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



                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                            <button class="btn btn-primary" type="submit">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div class="modal fade" id="myModal2" tabindex="-1" aria-labelledby="myModal2Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModal">Jurnal</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="{{ route('profile.store', $dosen->id) }}" method="post" class="formkirim"
                        enctype="multipart/form-data">
                        <div class="modal-body">

                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-md-12">

                                        @csrf
                                        <div class="mb-3">
                                            <label class="form-label">Jurnal Judul</label>
                                            <div class="input-group">
                                                <input type="text" name="" class="form-control"
                                                    id="input-judul">
                                            </div>
                                            <label class="form-label">Jurnal Link</label>
                                            <div class="input-group">
                                                <input type="text" name="" class="form-control"
                                                    id="input-link">
                                                <div class="input-group-append">
                                                    <button type="button" class="btn btn-primary" id="add-button">Tambah
                                                        Jurnal</button>
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
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                            <button class="btn btn-primary" type="submit">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">

                <!-- Profile Image -->
                <div class="card card-primary card-outline">
                    <div class="card-body box-profile">
                        <div class="text-center">
                            <img class="profile-user-img img-fluid img-circle"
                                src="{{ asset('storage/upload/file/' . @$dosen->file->file) }}"
                                alt="User profile picture">
                        </div>

                        <h3 class="profile-username text-center">{{ $dosen->nama }}</h3>

                        <p class="text-muted text-center">{{ $dosen->status . ' ' . @$dosen->prodi->prodi }}</p>

                        <ul class="list-group list-group-unbordered mb-3">
                            <li class="list-group-item">
                                <b>Total Jurnal : </b> <a class="">{{ count($dosen->jurnal_link) }}</a>
                            </li>
                            <li class="list-group-item">
                                <b>Schoolar Link : </b> <a class="">{{ $dosen->schoolar }}</a>
                            </li>
                            <li class="list-group-item">
                                <b>PDDIKTI Jurnal : </b> <a class="">{{ $dosen->pddikti }}</a>
                            </li>
                            <li class="list-group-item">
                                <b>Linkedin Jurnal : </b> <a class="">{{ $dosen->linkedin }}</a>
                            </li>
                        </ul>
                        <a href="#" class="col-md-2 btn btn-primary btn-block buttonedit" data-toggle="modal"
                            data-target="#myModal1" data-nama="{{ $dosen->nama }}" data-prodi="{{ $dosen->prodi_id }}"
                            data-id="{{ $dosen->id }}" data-schoolar="{{ $dosen->schoolar }}"
                            data-pddikti="{{ $dosen->pddikti }}" data-status="{{ $dosen->status }}"
                            data-linkedin="{{ $dosen->linkedin }}"><b>Edit
                                Profile</b></a>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->

                <!-- About Me Box -->
                <div class="card card-primary">

                    <div class="card-header">
                        <h3 class="card-title">Jurnal</h3>
                    </div>

                    <!-- /.card-header -->

                    <div class="card-body">
                        @if (count($dosen->jurnal_link) >= 1)
                            @foreach ($dosen->jurnal_link as $jurnal)
                                <div class="jurnal{{ $jurnal->id }}">
                                    <strong style="display: flex !important; align-items: center;">
                                        <form action="{{ route('profile.jurnal.destroy', $jurnal->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <button type="submit" class="text-danger fas fa-trash mr-1"
                                                onclick="return confirm('Apakah Anda Yakin?')"
                                                style="border: none; background: tranparent;">
                                            </button>
                                        </form>
                                        <a href="{{ $jurnal->link }}" target="_blank"> <i
                                                class="fas fa-book mr-1"></i></a>
                                        <div class="myDiv" data-id="{{ $jurnal->id }}" data-send="judul">
                                            {{ $jurnal->judul }}</div>
                                    </strong>
                                    <p class="text-muted myDiv" data-id="{{ $jurnal->id }}" data-send="link">
                                        {{ $jurnal->link }}
                                    </p>
                                </div>
                            @endforeach
                        @endif
                        <a href="#" class="col-md-2 btn btn-primary btn-block buttonjurnal" data-toggle="modal"
                            data-target="#myModal2"><b>Tambah Jurnal</b></a>
                    </div>

                    <!-- /.card-body -->

                </div>

                <!-- /.card -->
            </div>

        </div>
        <!-- /.row -->
    </div><!-- /.container-fluid -->
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
            $(document).on('dblclick', '.myDiv', function() {
                var data_id = $(this).attr('data-id');
                var data_send = $(this).attr('data-send');
                var divText = $(this).text();
                var inputElement = $('<input style="width: 100%;" name="edit" type="text" data-id="' +
                    data_id +
                    '" data-send="' +
                    data_send + '">').val(divText);
                $(this).replaceWith(inputElement);
                inputElement.focus();
            });

            $(document).on('blur', 'input[name="edit"]', function() {
                var data_send = $(this).attr('data-send');
                var data_id = $(this).attr('data-id');
                var inputText = $(this).val();
                var divElement = $('<div name="edit" data-id="' + data_id + '" data-send="' + data_send +
                    '">').addClass('myDiv').text(inputText);
                $(this).replaceWith(divElement);
                var _token = $('input[name="_token"]').val();
                var formData = new FormData();
                formData.append('id', data_id);
                formData.append('jenis', data_send);
                formData.append('input', inputText);
                formData.append('_token', _token);
                console.log(data_send + inputText + data_id);

                $.ajax({
                    url: '{{ route('profile.jurnal.update') }}',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        console.log(data['all']);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        // handle error response
                    }
                });
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
                    $('.jurnal' + deleted_id).remove();
                },
                error: function(xhr, textStatus, errorThrown) {
                    // handle error response
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

        $(document).on('click', '.buttonjurnal', function() {
            $('.jurnal' + data_id).each(function(index) {
                var data_link = $(this).attr('data-link');
                var data_judul = $(this).attr('data-judul');
                var data_id_jurnal = $(this).attr('data-id-jurnal');

                var newInput = $(
                    '<input type="text" name="jurnaledited[]" class="form-control link" data_edited_id="' +
                    data_id_jurnal + '">').val(
                    data_link);
                var newInput2 = $(
                    '<input type="text" name="juduledited[]" class="form-control judul" data_edited_id="' +
                    data_id_jurnal + '">').val(
                    data_judul);

                var newInput3 = $(
                    '<button type="button" class="delete-form edited-deleted jurnal' +
                    data_id_jurnal +
                    '" data_deleted_id="' +
                    data_id_jurnal + '">Delete</button>'
                ).val(
                    data_judul);
                $('#output-container').append(newInput2);
                $('#output-container').append(newInput);
                $('#output-container').append(newInput3);
            });
        });

        $(document).on('click', '.buttonedit', function() {
            $('#output-container').empty();
            var data_id = $(this).attr('data-id');
            var data_prodi = $(this).attr('data-prodi');
            var data_nama = $(this).attr('data-nama');
            var data_schoolar = $(this).attr('data-schoolar');
            var data_pddikti = $(this).attr('data-pddikti');
            var data_linkedin = $(this).attr('data-linkedin');
            var data_status = $(this).attr('data-status');


            $('.nama').attr('value', data_nama);
            $('.schoolar').attr('value', data_schoolar);
            $('.pddikti').attr('value', data_pddikti);
            $('.linkedin').attr('value', data_linkedin);
            $('.prodi').val(data_prodi);
            $('.status').val(data_status);
        });

        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
