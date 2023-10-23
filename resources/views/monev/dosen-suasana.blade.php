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
        @include('monev.dosen-navigation')
        
        <div class="col-lg-12 entries">
            <h4 class="text-center mb-5">Aspek Suasana Kerja</h4>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pejabat struktural mampu berkomunikasi secara efektif dengan dosen</p>
              <div id="chart1"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi selalu  memberikan kesempatan bagi dosen untuk memberikan masukan / ide baru untuk perbaikan proses / prosedur pelaksanaan pekerjaan</p>
              <div id="chart2"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi selalu mendukung apa yang dilakukan dosen sepanjang menurut pihak yang bersangkutan dapat memberikan kontribusi positif untuk kemajuan program studi / fakultas</p>
              <div id="chart3"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memberikan kesempatan kepada para dosen untuk terlibat dalam tim / panitia sehingga dapat bekerja sama dengan baik</p>
              <div id="chart4"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pejabat struktural melakukan kaderisasi kepemimpinan terhadap dosen yang dianggap memiliki kompetensi yang memadai</p>
              <div id="chart5"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Diskusi tentang topik keilmuan selalu ada di lingkungan kerja saya </p>
              <div id="chart6"></div>
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
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 0
              },{
                  name: 'Agak Setuju (AS)',
                  y: 12.5
              },{
                  name: 'Setuju (S)',
                  y: 37.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 50
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
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 0
              },{
                  name: 'Agak Setuju (AS)',
                  y: 0
              },{
                  name: 'Setuju (S)',
                  y: 50
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 50
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
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 0
              },{
                  name: 'Agak Setuju (AS)',
                  y: 0
              },{
                  name: 'Setuju (S)',
                  y: 62.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 37.5
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
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 0
              },{
                  name: 'Agak Setuju (AS)',
                  y: 0
              },{
                  name: 'Setuju (S)',
                  y: 75
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 25
              }
            ]
          }]
      });

    // ------------------------END chart 4 -----------------------//

    // --------------------------- chart5 --------------------//
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
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 0
              },{
                  name: 'Agak Setuju (AS)',
                  y: 0
              },{
                  name: 'Setuju (S)',
                  y: 75
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 25
              }
            ]
          }]
      });
    // ----------------------------- END chart5 -----------------//

    // ------------------------- chart6 ------------------------//
     
      Highcharts.chart('chart6', {
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
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 0
              },{
                  name: 'Agak Setuju (AS)',
                  y: 0
              },{
                  name: 'Setuju (S)',
                  y: 62.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 37.5
              }
            ]
          }]
      });

    // ------------------------END chart6 -----------------------//

  </script>
@endsection
