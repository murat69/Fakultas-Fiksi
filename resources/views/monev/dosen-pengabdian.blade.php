@extends('layouts.user')

@section('style')
    <style>
      section {
          padding: 7em 0;
      }
    </style>
@endsection

@section('dosen_pengabdian', 'active')
@section('conten')
<section id="monev">
  <div class="container" data-aos="fade-up">
      <div class="section-title">
          <h2>{{ $title }}</h2>
      </div>
      <div class="row">
        @include('monev.dosen-navigation')
        
        <div class="col-lg-12 entries">
          
            <div class="col-md-12 mx-auto mb-5">
              <p>Distribusi Informasi Oleh LPPM (Lembaga Penelitian dan Pengabdian Masyarakat) tentang jenis hibah untuk pengabdian telah terakses oleh civitas akademika</p>
              <div id="chart1"></div>
            </div>
            <div class="col-md-12 mx-auto mb-5">
              <p>Prosedur kegiatan pengabdian masyarakat internal maupun eksternal sesuai dengan SOP yang telah ditetapkan</p>
              <div id="chart2"></div>
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
    // --------------------------- Chart 1 --------------------//
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
                  y: 75
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 25
              }
            ]
          }]
      });
    // ----------------------------- END Chart 1 -----------------//

    // ------------------------- Chart2 ------------------------//
     
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
                  y: 75
              },{
                  name: 'Sangat Setuju (SS)',
                  y: 25
              }
            ]
          }]
      });

    // ------------------------END Chart2 -----------------------//

  </script>
@endsection
