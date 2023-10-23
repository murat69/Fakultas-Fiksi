@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection
@section('penghargaan', 'active')

@section('conten')

  
  <section id="monev">
    <div class="container" data-aos="fade-up">
        <div class="section-title">
            <h2>{{ $title }}</h2>
        </div>
        <div class="row">
          @include('monev.tendik.tendik-navigation')
          
          <div class="col-lg-12 entries">
              <h4 class="text-center mb-5">Aspek Penghargaan</h4>
              <div class="col-md-12 mx-auto mb-5">
                <p>Ketika saya melakukan pekerjaan dengan bagus, pimpinan memberikan pengakuan yang sesuai dengan harapan saya </p>
                <div id="chart1"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya merasa bahwa apa yang saya lakukan telah dihargai oleh unit kerja </p>
                <div id="chart2"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Banyak penghargaan yang diterima bagi karyawan yang bekerja di unit kerja </p>
                <div id="chart3"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya merasa usaha saya selama ini dihargai menurut cara yang seharusnya </p>
                <div id="chart4"></div>
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
          subtitle: false,
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
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Setuju',
                  y: 10
              },{
                  name: 'Setuju',
                  y: 90
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart1 -----------------//

    // --------------------------- chart 2 --------------------//
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
          subtitle: false,
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
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Setuju',
                  y: 20
              },{
                  name: 'Setuju',
                  y: 80
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart 2 -----------------//

    // --------------------------- chart 3 --------------------//
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
          subtitle: false,
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
                  name: 'Sangat Tidak Setuju',
                  y: 10,
              },{
                  name: 'Tidak Setuju',
                  y: 10,
              },{
                  name: 'Agak Setuju',
                  y: 30,
              },{
                  name: 'Setuju',
                  y: 50,
              },{
                  name: 'Sangat Setuju',
                  y: 0,
              }
            ]
          }]
      });
    // ----------------------------- END chart 3 -----------------//
    
    // --------------------------- chart 4 --------------------//
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
          subtitle: false,
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
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0,
              },{
                  name: 'Agak Setuju',
                  y: 20,
              },{
                  name: 'Setuju',
                  y: 80,
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart 4 -----------------//

  </script>
@endsection