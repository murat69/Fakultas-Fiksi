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
                <h2>Penilaian Pengguna Terhadap Tingkat Kepuasan Instansi/Perusahaan Untuk Menggunakan</h2>
            </div>

            <div class="row">
                <div class="col-lg-12" style="margin-top: 50px">
                   Mayoritas responden dari kuesioner pengguna lulusan mengatakan bahwa lulusan
memiliki kemampuan pengembangan diri yang sangat baik (17 responden atau
70,83%).

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
                type: 'bar'
            },
            title: {
                align: 'left',
                text: 'Penilaian Pengguna Terhadap Tingkat Kepuasan Instansi/Perusahaan Untuk Menggunakan'
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
                        name: 'Sangat Baik',
                        y: 70.83,
                    },
                    {
                        name: 'Baik',
                        y: 21,
                    },
                    {
                        name: 'Cukup',
                        y: 8,
                    },
                    {
                        name: 'Kurang',
                        y: 0,
                    },
                ]
            }]
        });
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection
