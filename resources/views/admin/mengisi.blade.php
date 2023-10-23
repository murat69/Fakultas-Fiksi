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
                @foreach ($tahun as $item)
                    @if ($item->tahun == $tahuns)
                        <input type="hidden" value="{{ $item->id }}" name="id_tahun" class="id_tahun">
                    @endif
                @endforeach
                @foreach ($monev as $item)
                    @if ($item->nama == $monevs)
                        <input type="hidden" value="{{ $item->id }}" name="id_monev" class="id_monev">
                    @endif
                @endforeach
                <div class="card-header">
                    <!-- Button trigger modal -->
                    <div class="col-md-8" style="margin-top: 10px; margin-bottom: 10px;">
                        <div class="row justify-content-center">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label class="form-label">Tahun</label>
                                    <select class="form-control tahun @error('tahun') is-invalid @enderror" name="tahun">
                                        @foreach ($tahun as $item)
                                            @if ($item->tahun == $tahuns)
                                                {{ $item->tahun }}
                                            @endif
                                            <option value="{{ $item->tahun }}"
                                                @if ($tahuns == $item->tahun) selected @endif>
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
                                    <label class="form-label">Monev</label>
                                    <select class="form-control monev @error('monev') is-invalid @enderror" name="monev">
                                        @foreach ($monev as $item)
                                            <option value="{{ $item->nama }}"
                                                @if ($monevs == $item->nama) selected @endif>
                                                {{ $item->nama }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('monev')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <a class="btn btn-primary buttonajax">
                                    Cari Data
                                </a>
                            </div>
                        </div>
                        @error('value')
                            <span class="alert alert-danger" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                </div>

                <!-- /.card-header -->
                <div class="card-body">
                    <h3>{{ @$monevs . ' ' . @$tahuns }}</h3>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header p-2">
                                <ul class="nav nav-pills">
                                    @foreach ($aspek as $item)
                                        <li class="nav-item">
                                            <a class="nav-link " href="#activity{{ $item->id }}"
                                                data-toggle="tab">{{ $item->aspek }}</a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content">
                                    @foreach ($aspek as $key => $item)
                                        @php
                                            $total = 0;
                                        @endphp
                                        <div class="tab-pane" id="activity{{ $item->id }}">
                                            <!-- Post -->
                                            <h4>{{ $item->aspek }} </h4>

                                            @foreach ($form as $items)
                                                @if ($items->aspek_monev_id == $item->id)
                                                    @if ($items->total_sub)
                                                        @php $total = $items->total_sub; @endphp
                                                        <div class="form-group row">
                                                            <label for="inputEmail3"
                                                                class="col-sm-1 col-form-label">Total</label>
                                                            <div class="col-sm-1">
                                                                <input type="text" name="total{{ @$items->id_sub }}"
                                                                    class="form-control" value="{{ @$items->total_sub }}">
                                                            </div>
                                                        </div>
                                                    @else
                                                        @php $total = 0; @endphp
                                                        <div class="form-group row">
                                                            <label for="inputEmail3"
                                                                class="col-sm-1 col-form-label">Total</label>
                                                            <div class="col-sm-1">
                                                                <input type="text" name="total{{ @$items->id }}"
                                                                    class="form-control" value="">
                                                            </div>
                                                        </div>
                                                    @endif
                                                    <div class="post">

                                                        <ul>
                                                            <li>

                                                                {{ $items->nama }}

                                                                <div class="row">
                                                                    <div class="col-md-12">

                                                                        <div class="row" id="input-container"
                                                                            class="add-item">
                                                                            @if ($items->isi_sub)
                                                                                @php
                                                                                    $isi = $items->isi_sub;
                                                                                @endphp
                                                                            @else
                                                                                @php
                                                                                    $isi = $items->isi;
                                                                                @endphp
                                                                            @endif
                                                                            @foreach (json_decode($isi) as $key => $value)
                                                                                <div class="col-md-2"
                                                                                    style="margin-bottom: 10px">
                                                                                    <input type="text" name="item[]"
                                                                                        class="form-control @if ($items->isi_sub) input{{ $items->id_sub }} @else input{{ $items->id }} @endif "
                                                                                        value="{{ $key }}"
                                                                                        readonly>
                                                                                    <input type="text" name="value[]"
                                                                                        class="form-control  @if ($items->isi_sub) value{{ $items->id_sub }} @else value{{ $items->id }} @endif"
                                                                                        value="{{ $value }}">
                                                                                    @if ($items->flag == 1)
                                                                                        <button type="button"
                                                                                            class="btn btn-danger btn-sm mt-2 delete-row">Hapus</button>
                                                                                    @endif
                                                                                </div>
                                                                            @endforeach
                                                                        </div>
                                                                        @if ($items->flag == 1)
                                                                            <button type="button"
                                                                                class="btn btn-primary btn-sm mt-2 add-input"
                                                                                @if ($items->id_sub) data_id_aspek="{{ $items->id_sub }}"
                                                                            @else
                                                                            data_id_aspek="{{ $items->id }}" @endif
                                                                                id="add-input">Tambah</button>
                                                                        @endif
                                                                        <button type="button"
                                                                            class="btn btn-primary btn-sm mt-2 simpan"
                                                                            @if ($items->id_sub) data_sub_aspek="{{ $items->id_sub }}"
                                                                            @else
                                                                            data_sub_aspek="0" @endif
                                                                            data_id_template="{{ $items->id }}"
                                                                            data_id_aspek="{{ $item->id }}"
                                                                            nama_aspek="{{ $items->nama }}"
                                                                            data_flag="{{ $items->flag }}"
                                                                            id="add-input">Simpan</button>
                                                                        <!-- /.card-body -->
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                @endif
                                            @endforeach
                                            <!-- /.post -->

                                            <!-- /.post -->
                                        </div>
                                    @endforeach
                                </div>
                                <!-- /.tab-content -->
                            </div><!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>

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
            // Menambahkan input baru di dalam input-container terdekat
            function addInputToContainer(container, id) {
                var newInput = `
                <div class="col-md-2" style="margin-bottom: 10px">
                    <input type="text" name="item[]" class="form-control input${id}" placeholder="Item" >
                    <input type="number" name="value[]" class="form-control value${id}" placeholder="Value">
                    <button type="button" class="btn btn-danger btn-sm mt-2 delete-row">Hapus</button>
                </div>
            `;
                container.append(newInput);
            }

            // Menambahkan event listener pada tombol "Tambah"
            $('.add-input').on('click', function() {
                var inputContainer = $(this).closest('.col-md-12').find('#input-container');
                var id = $(this).attr('data_id_aspek');
                console.log(id);
                addInputToContainer(inputContainer, id);
            });

            // Event listener untuk tombol "Hapus"
            $(document).on('click', '.delete-row', function() {
                $(this).closest('.col-md-2').remove();
            });

            $(document).on('click', '.delete-row', function() {
                $(this).closest('.col-md-2').remove();
            });

            // Memanggil fungsi sendDataToServer() ketika nilai pada select box berubah
            $(document).on('click', '.buttonajax', function() {

                var selectedTahun = $('.tahun').val();
                var selectedMonev = $('.monev').val();
                var newURL =
                    "{{ route('admin.monev.mengisi', ['tahuns' => ':tahun', 'monevs' => ':monev']) }}";
                newURL = newURL.replace(':tahun', selectedTahun);
                newURL = newURL.replace(':monev', selectedMonev);
                $('.buttonajax').attr('href', newURL);
            });

            $(document).on('click', '.simpan', function() {
                var jsonData = {};
                var id = $(this).attr('data_id_aspek');
                var id_sub = $(this).attr('data_sub_aspek');
                var id_template = $(this).attr('data_id_template');
                var nama_aspek = $(this).attr('nama_aspek');
                var flag = $(this).attr('data_flag');
                var totalvalue = 0;

                if (id_sub == 0) {
                    $('.input' + id_template).each(function(index) {
                        var itemName = $(this).val();

                        var valueInput = $('.value' + id_template).eq(index);
                        console.log('.value' + id_template);

                        var itemValue = valueInput.val();
                        if (itemValue == '') {
                            itemValue == 0
                        }
                        if (itemName) {
                            jsonData[itemName] = itemValue;
                        }

                        totalvalue += parseInt(itemValue);
                    });
                } else {
                    $('.input' + id_sub).each(function(index) {
                        var itemName = $(this).val();

                        var valueInput = $('.value' + id_sub).eq(index);
                        console.log('.value' + id_sub);

                        var itemValue = valueInput.val();
                        if (itemValue == '') {
                            itemValue == 0
                        }
                        if (itemName) {
                            jsonData[itemName] = itemValue;
                        }

                        totalvalue += parseInt(itemValue);
                    });
                }

                var tahun_id = $('.id_tahun').val();
                var monev_id = $('.id_monev').val();

                var jsonResult = JSON.stringify(jsonData);
                var csrfToken = '{{ csrf_token() }}';

                console.log('Data JSON:', jsonResult);
                // Lakukan sesuatu dengan jsonResult, seperti mengirimkan ke server, dst.
                if (id_sub == 0) {
                    var total = $('input[name="total' + id_template + '"]').val();
                } else {
                    var total = $('input[name="total' + id_sub + '"]').val();
                }


                console.log("Total" + total + "||Tahun id " + tahun_id + "||Id Sub " + id_sub +
                    "||JSON DATA" + jsonData + "||Total value", totalvalue);


                if (total == '') {
                    alert('Tolong masukan total');
                } else if (totalvalue > total) {
                    alert('Data Sudah Melebihi batas total');
                } else {
                    $.ajax({
                        url: '{{ route('monev.ajax') }}', // Ganti dengan URL yang sesuai
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            _token: csrfToken, // Mengirimkan CSRF Token dalam permintaan
                            id: id,
                            id_sub: id_sub,
                            flag: flag,
                            id_template: id_template,
                            total: total,
                            totalvalue: totalvalue,
                            tahun_id: tahun_id,
                            monev_id: monev_id,
                            nama_aspek: nama_aspek,
                            json_data: jsonData
                        },
                        success: function(response) {
                            // Proses respons dari server setelah permintaan berhasil
                            console.log(response);
                            if (response.success == true) {
                                alert('Data berhasil Di input');
                            }
                        },
                        error: function(error) {
                            // Proses jika terjadi error
                        }
                    });
                }


            });

        });



        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
