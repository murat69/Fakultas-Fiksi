@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection

@section('dosen_penelitian', 'active')
@section('conten')
<section id="monev">
  <div class="container" data-aos="fade-up">
      <div class="section-title">
          <h2>{{ $title }}</h2>
      </div>
      <div class="row">
        @include('monev.dosen-navigation')
        
        <div class="col-lg-12 entries">
          
            <div class="col-md-12 mx-auto mb-3">
              <p>Setiap dosen mendapatkan akses terhadap jurnal online untuk mendukung pelaksanaan penelitian</p>
              <div id="container"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Distribusi informasi oleh LPPM (Lembaga Penelitian dan Pengabdian Masyarakat) tentang jenis hibah untuk penelitian telah dapat terakses telah dapat terakses dengan baik oleh dosen</p>
              <div id="metoda"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Prosedur penelitian internal sesuai dengan SOP</p>
              <div id="magang"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Penelitian hibah eksternal difasilitasi dangan baik oleh LPPM</p>
              <div id="buku_ajar"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memfasilitasi pembiayaan publikasi artikel di jurnal nasional terakreditasi</p>
              <div id="workshop"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memfasitilasi pembiayaan publikasi artikel di jurnal internasional </p>
              <div id="jenjang"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memfasitilasi pembiayaan kegiatan call for paper pada tingkat nasional maupun internasional</p>
              <div id="chart7"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memfasitilasi pengurusan HAKI (Hak Cipta Kekayaan Intelektual) dengan baik</p>
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
    // --------------------------- Minat --------------------//
      Highcharts.chart('container', {
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
    // ----------------------------- END Minat -----------------//

    // ------------------------- Metoda ------------------------//
     
      Highcharts.chart('metoda', {
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
                  y: 37.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 62.5
              }
            ]
          }]
      });

    // ------------------------END Metoda -----------------------//

    // ------------------------- Magang ------------------------//
     
      Highcharts.chart('magang', {
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
                  y: 87.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 12.5
              }
            ]
          }]
      });

    // ------------------------END Magang -----------------------//

    // ------------------------- Buku Ajar ------------------------//
     
      Highcharts.chart('buku_ajar', {
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
                  y: 75
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 12.5
              }
            ]
          }]
      });

    // ------------------------END Buku Ajar -----------------------//

    // --------------------------- Workshop --------------------//
      Highcharts.chart('workshop', {
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
                  y: 25
              },{
                  name: 'Setuju (S)',
                  y: 50
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 25
              }
            ]
          }]
      });
    // ----------------------------- END Workshop -----------------//

    // ------------------------- Jenjang Karir ------------------------//
     
      Highcharts.chart('jenjang', {
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
                  y: 25
              },{
                  name: 'Setuju (S)',
                  y: 37.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 37.5
              }
            ]
          }]
      });

    // ------------------------END Jenjang Karir -----------------------//

    // ------------------------- Chart 7 ------------------------//
     
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
              name: 'Dosen',
              colorByPoint: true,
              data: [{
                  name: 'Sangat Tidak Setuju (STS)',
                  y: 0,
              },{
                  name: 'Tidak Setuju (TS)',
                  y: 12.5
              },{
                  name: 'Agak Setuju (AS)',
                  y: 12.5
              },{
                  name: 'Setuju (S)',
                  y: 62.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 12.5
              }
            ]
          }]
      });

    // ------------------------END Chart 7 -----------------------//
    // ------------------------- Chart 8 ------------------------//
     
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
                  y: 71.4
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 28.6
              }
            ]
          }]
      });

    // ------------------------END Chart 8 -----------------------//
  </script>
@endsection
