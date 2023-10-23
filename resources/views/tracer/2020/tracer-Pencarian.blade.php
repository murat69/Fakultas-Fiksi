@extends('layouts.user')

@section('style')
    <style>
        section {
            padding: 7em 0;
        }
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
            color: #ffffff;
        }

        .faq .faq-list li {
            border-radius: 0px !important;
        }

        .faq .faq-list .list-item {
            margin-top: 0px !important;
        }
    </style>
@endsection
@section('arsitektur', 'active')
@section('2020', 'active')

@section('conten')


    <section id="team" class="team">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>Pencarian Pekerjaan (Waktu Tunggu)</h2>
            </div>

            <div class="row">
                <div class="col-lg-12" style="margin-top: 50px">
                    Pada saat survey dilakukan, responden yang mengisi survey Tracer Study 2020 sebesar 52,78% atau sebanyak
                    19 lulusan dari jumlah seluruh responden 36. Waktu tunggu lulusan menunjukkan bahwa responden paling
                    banyak memerlukan waktu kurang dari 3 bulan bulan untuk mendapatkan pekerjaan pertama sebanyak 53%.

                    Hal ini dapat dilihat pada Gambar dibawah yang menunjukkan lama waktu tunggu yang diperlukan lulusan
                    untuk mendapatkan pekerjaan pertama dari setelah lulus. Dari data terebut sebanyak 53% (10 orang)
                    responden telah bekerjakurang dari3 bulan setelah kelulusan. Kurang dari6 bulansebanyak 21% (4 orang),
                    sebanyak 4 orang lulusan atau sebesar 21% yang mendapatkan pekerjaan pertama lebihdari 6bulan, danhanya
                    sebesar 5% atau 1 orangalumni yang berhasil mendapatkan pekerjaan lebih dari 1 tahun.

                </div>
            </div>
        </div>
        <section id="monev">
            <div class="container" data-aos="fade-up">
                <div class="row">
                    @include('tracer-nav')
  
                    <div class="col-lg-12 entries">
                        <div class="col-md-12 mx-auto">
                            <div id="usia"></div>
                        </div>
                        <!-- End blog entry -->
                    </div>
                    <!-- End blog entries list -->

                    <!-- End blog sidebar -->
                </div>
            </div>
        </section>
    </section>
@endsection

@section('script')
    <script src="{{ asset('assets/highchart/highcharts.js') }}"></script>
    <script src="{{ asset('assets/highchart/modules/exporting.js') }}"></script>
    <script src="{{ asset('assets/highchart/modules/export-data.js') }}"></script>
    <script src="{{ asset('assets/highchart/modules/accessibility.js') }}"></script>

    <script>
        Highcharts.chart('usia', {
            chart: {
                type: 'column'
            },
            title: {
                align: 'left',
                text: 'Pencarian Pekerjaan (Waktu Tunggu)'
            },
            subtitle: {
                align: 'left',
                text: '4 Jawaban'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Jumlah'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            // return this.total;
                            return Math.round(100 * this.y / 19) + '%';
                        },
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}%</b> of total<br/>'
            },

            series: [{
                name: 'Waktu Tunggu Lulusan Mendapat Pekerjaan Pertama',
                colorByPoint: true,
                data: [{
                        name: 'Kurang dari 3 Bulan ',
                        y: 10,
                    },
                    {
                        name: 'Kurang dari 6 Bulan ',
                        y: 4,
                    },
                    {
                        name: 'Lebih dari 6 Bulan ',
                        y: 4,
                    },
                    {
                        name: 'Lebih dari 1 Tahun',
                        y: 1,
                    },
                ]
            }]
        });
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection