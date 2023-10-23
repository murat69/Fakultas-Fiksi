@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection

@section('aspek_lain', 'active')
@section('conten')
<section id="monev">
  <div class="container" data-aos="fade-up">
      <div class="section-title">
          <h2>{{ $title }}</h2>
      </div>
      <div class="row">
        @include('monev.mahasiswa.navigation')
        
        <div class="col-lg-12 entries">
            <h4 class="text-center mb-5">Aspek Emphathy</h4>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pelayanan akademiik selalu didasarkan oleh kepentingan dan kesulitan yang dihadapi oleh mahasiswa </p>
              <div id="chart1"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Monitoring kemajuan akademik mahasiswa secara berkala oleh program studi </p>
              <div id="chart2"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Kesediaan dosen dalam membantu setiap mahasiswa yang mengalami kesulitas studi </p>
              <div id="chart3"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Keramahan dosen dalam berintegrasi terhadap mahasiswa </p>
              <div id="chart4"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Ketersediaan sarana dalam mewujudkan dan mengembangkan minat serta bakat mahasiswa dari program studi </p>
              <div id="chart5"></div>
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 2.4,
              },{
                  name: 'Cukup',
                  y: 21
              },{
                  name: 'Baik',
                  y: 56.8
              },{
                  name: 'Sangat Baik',
                  y: 19.8
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 6.2,
              },{
                  name: 'Cukup',
                  y: 16.3
              },{
                  name: 'Baik',
                  y: 62.5
              },{
                  name: 'Sangat Baik',
                  y: 15
              }
            ]
          }]
      });

    // ------------------------END chart2 -----------------------//

    // ------------------------- chart3 ------------------------//
     
      Highcharts.chart('chart3', {
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 6.2,
              },{
                  name: 'Cukup',
                  y: 14.8
              },{
                  name: 'Baik',
                  y: 69.1
              },{
                  name: 'Sangat Baik',
                  y: 13.6
              }
            ]
          }]
      });

    // ------------------------END chart3 -----------------------//

    // ------------------------- chart 4 ------------------------//
     
      Highcharts.chart('chart4', {
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 1.5,
              },{
                  name: 'Cukup',
                  y: 3.5
              },{
                  name: 'Baik',
                  y: 72.8
              },{
                  name: 'Sangat Baik',
                  y: 22.2
              }
            ]
          }]
      });

    // ------------------------END chart 4 -----------------------//

    // ------------------------- chart 5 ------------------------//
     
      Highcharts.chart('chart5', {
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 8.8,
              },{
                  name: 'Cukup',
                  y: 16.3
              },{
                  name: 'Baik',
                  y: 60
              },{
                  name: 'Sangat Baik',
                  y: 15
              }
            ]
          }]
      });

    // ------------------------END chart 5 -----------------------//

  </script>
@endsection
