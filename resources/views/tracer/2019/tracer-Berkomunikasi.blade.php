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
                <h2>Penilaian Pengguna Terhadap Kemampuan Berkomunikasi Lulusan</h2>
            </div>

            <div class="row">
                <div class="col-lg-12" style="margin-top: 50px">
                  Mayoritas responden dari kuesioner pengguna lulusan mengatakan bahwa
lulusan memiliki kemampuan komunikasi yang sangat baik (13 responden atau
72,22%).

                </div>
            </div>
        </div>
        <section id="monev">
            <div class="container" data-aos="fade-up">
                <div class="row">
                    @include('tracer-nav')

                    <div class="col-lg-12 entries">
                        <div class="col-md-12 mx-auto">
                            <div id="container"></div>
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
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 60,
                    beta: 0
                }
            },
            title: {
                text: 'PENILAIAN PENGGUNA TERHADAP KEMAMPUAN BERKOMUNIKASI LULUSAN',
                align: 'left'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 30,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Jumlah',
                colorByPoint: true,
                data: [{
                    name: 'Sangat Baik',
                    y: 72.22,
                }, {
                    name: 'Baik',
                    y: 17
                }, {
                    name: 'Cukup',
                    y: 11
                }, {
                    name: 'Kurang',
                    y: 0
                }]
            }]
        });
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection
