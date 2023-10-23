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
                <h2>Kesesuaian Bidang Pekerjaan</h2>
            </div>

            <div class="row">
                <div class="col-lg-12" style="margin-top: 50px">
           Berdasarkan informasi yang didapat dari responden yang sudah bekerja, didapatkan hasil bahwa bidang pekerjaan yang sedang ditekuni oleh sebagian besar para responden saat ini sangat sesuai dengan bidang ilmu yang sudah dipelajari selama melakukan studi pada program studi arsitektur. Hal ini ditunjukkan pada Gambar	2. Enam	puluh delapan	persen responden menyatakan bahwa bidang ilmu dan bidang pekerjaannya adalah sangat erat. Dan ada 32% yang menyatakan bahwa pekerjaan yang mereka lakukan dalam kategori cukup erat/sedang dengan bidang pendidikannya.

Gambar 2 di bawah ini menunjukkan hasil survei yang dilakukan untuk melihat mengenai tingkat keeratan pekerjaan alumni saat ini dengan bidang studi yang diambil oleh alumni saat menjalani pendidikannya di Fakultas Teknik Sipil dan Perencanaan pada program studi arsitektur.

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
                text: 'Kesesuaian Bidang Pekerjaan'
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
                            return this.y+'%';
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
                        name: 'Sangat Erat',
                        y: 68,
                    },
                    {
                        name: 'Erat ',
                        y: 0,
                    },
                    {
                        name: 'Cukup Erat',
                        y: 32,
                    },
                    {
                        name: 'Kurang Erat',
                        y: 0,
                    },
                ]
            }]
        });
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection
