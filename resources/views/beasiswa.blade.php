@extends('layouts.user')

@section('styles')
@endsection

@section('conten')
    <section id="blog" class="blog">
        <div class="container" data-aos="fade-up" style="margin-top: 100px">
            <div class="row">
                <div class="col-lg-12">
                    <ul id="portfolio-flters">
                        <li data-filter="*" class="filter-active">All</li>
                        <li data-filter=".filter-beasiswa">Beasiswa</li>
                        <li data-filter=".filter-karir">Karir</li>
                    </ul>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 entries">
                    <section id="team" class="team portfolio-container" style="padding: 0 !important">
                        <div class="row">
                            @foreach ($informasi as $item)
                                <div class="col-lg-6 mt-4 portfolio-item filter-{{ $item->status }}">
                                    <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
                                        <div class="member-info">
                                            <h4><a href="{{route('beasiswa.full', $item->id)}}">{{ $item->judul }}</a></h4>
                                            <span>{{ $item->created_at->formatLocalized(' %e %B, %Y') }} || {{ $item->status }}</span>
                                            <p>
                                                {{ Str::limit($item->header, 100, '...') }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </section>
                </div>
                <!-- End blog entries list -->
                <!-- End blog sidebar -->
            </div>
        </div>
    </section>
@endsection
