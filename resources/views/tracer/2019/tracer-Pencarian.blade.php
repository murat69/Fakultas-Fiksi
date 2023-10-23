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
                   Pada saat survey dilakukan, responden yang mengisi survey Tracer Study 2019
sebesar 52,8% atau sebanyak 22 lulusan dari jumlah seluruh responden. Waktu
tunggu lulusan menunjukkan bahwa responden paling banyak memerlukan
waktu kurang dari 3 bulan bulan untuk mendapatkan pekerjaan pertama
sebanyak 48.5%.
Hal ini dapat dilihat pada Gambar dibawah yang menunjukkan lama waktu
tunggu yang diperlukan lulusan untuk mendapatkan pekerjaan pertama dari
setelah lulus. Dari data terebut sebanyak 50% (11 orang) responden telah
bekerja kurang dari 3 bulan setelah kelulusan. Kurang dari 6 bulan sebanyak 18%
(4 orang), sebanyak 5 orang lulusan atau sebesar 23% yang mendapatkan
pekerjaan pertama lebih dari 6 bulan, dan hanya sebesar 9% atau 2 orang alumni
yang berhasil mendapatkan pekerjaan lebih dari 1 tahun.

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
                            return Math.round(100 * this.y / 22) + '%';
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
                        y: 11,
                    },
                    {
                        name: 'Kurang dari 6 Bulan ',
                        y: 4,
                    },
                    {
                        name: 'Lebih dari 6 Bulan ',
                        y: 5,
                    },
                    {
                        name: 'Lebih dari 1 Tahun',
                        y: 2,
                    },
                ]
            }]
        });
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection
