@extends('layouts.admin.admin')

@section('styles')
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
    <style>
        .input-container {
            margin-bottom: 50px;
        }

        .delete-btn {
            margin-left: 10px;
            cursor: pointer;
            color: red;
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
                            data-prodi="" data-id="" data-url="{{ route('admin.aspek.store') }}">
                            Tambah Data {{ $title }}
                        </button>
                        @error('value')
                            <span class="alert alert-danger" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
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
                                <form action="{{ route('admin.aspek.store') }}" method="post" class="formkirim"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf


                                                    <div class="mb-3">
                                                        <label class="form-label">Aspek</label>
                                                        <input type="text"
                                                            class="form-control aspek @error('aspek') is-invalid @enderror"
                                                            name="aspek">
                                                        @error('aspek')
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

                    {{-- Modal Subaspek --}}
                    <div class="modal
                            fade" id="subaspek" tabindex="-1"
                        aria-labelledby="subaspek" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="subaspek">Input Data Aspek</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="{{ route('admin.sub_aspek.store') }}" method="post" class="formkirimsub"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">
                                                    @csrf
                                                    <div class="mb-3">
                                                        <label class="form-label">Pertanyaan</label>
                                                        <input type="text"
                                                            class="form-control nama @error('nama') is-invalid @enderror"
                                                            name="nama">
                                                        @error('aspek')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Monev</label>
                                                        <select
                                                            class="form-control monev @error('monev') is-invalid @enderror"
                                                            name="monev">
                                                            @foreach ($monevs as $item)
                                                                <option value="{{ $item->id }}">
                                                                    {{ $item->nama }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                        @error('tahun')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Item</label>
                                                        <div class="input-group">
                                                            <input type="text" name="" class="form-control"
                                                                id="input-item">
                                                        </div>
                                                        <label class="form-label">Value</label>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <input type="number" name="" class="form-control"
                                                                id="input-value">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary"
                                                                    id="add-button">Tambah sub aspek</button>
                                                            </div>
                                                        </div>

                                                        <input type="hidden" name="id_sub" class="id_sub">

                                                        <div id="output-container">
                                                            <div class="form-group"></div>
                                                            <!-- Output akan ditampilkan di sini -->
                                                        </div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Template</label>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary addtemplate"
                                                                    id="addtemplate">Input Template Dosen</button>
                                                            </div>
                                                        </div>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary addtemplate"
                                                                    id="addtemplatemhs">Input Template Mahasiswa</button>
                                                            </div>
                                                        </div>

                                                        <input type="hidden" name="id_sub" class="id_sub">

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
                                <th>Aspek</th>
                                <th>Sub Aspek</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($monev as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->aspek }}</td>
                                    <td>
                                        <a href="" class="btn btn-sm btn-outline-success buutonsubaspek"
                                            data-toggle="modal" data-target="#subaspek"
                                            data-id-sub="{{ $item->id }}"
                                            data-url-sub="{{ route('admin.sub_aspek.store') }}">
                                            Tambah Sub Aspek
                                        </a>
                                        <br>
                                        <ul>
                                            @foreach ($item->template_monev as $sub)
                                                <li>Monev : {{ $sub->monev->nama }}</li>
                                                <li> {{ $sub->nama }} :<br>
                                                    <ul>
                                                        @foreach (json_decode($sub->isi) as $key => $value)
                                                            <li>
                                                                {{ $key }} = {{ $value }}
                                                                <br />
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                    <form action="{{ route('admin.sub_aspek.destroy', $sub->id) }}"
                                                        method="post">
                                                        <a href=""
                                                            class="btn btn-sm btn-outline-success editsubaspek"
                                                            data-toggle="modal" data-target="#subaspek"
                                                            data-nama-sub="{{ $sub->nama }}"
                                                            data-monev-sub="{{ $sub->monev_id }}"
                                                            data-id-sub="{{ $item->id }}"
                                                            data-isisub="{{ $sub->isi }}"
                                                            data-add-total-edit="{{ $sub->total }}""
                                                            data-url-sub="{{ route('admin.sub_aspek.update', $sub->id) }}">
                                                            Edit Sub Aspek
                                                        </a>

                                                        @csrf
                                                        @method('delete')
                                                        <button type="submit" class="btn btn-sm btn-outline-danger"
                                                            onclick="return confirm('Apakah Anda Yakin?')">Delete
                                                        </button>
                                                    </form><br>
                                                </li>
                                            @endforeach
                                        </ul>
                                    </td>
                                    <td>
                                        <form action="{{ route('admin.aspek.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal"
                                                data-aspek="{{ $item->aspek }}" data-total="{{ $item->total }}"
                                                data-tahun="{{ $item->tahun_id }}"
                                                data-url="{{ route('admin.aspek.update', $item->id) }}">
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
                                <th>Aspek</th>
                                <th>Sub Aspek</th>
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
            var data_total;
            $(document).on('click', '.buutonsubaspek', function() {
                $('#output-container').empty();
                var data_id_sub = $(this).attr('data-id-sub');
                var data_url_sub = $(this).attr('data-url-sub');
                $('.formkirimsub').attr('action', data_url_sub);
                $('.id_sub').attr('value', data_id_sub);
            });


            $(document).on('click', '.editsubaspek', function() {
                $('#output-container').empty();
                data_total = $(this).attr('data-add-total-edit');
                var data_nama_sub = $(this).attr('data-nama-sub');
                var data_tahun_sub = $(this).attr('data-tahun-sub');
                var data_monev_sub = $(this).attr('data-monev-sub');
                var data_id_sub = $(this).attr('data-id-sub');
                var data_url_sub = $(this).attr('data-url-sub');
                var data_isisub = $(this).attr('data-isisub');
                console.log(data_id_sub);
                $('.id_sub').attr('value', data_id_sub);
                $('.tahun').val(data_tahun_sub);
                $('.monev').val(data_monev_sub);
                $('.total').val(data_total);
                $('.nama').attr('value', data_nama_sub);
                $('.formkirimsub').attr('action', data_url_sub);
                var jsonObject = JSON.parse(data_isisub);

                // Loop melalui objek dan tampilkan di dalam console log
                $.each(jsonObject, function(key, value) {
                    data_total -= parseInt(value);
                    var Inputitem = $(
                            '<input type="text" style="margin-top:10px" name="item[]" class="form-control">'
                        )
                        .val(
                            key);
                    var Inputvalue = $('<input type="text" name="value[]" class="form-control">')
                        .val(
                            value);
                    var deleteButton = $(
                        '<button class="delete-btn">Delete</button>'); // Membuat tombol delete
                    deleteButton.on('click', function() {
                        var value = parseInt($(this).prevAll('input[name="value[]"]').val(),
                            10);
                        data_total += value;
                        $(this).parent()
                            .remove(); // Menghapus baris ketika tombol delete ditekan
                        console.log("Data Total: " + data_total);
                    });


                    var inputContainer = $('<div class="input-container"></div>');

                    inputContainer.append(Inputitem);
                    inputContainer.append(Inputvalue);
                    inputContainer.append(deleteButton);

                    $('#output-container').append(inputContainer);
                    $('#input-item').val('');
                    $('#input-value').val('');
                    console.log(value);

                });

                console.log(data_total);
            });
            var inputField = $("#input-total");

            inputField.on("blur", function() {
                // Mendapatkan nilai dari input
                data_total = inputField.val();
                console.log(data_total);
            });

            $('#add-button').click(function() {

                var inputitem = $('#input-item').val();
                var inputvalue = $('#input-value').val();

                if (inputvalue == '') {
                    inputvalue = 0;
                }




                if (inputitem !== '' && inputvalue !== '') {
                    data_total -= inputvalue;
                    console.log("Data Total: " + data_total);
                    var Inputitem = $('<input type="text" name="item[]" class="form-control">').val(
                        inputitem).prop(
                        'readonly', true);
                    var Inputvalue = $('<input type="text" name="value[]" class="form-control">')
                        .val(
                            inputvalue).prop(
                            'readonly', true);
                    var deleteButton = $(
                        '<button class="delete-btn">Delete</button>'); // Membuat tombol delete
                    deleteButton.on('click', function() {
                        var value = parseInt($(this).prevAll('input[name="value[]"]').val(),
                            10);
                        data_total += value;
                        $(this).parent()
                            .remove(); // Menghapus baris ketika tombol delete ditekan
                        console.log("Data Total: " + data_total);
                    });


                    var inputContainer = $('<div class="input-container"></div>');

                    inputContainer.append(Inputitem);
                    inputContainer.append(Inputvalue);
                    inputContainer.append(deleteButton);

                    $('#output-container').append(inputContainer);
                    $('#input-item').val('');
                    $('#input-value').val('');
                    console.log();
                } else {
                    alert("Mohon Isi Item, Value Dan Total");
                }



            });

            $('#addtemplate').click(function() {
                var inputsts = "Sangat Tidak Setuju";
                var inputts = "Tidak Setuju";
                var inputas = "Agak Setuju";
                var inputs = "Setuju";
                var inputss = "Sangat Setuju";

                var inputvaluests = 0;

                var Inputsts = $('<input type="text" name="item[]" class="form-control">').val(
                    inputsts).prop(
                    'readonly', true);
                var Inputts = $('<input type="text" name="item[]" class="form-control">').val(
                    inputts).prop(
                    'readonly', true);
                var Inputas = $('<input type="text" name="item[]" class="form-control">').val(
                    inputas).prop(
                    'readonly', true);
                var Inputs = $('<input type="text" name="item[]" class="form-control">').val(
                    inputs).prop(
                    'readonly', true);
                var Inputss = $('<input type="text" name="item[]" class="form-control">').val(
                    inputss).prop(
                    'readonly', true);

                var Inputvalue1 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue2 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue3 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue4 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue5 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);

                var deleteButton = $(
                    '<button class="delete-btn">Delete</button>'); // Membuat tombol delete
                deleteButton.on('click', function() {
                    var value = parseInt($(this).prevAll('input[name="value[]"]').val(),
                        10);
                    data_total += value;
                    $(this).parent()
                        .remove(); // Menghapus baris ketika tombol delete ditekan
                    console.log("Data Total: " + data_total);
                });


                var inputContainer = $('<div class="input-container"></div>');

                inputContainer.append(Inputsts);
                inputContainer.append(Inputvalue1);
                inputContainer.append(Inputts);
                inputContainer.append(Inputvalue2);
                inputContainer.append(Inputas);
                inputContainer.append(Inputvalue3);
                inputContainer.append(Inputs);
                inputContainer.append(Inputvalue4);
                inputContainer.append(Inputss);
                inputContainer.append(Inputvalue5);
                inputContainer.append(deleteButton);

                $('#output-container').append(inputContainer);
                $('#input-item').val('');
                $('#input-value').val('');
                console.log();


            });
            $('#addtemplatemhs').click(function() {
                var inputsts = "Kurang";
                var inputts = "Cukup";
                var inputas = "Baik";
                var inputs = "Sangat Baik";

                var inputvaluests = 0;

                var Inputsts = $('<input type="text" name="item[]" class="form-control">').val(
                    inputsts).prop(
                    'readonly', true);
                var Inputts = $('<input type="text" name="item[]" class="form-control">').val(
                    inputts).prop(
                    'readonly', true);
                var Inputas = $('<input type="text" name="item[]" class="form-control">').val(
                    inputas).prop(
                    'readonly', true);
                var Inputs = $('<input type="text" name="item[]" class="form-control">').val(
                    inputs).prop(
                    'readonly', true);

                var Inputvalue1 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue2 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue3 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);
                var Inputvalue4 = $('<input type="text" name="value[]" class="form-control">')
                    .val(
                        inputvaluests);

                var deleteButton = $(
                    '<button class="delete-btn">Delete</button>'); // Membuat tombol delete
                deleteButton.on('click', function() {
                    var value = parseInt($(this).prevAll('input[name="value[]"]').val(),
                        10);
                    data_total += value;
                    $(this).parent()
                        .remove(); // Menghapus baris ketika tombol delete ditekan
                    console.log("Data Total: " + data_total);
                });

                var inputContainer = $('<div class="input-container"></div>');

                inputContainer.append(Inputsts);
                inputContainer.append(Inputvalue1);
                inputContainer.append(Inputts);
                inputContainer.append(Inputvalue2);
                inputContainer.append(Inputas);
                inputContainer.append(Inputvalue3);
                inputContainer.append(Inputs);
                inputContainer.append(Inputvalue4);
                inputContainer.append(deleteButton);

                $('#output-container').append(inputContainer);
                $('#input-item').val('');
                $('#input-value').val('');
                console.log();


            });
        });




        $(document).on('click', '.buttonedit', function() {
            $('#output-container').empty();
            var data_aspek = $(this).attr('data-aspek');
            var data_url = $(this).attr('data-url');
            var data_total = $(this).attr('data-total');

            $('.aspek').attr('value', data_aspek);
            $('.total').attr('value', data_total);
            $('.tahun').val($(this).attr('data-tahun'));
            $('.formkirim').attr('action', data_url);
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

        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
