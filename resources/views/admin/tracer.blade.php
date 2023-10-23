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
                            data-prodi="" data-id="" data-url="{{ route('kat.tracer.store') }}">
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
                                    <h5 class="modal-title" id="myModal">Input Aspek {{ $title }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="{{ route('kat.tracer.store') }}" method="post" class="formkirim"
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
                                                    <div class="mb-3">
                                                        <label class="form-label">Deskripsi</label>
                                                        <textarea name="deskripsi" class="form-control deskripsi @error('deskripsi') is-invalid @enderror" id=""
                                                            cols="30" rows="10"></textarea>
                                                        @error('deskripsi')
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
                                                        <label class="form-label">Tahun</label>
                                                        <select
                                                            class="form-control tahun @error('tahun') is-invalid @enderror"
                                                            name="tahun">
                                                            @foreach ($tahun as $item)
                                                                <option value="{{ $item->id }}">
                                                                    {{ $item->tahun }}
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
                                                        <label class="form-label">Prodi</label>
                                                        <select
                                                            class="form-control prodi @error('prodi') is-invalid @enderror"
                                                            name="prodi">
                                                            @foreach ($prodi as $item)
                                                                <option value="{{ $item->id }}">
                                                                    {{ $item->prodi }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                        @error('prodi')
                                                            <span class="invalid-feedback" role="alert">
                                                                <strong>{{ $message }}</strong>
                                                            </span>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label">Total Responden</label>
                                                        <input type="text"
                                                            class="form-control total @error('total') is-invalid @enderror"
                                                            name="total">
                                                        @error('total')
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
                                                        <label class="form-label">Template </label>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary addtemplate"
                                                                    id="addtemplate">Input Ke Eratan</button>
                                                            </div>
                                                        </div>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary addtemplate"
                                                                    id="addtemplatemhs">Input Template Geografis </button>
                                                            </div>
                                                        </div>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary addtemplate"
                                                                    id="addtemplatekebaikan">Input Template Kebaikan
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="input-group" style="margin-bottom: 30px">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary addtemplate"
                                                                    id="addtemplatewaktu">Input Template Waktu
                                                                </button>
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
                                <th>Deskripsi</th>
                                <th>Sub Aspek</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($kat_tracer as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->aspek }}</td>
                                    <td>
                                        @php
                                            $potongan_teks = substr($item->deskripsi, 0, 20) . '...';
                                        @endphp
                                        {{ $potongan_teks }}
                                    </td>
                                    <td>
                                        <a href="" class="btn btn-sm btn-outline-success buutonsubaspek"
                                            data-toggle="modal" data-target="#subaspek"
                                            data-id-sub="{{ $item->id }}"
                                            data-url-sub="{{ route('sub.tracer.store') }}">
                                            Tambah Sub Aspek
                                        </a>
                                        <br>
                                        <ul>
                                            @foreach ($item->tracer as $sub)
                                                <li>Program Studi : {{ $sub->prodi->prodi }}</li>
                                                <li>Tahun : {{ $sub->tahun->tahun }}</li>
                                                <li>total : {{ $sub->total }}</li>
                                                <li> Isi :<br>
                                                    <ul>
                                                        @foreach (json_decode($sub->isi) as $key => $value)
                                                            <li>
                                                                {{ $key }} = {{ $value }}
                                                                <br />
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                    <form action="{{ route('sub.tracer.destroy', $sub->id) }}"
                                                        method="post">
                                                        <a href=""
                                                            class="btn btn-sm btn-outline-success editsubaspek"
                                                            data-toggle="modal" data-target="#subaspek"
                                                            data-tahun-sub="{{ $sub->tahun_id }}"
                                                            data-prodi-sub="{{ $sub->prodi_id }}"
                                                            data-id-sub="{{ $item->id }}"
                                                            data-isisub="{{ $sub->isi }}"
                                                            data-add-total-edit="{{ $sub->total }}""
                                                            data-url-sub="{{ route('sub.tracer.update', $sub->id) }}">
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
                                        <form action="{{ route('kat.tracer.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal"
                                                data-aspek="{{ $item->aspek }}" data-deskripsi="{{ $item->deskripsi }}"
                                                data-tahun="{{ $item->tahun_id }}"
                                                data-url="{{ route('kat.tracer.update', $item->id) }}">
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
                                <th>Deskripsi</th>
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
                var data_prodi_sub = $(this).attr('data-prodi-sub');
                var data_id_sub = $(this).attr('data-id-sub');
                var data_url_sub = $(this).attr('data-url-sub');
                var data_isisub = $(this).attr('data-isisub');
                console.log(data_id_sub);
                $('.id_sub').attr('value', data_id_sub);
                $('.tahun').val(data_tahun_sub);
                $('.prodi').val(data_prodi_sub);
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
                var inputsts = "Sangat Erat";
                var inputts = "Erat";
                var inputas = "Cukup Erat";
                var inputs = "Kurang Erat";


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
            $('#addtemplatemhs').click(function() {
                var inputsts = "Lokal/Wilayah";
                var inputts = "Nasional";
                var inputas = "Multinasional/Internasional";
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

            $('#addtemplatewaktu').click(function() {
                var inputsts = "Kurang dari 3 bulan";
                var inputts = "Kurang dari 6 bulan";
                var inputas = "Lebih dari 6 bulan";
                var inputs = "Lebih dari 1 tahun";

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
            $('#addtemplatekebaikan').click(function() {
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
            var data_deskripsi = $(this).attr('data-deskripsi');

            $('.aspek').attr('value', data_aspek);
            $('.deskripsi').val(data_deskripsi);
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
