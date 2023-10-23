@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection
@section('identitas', 'active')

@section('conten')

  
  <section id="monev">
    <div class="container" data-aos="fade-up">
        <div class="section-title">
            <h2>{{ $title }}</h2>
        </div>
        <div class="row">
          @include('monev.mahasiswa.navigation')
          
          <div class="col-lg-12 entries">
              <h4 class="text-center mb-5">Identitas Responden</h4>
              <div class="col-md-12 mx-auto">
                <div id="chart1"></div>
              </div>
              <div class="col-md-12 mx-auto">
                <div id="chart2"></div>
              </div>
              <div class="col-md-12 mx-auto">
                <div id="chart3"></div>
              </div>
              <!-- End blog entry -->
          </div>
          <!-- End blog entries list -->

          <!-- End blog sidebar -->
        </div>
    </div>
  </section>
@endsection

@section('script')
  <script src="{{asset('assets/highchart/highcharts.js')}}"></script>
  <script src="{{asset('assets/highchart/highcharts-3d.js')}}"></script>
  <script src="{{asset('assets/highchart/modules/exporting.js')}}"></script>
  <script src="{{asset('assets/highchart/modules/export-data.js')}}"></script>
  <script src="{{asset('assets/highchart/modules/accessibility.js')}}"></script>

  <script>
    // --------------------------- chart1 --------------------//
      Highcharts.chart('chart1', {
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
                text: 'Angkatan'
            },
          subtitle: {
              align: 'left',
              text: '81 Jawaban'
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
                      format: '{point.percentage:.1f} %'
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: '2017',
                  y: 21,
              },{
                  name: '2018',
                  y: 29.6
              },{
                  name: '2019',
                  y: 14.8
              },{
                  name: '2020',
                  y: 30.9
              }
            ]
          }]
      });
    // ----------------------------- END chart1 -----------------//

    // ------------------------- chart2 ------------------------//
     
      Highcharts.chart('chart2', {
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
                text: 'Prodi'
            },
          subtitle: {
              align: 'left',
              text: '81 Jawaban'
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
                      format: '{point.percentage:.1f} %'
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Teknik Lingkungan',
                  y: 33.3,
              },{
                  name: 'Arsitektur',
                  y: 66.7
              }
            ]
          }]
      });

    // ------------------------END Chart 2 -----------------------//

    // ------------------------- chart3 ------------------------//
     
        Highcharts.chart('chart3', {
            chart: {
                type: 'bar'
            },
            title: {
                align: 'left',
                text: 'Jenis Kelamin'
            },
            subtitle: {
                align: 'left',
                text: '81 Jawaban'
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
                        formatter: function () {
                            // return this.total;
                            return Math.round(100 * this.y / 81) + '%';
                        },
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
            },

            series: [
                {
                    name: 'Jenis Kelamin',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Laki - Laki',
                            y: 52,
                        },
                        {
                            name: 'Perempuan',
                            y: 29,
                        }
                    ]
                }
            ]
        });

    // ------------------------END chart3 -----------------------//

  </script>
@endsection
