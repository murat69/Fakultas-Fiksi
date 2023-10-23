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
            <h4 class="text-center mb-5">Aspek Khusus Pelayanan Kemahasiswaan</h4>
            <div class="col-md-12 mx-auto mb-3">
              <p>Daya tanggap dosen penasehat akademik dalam melayani mahasiswa (validasi KRS. konsultasi dan lain-lain) </p>
              <div id="chart1"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Ketersediaan fasilitas penyaluran minat dan bakat mahasiswa dalam pengembangan dirinya </p>
              <div id="chart2"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pembinaan /pelatihan softskill dalam menumbuhkan dalam menumbuhkan jiwa kepemimpinan dan kewirausahaan </p>
              <div id="chart3"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Ketersediaan kesempatan dan kemudahan akses untuk mendapatkan beasiswa </p>
              <div id="chart4"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Ketersediaan layanan kesehatan </p>
              <div id="chart5"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Pelayanan akses internet kampus </p>
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 2.5,
              },{
                  name: 'Cukup',
                  y: 16
              },{
                  name: 'Baik',
                  y: 49.4
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
                  y: 11.1,
              },{
                  name: 'Cukup',
                  y: 21
              },{
                  name: 'Baik',
                  y: 56.8
              },{
                  name: 'Sangat Baik',
                  y: 11.1
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
                  y: 8.8,
              },{
                  name: 'Cukup',
                  y: 26.2
              },{
                  name: 'Baik',
                  y: 53.8
              },{
                  name: 'Sangat Baik',
                  y: 11.3
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
                  y: 13.6
              },{
                  name: 'Baik',
                  y: 44.4
              },{
                  name: 'Sangat Baik',
                  y: 40.7
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
                  y: 11.1,
              },{
                  name: 'Cukup',
                  y: 22.2
              },{
                  name: 'Baik',
                  y: 54.3
              },{
                  name: 'Sangat Baik',
                  y: 12.3
              }
            ]
          }]
      });

    // ------------------------END chart 5 -----------------------//

    // ------------------------- chart 6 ------------------------//
     
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
              name: 'Mahasiswa',
              colorByPoint: true,
              data: [{
                  name: 'Kurang',
                  y: 13.8,
              },{
                  name: 'Cukup',
                  y: 27.5
              },{
                  name: 'Baik',
                  y: 46.3
              },{
                  name: 'Sangat Baik',
                  y: 12.5
              }
            ]
          }]
      });

    // ------------------------END chart 6 -----------------------//
  </script>
@endsection
