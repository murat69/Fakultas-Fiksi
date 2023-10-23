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
          @include('monev.tendik.tendik-navigation')
          
          <div class="col-lg-12 entries">
              <h4 class="text-center mb-5">Aspek Kompensasi</h4>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya puas dengan kompensasi tunjangan hari raya (THR) yang diberikan Universitas  </p>
                <div id="chart1"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p> Kompensasi THR di UKRI yang saya terima sudah layak   </p>
                <div id="chart2"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya puas dengan bonus (Gaji ke- 13 dll ) yang diberikan Universitas    </p>
                <div id="chart3"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya puas dengan kompensasi kepanitiaan/ lembur yang diberikan Universitas  </p>
                <div id="chart4"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Kompensasi kepanitian/lembur di UKRI yang saya terima sudah layak  </p>
                <div id="chart5"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p> Saya puas dengan asuransi kesehatan (BPPJS) yang diberikan Universitas  </p>
                <div id="chart6"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya puas dengan dana pensiun yang diberikan Universitas  </p>
                <div id="chart7"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Dana pensiun di UKRI yang akan saya terima sudah layak </p>
                <div id="chart8"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Saya puas dengan kompensasi dari adanya program pelayanan kesehatan keluarga (BPJS)</p>
                <div id="chart9"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p>Kompensasi dari pelayanan kesehatan keluarga yang saya terima di UKRI sudah layak</p>
                <div id="chart10"></div>
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
                  y: 10,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Setuju',
                  y: 0
              },{
                  name: 'Setuju',
                  y: 60
              },{
                  name: 'Sangat Setuju',
                  y: 30
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
                  y: 10,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Setuju',
                  y: 0
              },{
                  name: 'Setuju',
                  y: 80
              },{
                  name: 'Sangat Setuju',
                  y: 10
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
                  y: 40,
              },{
                  name: 'Agak Setuju',
                  y: 10,
              },{
                  name: 'Setuju',
                  y: 40,
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
                  y: 40,
              },{
                  name: 'Agak Setuju',
                  y: 10,
              },{
                  name: 'Setuju',
                  y: 50,
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart 4 -----------------//

    // --------------------------- chart 5 --------------------//
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
                  y: 40,
              },{
                  name: 'Agak Setuju',
                  y: 10,
              },{
                  name: 'Setuju',
                  y: 50,
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart 5 -----------------//
    // --------------------------- chart 6 --------------------//
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
                  y: 70,
              },{
                  name: 'Sangat Setuju',
                  y: 10
              }
            ]
          }]
      });
    // ----------------------------- END chart 6 -----------------//

    // --------------------------- chart 7 --------------------//
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
                  y: 10,
              },{
                  name: 'Agak Setuju',
                  y: 30,
              },{
                  name: 'Setuju',
                  y: 60,
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart 7 -----------------//

    // --------------------------- chart 8 --------------------//
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
                  y: 20,
              },{
                  name: 'Agak Setuju',
                  y: 20,
              },{
                  name: 'Setuju',
                  y: 60,
              },{
                  name: 'Sangat Setuju',
                  y: 0
              }
            ]
          }]
      });
    // ----------------------------- END chart 8 -----------------//
    // --------------------------- chart 9 --------------------//
      Highcharts.chart('chart9', {
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
                  y: 10,
              },{
                  name: 'Setuju',
                  y: 80,
              },{
                  name: 'Sangat Setuju',
                  y: 10
              }
            ]
          }]
      });
    // ----------------------------- END chart 9 -----------------//
    // --------------------------- chart 10 --------------------//
    Highcharts.chart('chart10', {
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
                  y: 70,
              },{
                  name: 'Sangat Setuju',
                  y: 10
              }
            ]
          }]
      });
    // ----------------------------- END chart 10 -----------------//

  </script>
@endsection
