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
                        <button type="button" class="btn btn-primary buttonadd" data-toggle="modal" data-target="#myModal"
                            data-prodi="" data-id="" data-url="{{ route('prodi.store') }}">
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
                                <form action="{{ route('akun.store') }}" method="post" class="formkirim">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf
                                                    <div class="row mb-3">
                                                        <label for="name"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>

                                                        <div class="col-md-6">
                                                            <input id="name" type="text"
                                                                class="form-control @error('name') is-invalid @enderror"
                                                                name="name" value="{{ old('name') }}" required
                                                                autocomplete="name" autofocus>

                                                            @error('name')
                                                                <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="email"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('Email') }}</label>

                                                        <div class="col-md-6">
                                                            <input id="email" type="email"
                                                                class="form-control @error('email') is-invalid @enderror"
                                                                name="email" value="{{ old('email') }}" required
                                                                autocomplete="email">

                                                            @error('email')
                                                                <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="password"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                                                        <div class="col-md-6">
                                                            <input id="password" type="password"
                                                                class="form-control @error('password') is-invalid @enderror"
                                                                name="password" required autocomplete="new-password">

                                                            @error('password')
                                                                <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="password-confirm"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

                                                        <div class="col-md-6">
                                                            <input id="password-confirm" type="password"
                                                                class="form-control" name="password_confirmation" required
                                                                autocomplete="new-password">
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="role"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('role') }}</label>

                                                        <div class="col-md-6">
                                                            <select name="role" class="form-control" id="exampleSelect">
                                                                <option value="admin">Admin</option>
                                                                <option value="verifikator">verifikator</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="row mb-0">
                                                        <div class="col-md-6 offset-md-4">
                                                            <button type="submit" class="btn btn-primary">
                                                                {{ __('Register') }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="id" class="id">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="myCheckbox"
                                                name="profile" value="1">
                                            <label class="form-check-label" for="myCheckbox">Check jika ingin di buatkan
                                                Profile dosen</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="pass" tabindex="-1" aria-labelledby="pass" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="pass">Ubah Password</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="" method="post" class="formpass">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf

                                                    <div class="row mb-3">
                                                        <label for="password"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                                                        <div class="col-md-6">
                                                            <input id="password" type="password"
                                                                class="form-control @error('password') is-invalid @enderror"
                                                                name="password" required autocomplete="new-password">

                                                            @error('password')
                                                                <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <label for="password-confirm"
                                                            class="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

                                                        <div class="col-md-6">
                                                            <input id="password-confirm" type="password"
                                                                class="form-control" name="password_confirmation" required
                                                                autocomplete="new-password">
                                                        </div>
                                                    </div>

                                                    <input type="hidden" name="redirect" value="akun">
                                                    <div class="row mb-0">
                                                        <div class="col-md-6 offset-md-4">
                                                            <button type="submit" class="btn btn-primary">
                                                                {{ __('Confirm') }}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="id" class="id">
                                                </div>
                                            </div>
                                        </div>
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
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($user as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>
                                        <div class="myContainer">
                                            <div class="myDiv" data-id="{{ $item->id }}" data-send="name">
                                                {{ $item->name }}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="myContainer">
                                            <div class="myDiv" data-send="email">{{ $item->email }}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {{-- {{ Auth::user()->role }} --}}
                                        <select class="inputRole form-control" id="inputRole" name="role"
                                            data-id="{{ $item->id }}">
                                            <option value="admin" @if ($item->role == 'admin') selected @endif>Admin
                                            </option>
                                            <option value="verifikator" @if ($item->role == 'verifikator') selected @endif>
                                                verifikator
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <form action="{{ route('akun.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-url="{{ route('change.password', $item->id) }}"
                                                data-target="#pass">
                                                Ubah Password
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
                                <th>Email</th>
                                <th>Role</th>
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



            $('.inputRole').change(function() {
                var data_id = $(this).attr('data-id');
                var selectedValue = $(this).val();
                var _token = $('input[name="_token"]').val();
                var formData = new FormData();
                formData.append('id', data_id);
                formData.append('jenis', 'role');
                formData.append('input', selectedValue);
                formData.append('_token', _token);
                console.log(formData);
                console.log('Nilai yang dipilih:', selectedValue);

                $.ajax({
                    url: '{{ route('akun.update') }}',
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
            $(document).on('dblclick', '.myDiv', function() {
                var data_id = $(this).attr('data-id');
                var data_send = $(this).attr('data-send');
                var divText = $(this).text();
                var inputElement = $('<input name="edit" type="text" data-id="' + data_id +
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
                        '">')
                    .addClass('myDiv').text(
                        inputText);
                $(this).replaceWith(divElement);
                var _token = $('input[name="_token"]').val();
                var formData = new FormData();
                formData.append('id', data_id);
                formData.append('jenis', data_send);
                formData.append('input', inputText);
                formData.append('_token', _token);
                console.log(formData);

                $.ajax({
                    url: '{{ route('akun.update') }}',
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
            var data_url = $(this).attr('data-url');
            $('.formpass').attr('action', data_url);
        });
    </script>
@endsection
