@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection

@section('assurance', 'active')
@section('conten')
<section id="monev">
  <div class="container" data-aos="fade-up">
      <div class="section-title">
          <h2>{{ $title }}</h2>
      </div>
      <div class="row">
        @include('monev.mahasiswa.navigation')
        
        <div class="col-lg-12 entries">
            <h4 class="text-center mb-5">Aspek Assurance</h4>
            <div class="col-md-12 mx-auto mb-3">
              <p>Keramahan staf akademik dalam memberikan pelayanan akademik </p>
              <div id="chart1"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pelayanan permasalahan dan keluhan mahasiswa diselesaikan dengan baik oleh Program Studi </p>
              <div id="chart2"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Umpan balik dari dosen terhadap tugas mahasiswa </p>
              <div id="chart3"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pengalokasian waktu secara efektif dalam proses pembelajaran oleh dosen </p>
              <div id="chart4"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Mekanisme sangsi yang jelas tanpa deskriminasi bagi semua mahasiswa tanpa kecuali terhadap pelanggaran peraturan </p>
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
                  y: 1.2,
              },{
                  name: 'Cukup',
                  y: 14.8
              },{
                  name: 'Baik',
                  y: 51.9
              },{
                  name: 'Sangat Baik',
                  y: 32.1
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
                  y: 2.5,
              },{
                  name: 'Cukup',
                  y: 21
              },{
                  name: 'Baik',
                  y: 54.3
              },{
                  name: 'Sangat Baik',
                  y: 54.3
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
                  y: 0,
              },{
                  name: 'Cukup',
                  y: 11.1
              },{
                  name: 'Baik',
                  y: 67.9
              },{
                  name: 'Sangat Baik',
                  y: 21
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
                  y: 1.3,
              },{
                  name: 'Cukup',
                  y: 8.6
              },{
                  name: 'Baik',
                  y: 76.5
              },{
                  name: 'Sangat Baik',
                  y: 13.6
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
                  y: 2.5,
              },{
                  name: 'Cukup',
                  y: 18.5
              },{
                  name: 'Baik',
                  y: 65.4
              },{
                  name: 'Sangat Baik',
                  y: 13.6
              }
            ]
          }]
      });

    // ------------------------END chart 5 -----------------------//

  </script>
@endsection
