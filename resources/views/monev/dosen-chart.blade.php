@extends('layouts.user')

@section('style')
    <style>
        section {
            padding: 7em 0;
        }
    </style>
@endsection

@section('conten')
    <section id="monev">
        <div class="container" data-aos="fade-up">
            <div class="section-title">
                <h2>{{ $title }}</h2>
            </div>
            <div class="row">
                @include('monev.dosen-navigation')


                <div class="col-lg-12 entries">
                    <h4 class="text-center mb-5">{{ $monev->aspek }}</h4>
                    @foreach ($monev->sub_aspek as $item)
                        <div class="col-md-12 mx-auto mb-3">
                            <p>{{ $item->nama }}</p>
                            <div id="chart{{ $item->id }}"></div>
                        </div>
                    @endforeach
                    <!-- End blog entry -->
                </div>
                <!-- End blog entries list -->

                <!-- End blog sidebar -->
            </div>
        </div>
    </section>
@endsection

@section('script')
    <script src="{{ asset('assets/highchart/highcharts.js') }}"></script>
    <script src="{{ asset('assets/highchart/highcharts-3d.js') }}"></script>
    <script src="{{ asset('assets/highchart/modules/exporting.js') }}"></script>
    <script src="{{ asset('assets/highchart/modules/export-data.js') }}"></script>
    <script src="{{ asset('assets/highchart/modules/accessibility.js') }}"></script>

    <script>
        // --------------------------- chart1 --------------------//
        @foreach ($monev->sub_aspek as $sub)
            var jsonData = '{!! $sub->isi !!}';

            // Parse JSON menjadi objek JavaScript
            var dataObj = JSON.parse(jsonData);

            // Buat data untuk chart
            var chartData = [];
            for (var key in dataObj) {
                if (dataObj.hasOwnProperty(key)) {
                    chartData.push({
                        name: key,
                        y: parseFloat(dataObj[key])
                    });
                }
            }
            Highcharts.chart('chart{{ $sub->id }}', {
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
                title: false,
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
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Dosen',
                    colorByPoint: true,
                    data: chartData
                }]
            });
            // ----------------------------- END chart1 -----------------//
        @endforeach
        // ------------------------END chart6 -----------------------//
    </script>
@endsection
