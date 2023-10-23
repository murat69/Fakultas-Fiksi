@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection

@section('dosen_pengajaran', 'active')
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
              <p>Program studi memberikan kesempatan pada dosen untuk mengajar sesuai dengan keahlian dan minatnya</p>
              <div id="container"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memberikan kesempatan pada dosen untuk menerapkan metoda pembelajaran yang baru</p>
              <div id="metoda"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memberikan kesempatan pada yunior untuk "magang" pada matakuliah sesuai dengan minatnya</p>
              <div id="magang"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memberikan kesempatan bagi dosen untuk menulis buku ajar</p>
              <div id="buku_ajar"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memberikan kesempatan bagi dosen untuk mengikuti workshop/kegiatan pelatihan internal/eksternal yang berhubungan dengan kompetensi</p>
              <div id="workshop"></div>
            </div>
            <div class="col-md-12 mx-auto mb-3">
              <p>Program studi memberikan kesempatan bagi dosen untuk meneruskan studi lanjut ke jenjang yang lebih tinggi</p>
              <div id="jenjang"></div>
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
                  y: 50
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 50
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
                  y: 75
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 25
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
                  y: 50
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 37.5
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
                  y: 0
              },{
                  name: 'Setuju (S)',
                  y: 12.5
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 87.5
              }
            ]
          }]
      });

    // ------------------------END Jenjang Karir -----------------------//
  </script>
@endsection
