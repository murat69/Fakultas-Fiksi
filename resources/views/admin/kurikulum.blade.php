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
                         <button type="button" class="btn btn-primary buttonedit" data-toggle="modal"
                             data-target="#myModal" data-id="" data-url="{{ route('kurikulum.store') }}"
                             data-semester="" data-prodi="" data-matkul="">
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
                                 <div class="modal-body">
                                     <div class="container">
                                         <div class="row justify-content-center">
                                             <div class="col-md-12">

                                                 @csrf
                                                 <div class="mb-3">
                                                     <label class="form-label">Semester</label>
                                                     <input type="number"
                                                         class="form-control semester @error('semester') is-invalid @enderror"
                                                         name="semester" id="semester" min="1" max="8">
                                                     @error('semester')
                                                         <span class="invalid-feedback" role="alert">
                                                             <strong>{{ $message }}</strong>
                                                         </span>
                                                     @enderror
                                                 </div>

                                                 <div class="input-group mb-3">
                                                     <div class="form-group">
                                                         <label for="tagsInput">Mata kuliah :</label>
                                                         <div class="input-group">
                                                             <input type="text" class="form-control" id="tagsInput"
                                                                 placeholder="Tambahkan tags">
                                                         </div>
                                                     </div>
                                                     <div class="form-group">
                                                         <label for="selectedTags">Mata kuliah yang dipilih:</label>
                                                         <input type="hidden" id="selectedTags">
                                                         <div id="selectedTagsContainer"></div>
                                                     </div>

                                                 </div>


                                                 <div class="mb-3">
                                                     <label class="form-label">Program Studi</label>
                                                     <select class="form-control prodi @error('prodi') is-invalid @enderror"
                                                         name="prodi" id="prodi">
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

                                                 <input type="hidden" class="url">
                                                 <input type="hidden" class="id">

                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="modal-footer">
                                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                     <button class="btn btn-primary" type="submit" id="saveButton">Kirim</button>
                                 </div>

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
                                 <th>Semster</th>
                                 <th>Prodi</th>
                                 <th>Mata Kuliah</th>
                                 <th>Action</th>
                             </tr>
                         </thead>
                         <tbody>
                             @php
                                 $no = 1;
                             @endphp
                             @foreach ($kurikulum as $item)
                                 <tr>
                                     <td>{{ $no }}</td>
                                     <td>{{ $item->semester }}</td>
                                     <td>{{ @$item->prodi->prodi }}</td>
                                     <td>
                                         <ul>
                                             @foreach (json_decode($item->matkul) as $matkul)
                                                 <li>{{ $matkul }}</li>
                                             @endforeach
                                         </ul>
                                     </td>
                                     <td>
                                         <form action="{{ route('aspek.destroy', $item->id) }}" method="post">
                                             @csrf
                                             @method('delete')
                                             <a href="" class="btn btn-sm btn-outline-success buttonedit"
                                                 data-toggle="modal" data-target="#myModal"
                                                 data-semester="{{ $item->semester }}" data-prodi="{{ $item->prodi_id }}"
                                                 data-matkul="{{ $item->matkul }}"
                                                 data-url="{{ route('kurikulum.update') }}" data-id="{{ $item->id }}">
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
                                 <th>Semster</th>
                                 <th>Prodi</th>
                                 <th>Mata Kuliah</th>
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
             var selectedTags = [];
             $(document).on('click', '.buttonedit', function() {
                 selectedTags = [];
                 var data_semester = $(this).attr('data-semester');
                 var data_prodi = $(this).attr('data-prodi');
                 var data_url = $(this).attr('data-url');
                 if ($(this).attr('data-matkul') !== "") {
                     var data_matkul = JSON.parse($(this).attr('data-matkul'));
                     for (var i = 0; i < data_matkul.length; i++) {
                         selectedTags.push(data_matkul[i]);
                         
                     }
                 }
                 var data_id = $(this).attr('data-id');
                 updateSelectedTags();


                 $('.semester').attr('value', data_semester);
                 $('.id').attr('value', data_id);
                 $('.prodi').val(data_prodi);
                 $('.matkul').attr('value', data_matkul);
                 $('.url').attr('value', data_url);


             });


             // Tambahkan tag saat tombol Enter ditekan
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

             // Fungsi untuk memperbarui tags yang dipilih
             function updateSelectedTags() {
                 var tagsHTML = "";
                 for (var i = 0; i < selectedTags.length; i++) {
                     tagsHTML += '<span class="badge badge-primary mr-1">' + selectedTags[i] +
                         '<span class="tag-close" data-index="' + i + '">&times;</span></span>';
                 }
                 $("#selectedTagsContainer").html(tagsHTML);
                 $("#selectedTags").val(JSON.stringify(selectedTags));
             }

             function saveTagsToDatabase() {
                 var url = $(".url").val();
                 var tags = $("#selectedTags").val();
                 var semester = $("#semester").val();
                 var prodi = $("#prodi").val();
                 var id = $(".id").val();
                 console.log(url);
                 $.ajax({
                     url: url, // Ganti dengan endpoint yang sesuai di Laravel
                     type: "POST",
                     dataType: "json",
                     data: {
                         tags: tags,
                         semester: semester,
                         prodi: prodi,
                         id: id,
                         _token: $('input[name="_token"]').val()
                     },
                     success: function(data) {
                        location.reload();
                     },
                     error: function(xhr, status, error) {
                         console.log("Terjadi kesalahan: " + error);
                     }
                 });
             }
             $("#saveButton").click(function() {
                 saveTagsToDatabase();
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




         $(function() {
             bsCustomFileInput.init();
         });
     </script>
 @endsection
