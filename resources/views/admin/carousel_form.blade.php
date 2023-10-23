@extends('layouts.admin.admin')

@section('styles')
    <!-- summernote -->
    <link rel="stylesheet" href="{{ asset('admin/plugins/summernote/summernote-bs4.min.css') }}">
@endsection

@section('content')
    <div class="row">
        <div class="col-12">
            @include('layouts/flash')
            <div class="card">
                <div class="card-header">
                    <!-- Button trigger modal -->
                    <h3>Form Slider</h3>
                    <!-- Modal -->
                    <div class="modal
                            fade" id="myModal" tabindex="-1" aria-labelledby="myModal"
                        aria-hidden="true">

                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="col-md-6">
                        {{ html()->modelForm($carousel, 'POST', route('carousel.form'))->attribute('enctype', 'multipart/form-data')->open() }}
                        @if ($carousel->id)
                            {{ html()->hidden('id', $id) }}
                        @endif
                        <div class="form-group row">
                            <label for="judul" class="col-sm-2 col-form-label">Judul</label>
                            <div class="col-sm-10">
                                {{ html()->text('judul')->class('form-control')->id('judul') }}
                                @error('judul')
                                    <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="deskripsi" class="col-sm-2 col-form-label">Deskripsi</label>
                            <div class="col-sm-10">
                                {{ html()->textarea('deskription')->class('form-control')->id('deskripsi') }}
                                @error('deskription')
                                    <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="file" class="col-sm-2 col-form-label">File</label>
                            <div class="col-sm-10">
                                @if ($carousel->file)
                                    <img src="{{ asset('files/' . $carousel->file) }}" width="240" class="mb-3" />
                                @endif
                                <div class="col-md-12 row">
                                    {{ html()->file('file')->class('custom-file-input')->id('file')->attribute('accept', 'image/*, video/*') }}
                                    <label class="custom-file-label ml-2" for="file">Choose file...</label>

                                    @error('file')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="jurusan_id" class="col-sm-2 col-form-label">Program Study</label>
                            <div class="col-sm-10">
                                {{ html()->select('jurusan_id', $jurusan)->class('form-control')->id('jurusan_id') }}
                                @error('jurusan_id')
                                    <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="urutan" class="col-sm-2 col-form-label">Urutan</label>
                            <div class="col-sm-10">
                                {{ html()->select('urutan', $option)->class('form-control')->id('urutan') }}
                                @error('urutan')
                                    <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        {{ html()->submit('submit')->class('btn btn-primary') }}

                        {{ html()->closeModelForm() }}
                    </div>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
    </div>
@endsection


@section('scripts')
    <script type="application/javascript">
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });
</script>
@endsection
