@extends('layouts.user')

@section('style')
    <style>
        .person-bar {
            align-items: center;

        }

        .person-image {
            position: absolute;
            width: 50px;
            height: 50px;
            float: left;
            border-radius: 50%;
            left: 0;
            right: 0;
            left: -12px;
            top: -12px;
        }

        .person-name {
            font-weight: bold;
            margin-left: 20px
        }
    </style>
@endsection

@section('conten')
    <section id="faq" class="faq section-bg">
        <div class="container" data-aos="fade-up" style="margin-top: 100px">
            <div class="section-title">
                <h2>Riset & Publikasi Ilmiah</h2>
            </div>
            @foreach ($prodi as $item)
                <div class="faq-list">
                    <h1 style="text-align: center; margin-bottom: 30px">
                        Dosen {{ $item->prodi }}
                    </h1>
                    <ul>
                        @foreach ($item->dosen as $dosen)
                            <li data-aos="fade-up" data-aos-delay="100" style="border-radius: ">
                                <a data-bs-toggle="collapse" class="collapse" data-bs-target="#jurnal{{ $dosen->id }}">
                                    <div class="person-bar">
                                        @if ($dosen->file_id !== null)
                                            <img src="{{ asset('storage/upload/file/' . $dosen->file->file) }}"
                                                alt="" class="person-image">
                                        @else
                                            <img src="{{ asset('storage/upload/file/Default_pfp.png') }}" alt=""
                                                class="person-image">
                                        @endif
                                        <span class="person-name">{{ $dosen->nama }}</span>
                                    </div>

                                    <i class="bx bx-chevron-down icon-show"></i>
                                    <i class="bx bx-chevron-up icon-close"></i>
                                </a>
                                <div id="jurnal{{ $dosen->id }}" class="collapse" data-bs-parent=".faq-list">
                                    @if ($dosen->jurnal_link->isEmpty())
                                        <ul>
                                            <li class="list-item">Data kosong</li>
                                        </ul>
                                    @else
                                    <ul style=" margin-top: 2em; list-style: auto; margin-left: 3em;">
                                            @foreach ($dosen->jurnal_link as $jurnal)
                                                <li class="list-item" style="padding: 10px 0; margin-top:0;"><a href="{{ $jurnal->link }}">{{ $jurnal->judul }}</a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach

        </div>
    </section>
@endsection

@section('script')
@endsection
