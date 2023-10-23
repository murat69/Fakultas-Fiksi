@extends('layouts.user')

@section('conten')
    <!-- ======= Blog Single Section ======= -->
    @foreach ($milestone as $key => $item)
        <section id="milestone" class="{{ $key % 2 == 0 ? 'milestone' : 'milestone2' }}">
            <div class="container" data-aos="fade-up">
                <div class="section-title">
                    <h2>{{ $item->judul }}</h2>
                </div>
                <div class="row">
                    <div class="col-lg-12 entries">
                        <div class="col-md-10 mx-auto">
                            <!-- Timeline -->
                            <div class="timeline timeline-one">
                                <!-- Timeline Item 1 -->
                                @foreach ($item->item_milestone as $index => $aspek)
                                    <div class="timeline-item">
                                        <h5 class="my-3">{{ $aspek->aspek }}</h5>
                                        <ul>
                                            @if ($aspek->list_milestone != null)
                                                @foreach (json_decode($aspek->list_milestone) as $matkul)
                                                    <li>
                                                       @if ($index % 2 == 0)
                                                            <i class="bi bi-check"></i>
                                                        @endif
                                                        {{ $matkul }}
                                                        @if ($index % 2 != 0)
                                                            <i class="bi bi-check"></i>
                                                        @endif
                                                    </li>
                                                @endforeach
                                            @endif
                                        </ul>
                                    </div>
                                @endforeach
                            </div>
                            <!--End of Timeline-->
                        </div>
                        <!-- End blog entry -->
                    </div>
                    <!-- End blog entries list -->

                    <!-- End blog sidebar -->
                </div>
            </div>
        </section>
        <!-- End Blog Single Section -->
    @endforeach
@endsection
