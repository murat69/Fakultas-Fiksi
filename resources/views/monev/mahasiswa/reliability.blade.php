@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection

@section('reliability', 'active')
@section('conten')
<section id="monev">
  <div class="container" data-aos="fade-up">
      <div class="section-title">
          <h2>{{ $title }}</h2>
      </div>
      <div class="row">
        @include('monev.mahasiswa.navigation')
        
        <div class="col-lg-12 entries">
            <h4 class="text-center mb-5">Aspek Reliability</h4>
            <div class="col-md-12 mx-auto mb-3">
              <p>Kesediaan dosen dalam menjelaskan kembali materi yang tidak dapahami mahasiswa </p>
              <div id="chart1"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Alokasi waktu dosen untuk melayani diskusi dan tanya jawab </p>
              <div id="chart2"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Ketersediaan materi pelengkap atausuplemen perkuliahan </p>
              <div id="chart3"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Objektifitas dan umpan balik dari dosen terhadap nilai mahasiswa </p>
              <div id="chart4"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Ketepatan waktu dosen dalam proses perkuliahan </p>
              <div id="chart5"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Keragaman alternatif dosen pembina mata kuliah  </p>
              <div id="chart6"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Kesediaan dosen dalam menjelaskan Rencana Pengajaran Perkuliahan Per Semester </p>
              <div id="chart7"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Kemampuan staf akademik dalam memberikan pelayanan kepada mahasiswa  </p>
              <div id="chart8"></div>
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
                  y: 1.3,
              },{
                  name: 'Cukup',
                  y: 18.5
              },{
                  name: 'Baik',
                  y: 58
              },{
                  name: 'Sangat Baik',
                  y: 22.2
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
                  y: 3.7,
              },{
                  name: 'Cukup',
                  y: 14.8
              },{
                  name: 'Baik',
                  y: 56.8
              },{
                  name: 'Sangat Baik',
                  y: 24.7
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
                  y: 2.5,
              },{
                  name: 'Cukup',
                  y: 21.3
              },{
                  name: 'Baik',
                  y: 58.7
              },{
                  name: 'Sangat Baik',
                  y: 17.5
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
                  y: 2.4,
              },{
                  name: 'Cukup',
                  y: 17.5
              },{
                  name: 'Baik',
                  y: 61.3
              },{
                  name: 'Sangat Baik',
                  y: 18.8
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
                  y: 2.4,
              },{
                  name: 'Cukup',
                  y: 16.3
              },{
                  name: 'Baik',
                  y: 61.3
              },{
                  name: 'Sangat Baik',
                  y: 20
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
                  y: 3.7,
              },{
                  name: 'Cukup',
                  y: 10
              },{
                  name: 'Baik',
                  y: 68.8
              },{
                  name: 'Sangat Baik',
                  y: 17.5
              }
            ]
          }]
      });

    // ------------------------END chart 6 -----------------------//

    // ------------------------- chart 7 ------------------------//
     
      Highcharts.chart('chart7', {
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
                  y: 17.5
              },{
                  name: 'Baik',
                  y: 55
              },{
                  name: 'Sangat Baik',
                  y: 27.5
              }
            ]
          }]
      });

    // ------------------------END chart 7 -----------------------//

    // ------------------------- chart 8 ------------------------//
     
      Highcharts.chart('chart8', {
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
                  y: 3.7,
              },{
                  name: 'Cukup',
                  y: 11.1
              },{
                  name: 'Baik',
                  y: 49.4
              },{
                  name: 'Sangat Baik',
                  y: 35.8
              }
            ]
          }]
      });

    // ------------------------END chart 8 -----------------------//

  </script>
@endsection
