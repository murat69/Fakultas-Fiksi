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
                            data-prodi="" data-id="" data-url="{{ route('milestone.store') }}">
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
                                <form action="{{ route('milestone.store') }}" method="post" class="formkirim"
                                    enctype="multipart/form-data">
                                    <div class="modal-body">

                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-12">

                                                    @csrf
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
                                                        <label class="form-label">Aspek</label>
                                                        <div class="input-group">
                                                            <input type="text" name="" class="form-control"
                                                                id="input-judul">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-primary"
                                                                    id="add-button">Tambah Aspek</button>
                                                            </div>
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
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                        <button class="btn btn-primary" type="submit">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="modal
                            fade" id="editaspek" tabindex="-1"
                        aria-labelledby="editaspek" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editaspek">Edit aspek</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form action="{{ route('milestone.store') }}" method="post" class="formsend"
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




                                                    <div class="input-group mb-3">
                                                        <div class="form-group">
                                                            <label for="tagsInput">Item :</label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" id="tagsInput"
                                                                    placeholder="Tambahkan tags">
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="form-group">
                                                            <label for="selectedTags">Item yang dipilih:</label>
                                                            <input type="hidden" name="item" id="selectedTags">
                                                            <div id="selectedTagsContainer"></div>
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
                                <th>Judul</th>
                                <th>Renstra Aspek & Item</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php
                                $no = 1;
                            @endphp
                            @foreach ($milestone as $item)
                                <tr>
                                    <td>{{ $no }}</td>
                                    <td>{{ $item->judul }}</td>
                                    <td>

                                        <div class="card-body">
                                            <ul class="list-group">
                                                @foreach ($item->item_milestone as $aspek)
                                                    <li style="display: flex">
                                                        <form action="{{ route('aspek-milstone.destroy', $aspek->id) }}"
                                                            method="post">
                                                            @csrf
                                                            @method('delete')
                                                            <a href=""
                                                                class="btn btn-sm btn-outline-success ediitaspek"
                                                                data-toggle="modal" data-target="#editaspek"
                                                                data-id-aspek={{ $aspek->id }}
                                                                data-aspek={{ $aspek->aspek }}
                                                                data-item="{{ $aspek->list_milestone }}"
                                                                data-url-aspek="{{ route('aspek-milstone.update', $aspek->id) }}">
                                                                <i class="fas fa-pencil-alt"></i>
                                                            </a> |
                                                            <button type="submit" class="btn btn-sm btn-outline-danger"
                                                                onclick="return confirm('Apakah Anda Yakin?')"><i
                                                                    class="fas fa-trash"></i>
                                                            </button>
                                                        </form>
                                                        <a>{{ $aspek->aspek }}</a>

                                                        <ul>
                                                            @if ($aspek->list_milestone != null)
                                                                @foreach (json_decode($aspek->list_milestone) as $matkul)
                                                                    <li>{{ $matkul }}</li>
                                                                @endforeach
                                                            @endif
                                                        </ul>
                                                    </li>
                                                    <hr>
                                                @endforeach
                                            </ul>
                                        </div>

                                    </td>
                                    <td>
                                        <form action="{{ route('milestone.destroy', $item->id) }}" method="post">
                                            @csrf
                                            @method('delete')
                                            <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                data-toggle="modal" data-target="#myModal"
                                                data-judul="{{ $item->judul }}"
                                                data-url="{{ route('milestone.update', $item->id) }}">
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
                                <th>Restra Aspek & Item</th>
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
                var inputValue2 = $('#input-judul').val();
                if (inputValue2 !== '') {
                    var newInput2 = $('<input type="text" name="aspek[]" class="form-control">').val(
                        inputValue2).prop(
                        'readonly', true);
                    $('#output-container').append(newInput2);
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

        var selectedTags = [];

        $(document).on('click', '.ediitaspek', function() {
            console.log($(this).attr('data-item'));

            selectedTags = [];

            if ($(this).attr('data-item') !== "") {
                var data_item = JSON.parse($(this).attr('data-item'));
                for (var i = 0; i < data_item.length; i++) {
                    selectedTags.push(data_item[i]);
                    console.log(selectedTags);
                }
            }

            var data_url = $(this).attr('data-url-aspek');
            var data_aspek = $(this).attr('data-aspek');
            $('.aspek').attr('value', data_aspek);
            $('.formsend').attr('action', data_url);
            updateSelectedTags();

        });

        $("#tagsInput").keypress(function(event) {
            if (event.which === 13) {
                event.preventDefault();
                var tag = $("#tagsInput").val().trim();
                if (tag !== "") {
                    selectedTags.push(tag);
                    updateSelectedTags();
                    $("#tagsInput").val("");
                }
            }
        });

        // Tambahkan tag saat input kehilangan fokus (blur)
        $("#tagsInput").blur(function() {
            var tag = $("#tagsInput").val().trim();
            if (tag !== "") {
                selectedTags.push(tag);
                updateSelectedTags();
                $("#tagsInput").val("");
                console.log(selectedTags);
            }
        });
        // Hapus tag saat tombol "X" pada tag dipilih ditekan
        $(document).on("click", ".tag-close", function() {
            var tagIndex = $(this).data("index");
            selectedTags.splice(tagIndex, 1);
            updateSelectedTags();
            console.log(selectedTags);
        });

        function updateSelectedTags() {
            var tagsHTML = "";
            for (var i = 0; i < selectedTags.length; i++) {
                 if (selectedTags[i].length > 20) {
    // Potong teks dan tambahkan "..."
    var muncul = selectedTags[i].substring(0, 20) + "...";
  }else{
      var muncul = selectedTags[i];
  }
                tagsHTML += '<span class="badge badge-primary mr-1">' + muncul +
                    '<span class="tag-close" data-index="' + i + '">&times;</span></span>';
            }
            $("#selectedTagsContainer").html(tagsHTML);
            $("#selectedTags").val(JSON.stringify(selectedTags));
        }
        $(document).on('click', '.buttonedit', function() {
            $('#output-container').empty();
            var data_url = $(this).attr('data-url');
            var data_judul = $(this).attr('data-judul');

            $('.judul').attr('value', data_judul);
            $('.formkirim').attr('action', data_url);
        });

        $(function() {
            bsCustomFileInput.init();
        });
    </script>
@endsection
