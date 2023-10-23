<?php

namespace App\Providers;

use App\Models\Carousel;
use App\Models\monev;
use App\Models\prodi;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        $data_slider = Carousel::where('deleted_at', NULL)->where('jurusan_id', 0)->orderBy('urutan', 'ASC')->get();
        $data_prodi = prodi::get();
        $data_monev = monev::get();
        $data = [
            'monev' => $data_monev,
            'slider' => $data_slider,
            'prodi' => $data_prodi
        ];
        View::share('view_var', $data);
    }
}