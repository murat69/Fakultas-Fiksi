@extends('layouts.user')

@section('style')
@endsection

@section('conten')
    <!-- ======= Blog Section ======= -->
    <section id="blog" class="blog">
        <div class="container" data-aos="fade-up" style="margin-top: 100px">
            <div class="row">
                <div class="col-lg-8 entries">
                    <section id="team" class="team">
                        <div class="row">

                            @foreach ($berita as $item)
                                <div class="col-lg-12" style="margin-bottom: 30px; overflow:hidden">
                                    <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100"
                                        style="max-height: 300px; min-height: 300px; overflow: hidden;">
                                        <div class="pic">
                                            <img src="{{ asset('storage/upload/file/berita/thumbnail/' . $item->thumbnail) }}"
                                                class="img-fluid" alt="" />
                                        </div>
                                        <div class="member-info">
                                            @php
                                                $slug = enc($item->id) . '-' . $item->slug;
                                            @endphp
                                            <a href="{{ route('news.full', $slug) }}">
                                                <h4> {{ $item->judul }}</h4>
                                            </a>
                                            <span>{{ \Carbon\Carbon::parse($item->tanggal)->formatLocalized('%e %B %Y') }}</span>
                                            <p>
                                                {!! Str::limit($item->header, 100, '...') !!}
                                            </p>
                                            <div class="social">
                                                <p>{{ $item->prodi->prodi }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </section>
                </div>
                <!-- End blog entries list -->

                <div class="col-lg-4">
                    <div class="sidebar">
                        <h3 class="sidebar-title">Search</h3>
                        <div class="sidebar-item search-form">
                            <form action="{{ route('news.cari') }}" method="POST">
                                @csrf
                                <input type="text" name="cari" />
                                <button type="submit"><i class="bi bi-search"></i></button>
                            </form>
                        </div>
                        <!-- End sidebar search formn-->

                        <h3 class="sidebar-title">Program Studi</h3>
                        <div class="sidebar-item categories">
                            <ul>
                                @foreach ($prodi as $prog)
                                    <form action="{{ route('news.cari') }}" method="POST">
                                        <li>
                                            @csrf
                                            @if ($prog->prodi == 'Teknik Lingkungan')
                                                <input type="hidden" name="cari" value="Teknik Lingkungan">
                                            @elseif($prog->prodi == 'Arsitektur')
                                                <input type="hidden" name="cari" value="Arsitektur">
                                            @endif
                                            <button type="submit">{{ $prog->prodi }}
                                                <span>
                                                    (@if ($prog->prodi == 'Teknik Lingkungan')
                                                        {{ @$tekling }}
                                                    @elseif($prog->prodi == 'Arsitektur')
                                                        {{ @$ars }}
                                                    @endif)
                                                </span></button>

                                        </li>
                                    </form>
                                @endforeach
                            </ul>
                        </div>
                        <!-- End sidebar categories-->

                        <h3 class="sidebar-title">Recent Posts</h3>
                        <div class="sidebar-item recent-posts">

                            @foreach ($terbaru as $baru)
                                @php
                                    $slug = enc($baru->id) . '-' . $baru->slug;
                                @endphp
                                <div class="post-item clearfix" style="max-height: 50px; overflow:hidden">
                                    <img src="{{ asset('storage/upload/file/berita/thumbnail/' . $baru->thumbnail) }}"
                                        alt="" />
                                    <h4>

                                        @csrf
                                        <input type="hidden" name="cari" value="{{ $baru->judul }}">
                                        <a href="{{ route('news.full', $slug) }}">{{ $baru->judul }}</a>

                                    </h4>
                                    <time
                                        datetime="2020-01-01">{{ \Carbon\Carbon::parse($baru->tanggal)->formatLocalized('%e %B %Y') }}</time>
                                </div>
                            @endforeach

                        </div>
                        <!-- End sidebar recent posts-->
                        <!-- End sidebar tags-->
                    </div>
                    <!-- End sidebar -->
                </div>
                <!-- End blog sidebar -->
            </div>
        </div>
    </section>
    <!-- End Blog Section -->
@endsection

@section('script')
@endsection
