@extends('layouts.user')

@section('style')

@endsection

@section('conten')
    <!-- ======= Blog Section ======= -->

    <!-- End Team Section -->
    <section id="blog" class="blog">
        <div class="container" data-aos="fade-up" style="margin-top: 100px">
            <div class="row">
                <div class="col-lg-12 entries">
                    <section id="team" class="team">
                        <div class="container" data-aos="fade-up">
                            <div class="section-title">
                                <h2>{{ $informasi->judul }}</h2>
                            </div>

                            <div class="row">
                                <div class="col-lg-12" style="margin-top: 50px">
                                    {!! $informasi->header !!}
                                </div>
                                <div class="col-lg-12" style="margin-top: 50px">
                                    {!! $informasi->isi !!}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <!-- End blog entries list -->
            </div>
        </div>
    </section>
    <!-- End Blog Section -->
@endsection

@section('script')
@endsection
