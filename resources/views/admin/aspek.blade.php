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
                         <button type="button" class="btn btn-primary buttonadd" data-toggle="modal" data-target="#myModal"
                             data-prodi="" data-id="" data-url="{{ route('aspek.store') }}">
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
                                 <form action="{{ route('aspek.store') }}" method="post" class="formkirim"
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
                                                         <label class="form-label">Persenan</label>
                                                         <input type="range" class="range custom-range" id="customRange1"
                                                             name="range" min="0" max="100" step="1"
                                                             value="50">
                                                         <label for="customRange1"><span id="rangeValue">50</span>%</label>
                                                         @error('range')
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
                                 <th>Prodi</th>
                                 <th>Persenan</th>
                                 <th>Action</th>
                             </tr>
                         </thead>
                         <tbody>
                             @php
                                 $no = 1;
                             @endphp
                             @foreach ($aspek as $item)
                                 <tr>
                                     <td>{{ $no }}</td>
                                     <td>{{ $item->aspek }}</td>
                                     <td>{{ @$item->prodi->prodi }}</td>
                                     <td>{{ $item->persenan . '%' }}</td>
                                     <td>
                                         <form action="{{ route('aspek.destroy', $item->id) }}" method="post">
                                             @csrf
                                             @method('delete')
                                             <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                 data-toggle="modal" data-target="#myModal"
                                                 data-aspek="{{ $item->aspek }}" data-prodi="{{ $item->prodi_id }}"
                                                 data-persenan="{{ $item->persenan }}"
                                                 data-url="{{ route('aspek.update', $item->id) }}">
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
                                 <th>Prodi</th>
                                 <th>Persenan</th>
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
         var rangeInput = document.getElementById('customRange1');
         var rangeValue = document.getElementById('rangeValue');

         rangeInput.addEventListener('input', function() {
             rangeValue.textContent = rangeInput.value;
         });
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
             var data_aspek = $(this).attr('data-aspek');
             var data_prodi = $(this).attr('data-prodi');
             var data_url = $(this).attr('data-url');
             var data_persenan = $(this).attr('data-persenan');
             var rangeInput = document.getElementById('customRange1');
             var rangeValue = document.getElementById('rangeValue');
             $('.aspek').attr('value', data_aspek);
             $('.prodi').val(data_prodi);
             $('.range').attr('value', data_persenan);
             $('.formkirim').attr('action', data_url);
             rangeValue.textContent = data_persenan;

         });

         $(function() {
             bsCustomFileInput.init();
         });
     </script>
 @endsection
