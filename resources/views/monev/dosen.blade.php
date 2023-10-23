@extends('layouts.user')

@section('style')
    <style>
        section {
            padding: 7em 0;
        }

        .person-bar {
            align-items: center;
        }

        .card {
            width: initial;
            background: #007336b0;
            height: initial;
            margin-top: 15px;
            box-shadow: none;
            color: white;
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

        .form-group select {
            font-size: small;
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

        .text-aspek {
            font-size: 15px;
        }
    </style>
@endsection
@section('dosen', 'active')

@section('conten')
    <section id="blog" class="blog">
        <div class="container mt-5" data-aos="fade-up">
            <div class="row">
                <div class="col-lg-12 entries">
                    <section id="team" class="team">
                        <div class="container-fluid row" data-aos="fade-up">
                            <div class="col-lg-12 col-md-9 col-sm-12">
                                <div class="section-title">
                                    <h2>{{ $title }}</h2>
                                </div>

                                <!-- Form Pencarian -->
                                <form class="mb-4">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="tahun" class="form-label"><small>Tahun</small></label>
                                            <select class="form-select tahun" id="tahun" name="tahun">
                                                <!-- Option items for Tahun -->
                                                @foreach ($tahunData as $data)
                                                    <option value="{{ $data->tahun }}">{{ $data->tahun }}</option>
                                                @endforeach
                                                <!-- Add more options as needed -->
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="aspek" class="form-label"><small>Aspek</small></label>
                                            <select class="form-select monev" id="aspek" name="aspek">
                                                <!-- Option items for Aspek -->
                                                @foreach ($monevs as $data)
                                                    <option value="{{ $data->nama }}">{{ $data->nama }}</option>
                                                @endforeach
                                                <!-- Add more options as needed -->
                                            </select>
                                        </div>
                                    </div>
                                    <a href="" class="btn btn-primary buttonajax" type="submit">Cari</a>
                                </form>

                                <div class="row">
                                    <ul class="nav nav-tabs" id="myTabs" role="tablist">
                                        @foreach ($monev as $item)
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link  text-aspek" id="tab{{ $item->id }}"
                                                    data-bs-toggle="tab" href="#content{{ $item->id }}"
                                                    role="tab">{{ $item->aspek }}</a>
                                            </li>
                                        @endforeach
                                    </ul>
                                    <div class="tab-content" id="myTabsContent">
                                        @foreach ($monev as $item)
                                            <div class="tab-pane fade show " id="content{{ $item->id }}"
                                                role="tabpanel">

                                                <div class="col-lg-12 entries">
                                                    @foreach ($sub_aspek as $data)
                                                        @if ($data->aspek_monev_id == $item->id)
                                                            <h5 class="text-center">{{ $data->nama }}</h5>
                                                            <div class="col-md-12 mx-auto">
                                                                <div id="{{ $data->id }}"></div>
                                                            </div>
                                                        @endif
                                                    @endforeach
                                                    <!-- End blog entry -->
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
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
        $(document).on('click', '.buttonajax', function() {

            var selectedTahun = $('.tahun').val();
            var selectedMonev = $('.monev').val();
            var newURL =

                "{{ route('monev.all', ['aspek' => ':aspek', 'tahun' => ':tahun']) }}";
            newURL = newURL.replace(':tahun', selectedTahun);
            newURL = newURL.replace(':aspek', selectedMonev);
            $('.buttonajax').attr('href', newURL);
        });
        @foreach ($sub_aspek as $sub)
            @if ($sub->nama === 'Rekap Kepuasan Dosen')
                // Data JSON yang diberikan
                console.log();
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
                // --------------------------- Kepuasan Dosen --------------------//
                Highcharts.chart('{{ $sub->id }}', {
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
                        text: '{{ $sub->nama }}',
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
                        name: 'PRODI',
                        colorByPoint: true,
                        data: chartData,
                    }]
                });
            @endif

            // ----------------------------- END Kepuasan Dosen -----------------//

            // ------------------------- GENDER ------------------------//
            @if ($sub->nama === 'Jenis Kelamin')
                // Data JSON yang diberikan
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
                Highcharts.chart('{{ $sub->id }}', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        align: 'left',
                        text: 'Jenis Kelamin'
                    },
                    subtitle: {
                        align: 'left',
                        text: '8 Jawaban'
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
                                    return (100 * this.y / {{ $sub->total }}) + '%';
                                },
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
                    },

                    series: [{
                        name: 'Gender',
                        colorByPoint: true,
                        data: chartData,
                    }]
                });
            @endif

            // ------------------------END Gender -----------------------//

            // ------------------------- USIA ------------------------//
            @if ($sub->nama === 'Usia')
                // Data JSON yang diberikan
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

                Highcharts.chart('{{ $sub->id }}', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        align: 'left',
                        text: 'Usia'
                    },
                    subtitle: {
                        align: 'left',
                        text: '8 Jawaban'
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
                                    return (100 * this.y / {{ $sub->total }}) + '%';
                                },
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                    },

                    series: [{
                        name: 'Usia',
                        colorByPoint: true,
                        data: chartData
                    }]
                });
            @endif
            // ------------------------END USIA -----------------------//

            // ------------------------- MASA KERJA ------------------------//

            @if ($sub->nama === 'Masa Kerja')
                // Data JSON yang diberikan
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

                Highcharts.chart('{{ $sub->id }}', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        align: 'left',
                        text: 'Masa Kerja'
                    },
                    subtitle: {
                        align: 'left',
                        text: '8 Jawaban'
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
                                    return (100 * this.y / {{ $sub->total }}) + '%';
                                },
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
                    },

                    series: [{
                        name: 'jabatan',
                        colorByPoint: true,
                        data: chartData
                    }]
                });
            @endif

            // ------------------------END MASA KERJA -----------------------//

            // --------------------------- Kepuasan Dosen --------------------//
            @if ($sub->nama === 'Pendidikan Terakhir')
                // Data JSON yang diberikan
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

                Highcharts.chart('{{ $sub->id }}', {
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
                        align: 'left',
                        text: '{{ $sub->nama }}'
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
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Pendidikan',
                        colorByPoint: true,
                        data: chartData
                    }]
                });
            @endif

            // ----------------------------- END Kepuasan Dosen -----------------//

            // ------------------------- MASA KERJA ------------------------//
            @if ($sub->nama === 'Berapa Lama Menduduki Jabatan Struktural')
                // Data JSON yang diberikan
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
                Highcharts.chart('{{ $sub->id }}', {
                    chart: {
                        type: 'column'
                    },
                    title:false,
                    subtitle: {
                        align: 'left',
                        text: '{{ $sub->total }} Jawaban'
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
                                    return (100 * this.y / {{ $sub->total }}) + '%';
                                },
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
                    },

                    series: [{
                        name: 'jabatan',
                        colorByPoint: true,
                        data: chartData
                    }]
                });
            @endif
            @if (
                $sub->nama !== 'Berapa Lama Menduduki Jabatan Struktural' ||
                    $sub->nama == 'Pendidikan Terakhir' ||
                    $sub->nama == 'Masa Kerja' ||
                    $sub->nama == 'Usia' ||
                    $sub->nama == 'Jenis Kelamin' ||
                    $sub->nama == 'Rekap Kepuasan Dosen')
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
                Highcharts.chart('{{ $sub->id }}', {
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
            @endif
        @endforeach
        // ------------------------END MASA KERJA -----------------------//
    </script>
@endsection
