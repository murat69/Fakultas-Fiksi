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
          
          <div class="col-lg-12 entries">
              <!-- <h4 class="text-center mb-5">Identitas Responden</h4> -->
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Tim dari Program Studi merespon kebutuhan usaha/perusahaan kami dengan tepat dan profesional. </p>
                <div id="chart1"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Kegiatan dengan Program Studi  ini sesuai dengan harapan kami. </p>
                <div id="chart2"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Tim dari Program Studi memberikan pendampingan/bantuan terhadap usaha kami saat dibutuhkan. </p>
                <div id="chart3"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Kami mendapatkan hal yang berguna untuk terselenggaranya kegiatan ini.  </p>
                <div id="chart4"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Staf/petugas Universitas Kebangsaan Republik Indonesia yang terlibat dalam penyusunan kerjasama melayani kami dengan baik dan tepat sesuai kebutuhan.</p>
                <div id="chart5"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Naskah Surat Perjanjian Kerjasama (SPK) dan MoU/MoA/sejenisnya disusun dan ditulis dengan tepat dan sesuai dengan maksud, tujuan dan sasaran institusi.</p>
                <div id="chart6"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Selama masa berlaku MoU/MoA/sejenisnya, telah direalisasikan suatu kegiatan kerjasama yang bermanfaat bagi pihak kami. </p>
                <div id="chart7"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Pihak kami berkeinginan merealisasikan suatu kerjasama secara rutin dan berkala.</p>
                <div id="chart8"></div>
              </div>
              <div class="col-md-12 mx-auto mb-5">
                <p class="text-center">Pihak kami berkeinginan melanjutkan kerjasama apabila masa berlaku MoU/MoA/sejenisnya akan berakhir.</p>
                <div id="chart9"></div>
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 10
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 0
              },{
                  name: 'Setuju',
                  y: 85
              },{
                  name: 'Sangat Setuju',
                  y: 15
              }
            ]
          }]
      });

    // ------------------------END Chart 2 -----------------------//

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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 0
              },{
                  name: 'Setuju',
                  y: 90
              },{
                  name: 'Sangat Setuju',
                  y: 10
              }
            ]
          }]
      });

    // ------------------------END chart3 -----------------------//
    // ------------------------- chart4 ------------------------//
     
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 0
              },{
                  name: 'Setuju',
                  y: 75
              },{
                  name: 'Sangat Setuju',
                  y: 25
              }
            ]
          }]
      });

    // ------------------------END chart4 -----------------------//
    // ------------------------- chart5 ------------------------//
     
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 5
              },{
                  name: 'Setuju',
                  y: 80
              },{
                  name: 'Sangat Setuju',
                  y: 15
              }
            ]
          }]
      });

    // ------------------------END chart5 -----------------------//
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 5
              },{
                  name: 'Setuju',
                  y: 85
              },{
                  name: 'Sangat Setuju',
                  y: 10
              }
            ]
          }]
      });

    // ------------------------END chart6 -----------------------//

    // ------------------------- chart7 ------------------------//
     
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 5
              },{
                  name: 'Setuju',
                  y: 85
              },{
                  name: 'Sangat Setuju',
                  y: 10
              }
            ]
          }]
      });

    // ------------------------END chart7 -----------------------//
    // ------------------------- chart8 ------------------------//
     
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 0
              },{
                  name: 'Setuju',
                  y: 85
              },{
                  name: 'Sangat Setuju',
                  y: 15
              }
            ]
          }]
      });

    // ------------------------END chart8 -----------------------//
    // ------------------------- chart9 ------------------------//
     
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
          // subtitle: {
          //     align: 'left',
          //     text: '81 Jawaban'
          // },
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
              name: 'Mitra',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju',
                  y: 0,
              },{
                  name: 'Tidak Setuju',
                  y: 0
              },{
                  name: 'Agak Tidak Setuju',
                  y: 5
              },{
                  name: 'Setuju',
                  y: 75
              },{
                  name: 'Sangat Setuju',
                  y: 20
              }
            ]
          }]
      });

    // ------------------------END chart9 -----------------------//
  </script>
@endsection
