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
                <h2>Tingkat dan Ukuran Tempat Kerja Lulusan</h2>
            </div>

            <div class="row">
                <div class="col-lg-12" style="margin-top: 50px">

               Reputasi perusahaan merupakan salah satu faktor yang mempengaruhi lulusan
perguruan tinggi untuk melamar di perusahaan tersebut. Umumnya perusahaan
dengan reputasi baik dan nama besar memiliki daya tarik yang besar pula bagi
lulusan dari setiap perguruan tinggi. Hal ini tentunya menjadi salah satu
pertimbangan oleh lulusan FTSP, yang tahun ini diwakili oleh lulusan tahun 2017. <br>
Mengamati kategori perusahaan di mana lulusan Arsitektur tahun 2017 saat ini
sedang bekerja, mayoritas lulusan tahun 2017 yakni sebesar 64% bekerja pada
perusahaan kategori nasional, yaitu perusahaan yang berbasis di Indonesia dan
memiliki cabang di beberapa wilayah di Indonesia. Kemudian, lulusan yang
bekerja di perusahaan lokal sebanyak 36 %. Sedangkan untuk lulusan yang
bekerja pada perusahaan internasional pada saat ini belum ada.

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
                text: 'Tingkat dan Ukuran Tempat Kerja Lulusan',
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
                    name: 'Lokal/wilayah',
                    y: 36,
                }, {
                    name: 'Nasional',
                    y: 64
                }, {
                    name: 'Multinasional/Internas ional',
                    y: 0
                }]
            }]
        });
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection
