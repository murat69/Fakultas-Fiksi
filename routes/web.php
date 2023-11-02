<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/route-clear', function () {
    $exitCode = Artisan::call('route:clear');
    return 'Route cache cleared';
});

Route::get('/foo', function () {
    Artisan::call('storage:link');
});

// Masuk
Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

// Pengaturan Kata Sandi
Route::get('/password/reset', [App\Http\Controllers\Auth\ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('/password/email', [App\Http\Controllers\Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/password/reset/{token}', [App\Http\Controllers\Auth\ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/password/reset', [App\Http\Controllers\Auth\ResetPasswordController::class, 'reset']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// ---------------------- UNTUK MONEV -------------------------//
require __DIR__ . '/monev.php';
// ---------------------- END UNTUK MONEV -------------------------//
Route::get('riset', [App\Http\Controllers\HomeController::class, 'riset'])->name('riset');
Route::get('tracer/{prodi?}/{tahun?}', [App\Http\Controllers\HomeController::class, 'tracer'])->name('tracer');

Route::get('alumni', [App\Http\Controllers\HomeController::class, 'alumni'])->name('alumni');


Route::get('milestones', [App\Http\Controllers\HomeController::class, 'milestone'])->name('milestones');
Route::get('news', [App\Http\Controllers\HomeController::class, 'berita'])->name('news');
Route::post('news-search', [App\Http\Controllers\HomeController::class, 'cari_berita'])->name('news.cari');
Route::get('news-read/{id}', [App\Http\Controllers\HomeController::class, 'berita_full'])->name('news.full');
Route::get('fasilitas-ukri', [App\Http\Controllers\HomeController::class, 'fasilitas'])->name('fasilitas-ukri');
Route::get('beasiswa', [App\Http\Controllers\HomeController::class, 'beasiswa'])->name('beasiswa');
Route::get('beasiswa-full/{id}', [App\Http\Controllers\HomeController::class, 'beasiswa_full'])->name('beasiswa.full');

Route::prefix('program-studi/')->group(
    function () {
        Route::get('{kategori}', [App\Http\Controllers\HomeController::class, 'prodi'])->name('program-studi');
    }
);



Route::middleware('role:admin,dosen,tu')->group(
    function () {
        Route::post('/change-password/{id}', [App\Http\Controllers\AkunController::class, 'changePassword'])->name('change.password');
    }
);

Route::middleware('role:admin,dosen')->group(
    function () {
        Route::prefix('profile/')->group(
            function () {
                Route::get('', [App\Http\Controllers\ProfileController::class, 'index'])->name('profile');
                Route::post('jurnal/deleted', [App\Http\Controllers\ProfileController::class, 'deleted_jurnal'])->name('jurnal.deleted');
                Route::post('jurnal/edited', [App\Http\Controllers\ProfileController::class, 'edited_jurnal'])->name('jurnal.edited');
                Route::post('store/{id}', [App\Http\Controllers\ProfileController::class, 'store'])->name('profile.store');
                Route::post('update/{id}', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
                Route::post('jurnal/update', [App\Http\Controllers\ProfileController::class, 'edited_jurnal'])->name('profile.jurnal.update');
                Route::delete('jurnal/destroy/{id}', [App\Http\Controllers\ProfileController::class, 'deleted_jurnal'])->name('profile.jurnal.destroy');
                Route::delete('destroy/{id}', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
            }
        );
    }
);

Route::middleware('role:admin,tu')->group(
    function () {

        // Registrasi
        Route::prefix('carousel')->group(function () {
            Route::match(['get', 'post'], '', [App\Http\Controllers\ContenController::class, 'carousel'])->name('carousel');
            Route::match(['get', 'post'], 'form/{id?}', [App\Http\Controllers\ContenController::class, 'carouselForm'])->name('carousel.form');
            Route::post('hapus', [App\Http\Controllers\ContenController::class, 'hapusCarousel'])->name('carousel.hapus');
            Route::get('prodi', [App\Http\Controllers\ContenController::class, 'prodi_slider'])->name('prodi_slider');
            Route::post('prodi/store', [App\Http\Controllers\ContenController::class, 'prodi_slider_store'])->name('prodi_slider.store');
            Route::post('prodi/update/{id}', [App\Http\Controllers\ContenController::class, 'prodi_slider_update'])->name('prodi_slider.update');
            Route::delete('prodi/destroy/{id}', [App\Http\Controllers\ContenController::class, 'prodi_slider_destroy'])->name('prodi_slider.destroy');
        });
        Route::prefix('tahun/')->group(
            function () {
                Route::get('', [App\Http\Controllers\TahunController::class, 'index'])->name('tahun');
                Route::post('store', [App\Http\Controllers\TahunController::class, 'store'])->name('tahun.store');
                Route::post('update', [App\Http\Controllers\TahunController::class, 'update'])->name('tahun.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\TahunController::class, 'destroy'])->name('tahun.destroy');
            }
        );

        Route::prefix('akun/')->group(
            function () {
                Route::get('', [App\Http\Controllers\AkunController::class, 'index'])->name('akun');
                Route::post('store', [App\Http\Controllers\AkunController::class, 'store'])->name('akun.store');
                Route::post('update', [App\Http\Controllers\AkunController::class, 'update'])->name('akun.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\AkunController::class, 'destroy'])->name('akun.destroy');
            }
        );

        Route::prefix('admin/tracer/')->group(
            function () {
                Route::get('', [App\Http\Controllers\TracerController::class, 'index'])->name('kat.tracer');

                Route::post('store', [App\Http\Controllers\TracerController::class, 'store'])->name('kat.tracer.store');

                Route::post('sub_tracer/store', [App\Http\Controllers\TracerController::class, 'sub_tracer_store'])->name('sub.tracer.store');

                Route::post('update/{id}', [App\Http\Controllers\TracerController::class, 'update'])->name('kat.tracer.update');

                Route::post('sub_tracer/update/{id}', [App\Http\Controllers\TracerController::class, 'sub_tracer_update'])->name('sub.tracer.update');

                Route::delete('destroy/{id}', [App\Http\Controllers\TracerController::class, 'destroy'])->name('kat.tracer.destroy');

                Route::delete('sub_tracer/destroy/{id}', [App\Http\Controllers\TracerController::class, 'sub_tracer_destroy'])->name('sub.tracer.destroy');
            }
        );
        Route::prefix('monev/')->group(
            function () {
                Route::get('', [App\Http\Controllers\MonevController::class, 'index'])->name('admin.monev');

                Route::get('master_monev', [App\Http\Controllers\MonevController::class, 'monev'])->name('monev.master');

                Route::post('ajax', [App\Http\Controllers\MonevController::class, 'ajax_mengisi'])->name('monev.ajax');

                Route::get('mengisi/{tahuns?}/{monevs?}/{prodis?}', [App\Http\Controllers\MonevController::class, 'mengisi'])->name('admin.monev.mengisi');

                Route::post('store', [App\Http\Controllers\MonevController::class, 'store'])->name('admin.aspek.store');

                Route::post('master/store', [App\Http\Controllers\MonevController::class, 'monev_store'])->name('monev.master.store');

                Route::post('sub_store', [App\Http\Controllers\MonevController::class, 'sub_store'])->name('admin.sub_aspek.store');

                Route::post('update/{id}', [App\Http\Controllers\MonevController::class, 'update'])->name('admin.aspek.update');

                Route::post('master/update/{id}', [App\Http\Controllers\MonevController::class, 'monev_update'])->name('monev.master.update');

                Route::post('sub_update/{id}', [App\Http\Controllers\MonevController::class, 'sub_update'])->name('admin.sub_aspek.update');

                Route::delete('destroy/{id}', [App\Http\Controllers\MonevController::class, 'destroy'])->name('admin.aspek.destroy');

                Route::delete('master/destroy/{id}', [App\Http\Controllers\MonevController::class, 'monev_destroy'])->name('monev.master.destroy');

                Route::delete('sub_destroy/{id}', [App\Http\Controllers\MonevController::class, 'sub_destroy'])->name('admin.sub_aspek.destroy');
            }
        );

        Route::prefix('milestone/')->group(
            function () {
                Route::get('', [App\Http\Controllers\milestoneController::class, 'index'])->name('milestone');
                Route::post('store', [App\Http\Controllers\milestoneController::class, 'store'])->name('milestone.store');
                Route::post('update/{id}', [App\Http\Controllers\milestoneController::class, 'update'])->name('milestone.update');
                Route::post('aspek-milstone/{id}', [App\Http\Controllers\milestoneController::class, 'aspek_edit'])->name('aspek-milstone.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\milestoneController::class, 'destroy'])->name('milestone.destroy');
                Route::delete('aspek-milstone/destroy/{id}', [App\Http\Controllers\milestoneController::class, 'aspek_milstone_destroy'])->name('aspek-milstone.destroy');
            }
        );

        Route::prefix('prodi/')->group(
            function () {
                Route::get('', [App\Http\Controllers\ProdiController::class, 'index'])->name('prodi');
                Route::post('store', [App\Http\Controllers\ProdiController::class, 'store'])->name('prodi.store');
                Route::post('update/{id}', [App\Http\Controllers\ProdiController::class, 'update'])->name('prodi.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\ProdiController::class, 'destroy'])->name('prodi.destroy');
            }
        );

        Route::prefix('aspek/')->group(
            function () {
                Route::get('', [App\Http\Controllers\AspekController::class, 'index'])->name('aspek');
                Route::post('store', [App\Http\Controllers\AspekController::class, 'store'])->name('aspek.store');
                Route::post('update/{id}', [App\Http\Controllers\AspekController::class, 'update'])->name('aspek.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\AspekController::class, 'destroy'])->name('aspek.destroy');
            }
        );
        Route::prefix('kurikulum/')->group(
            function () {
                Route::get('', [App\Http\Controllers\KurikulumController::class, 'index'])->name('kurikulum');
                Route::post('store', [App\Http\Controllers\KurikulumController::class, 'store'])->name('kurikulum.store');
                Route::post('update', [App\Http\Controllers\KurikulumController::class, 'update'])->name('kurikulum.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\KurikulumController::class, 'destroy'])->name('kurikulum.destroy');
            }
        );

        Route::prefix('fasilitas/')->group(
            function () {
                Route::get('', [App\Http\Controllers\FasilitasController::class, 'index'])->name('fasilitas');
                Route::post('store', [App\Http\Controllers\FasilitasController::class, 'store'])->name('fasilitas.store');
                Route::post('update/{id}', [App\Http\Controllers\FasilitasController::class, 'update'])->name('fasilitas.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\FasilitasController::class, 'destroy'])->name('fasilitas.destroy');
            }
        );

        Route::prefix('file/')->group(
            function () {
                Route::get('', [App\Http\Controllers\FileController::class, 'index'])->name('file');
                Route::post('mime/store', [App\Http\Controllers\FileController::class, 'store'])->name('mime.store');
                Route::post('file/store', [App\Http\Controllers\FileController::class, 'store_file'])->name('file.store');
                Route::post('file/update/{id}', [App\Http\Controllers\FileController::class, 'update_file'])->name('file.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\FileController::class, 'destroy'])->name('mime.destroy');
                Route::post('mime/update/{id}', [App\Http\Controllers\FileController::class, 'update'])->name('mime.update');
                // Route::post('update/{id}', [App\Http\Controllers\ProdiController::class, 'update'])->name('prodi.update');
                Route::delete('file/destroy/{id}', [App\Http\Controllers\FileController::class, 'destroy_file'])->name('file.destroy');
            }
        );

        Route::prefix('dosen/')->group(
            function () {
                Route::get('', [App\Http\Controllers\DosenController::class, 'index'])->name('dosen');
                Route::post('jurnal/deleted', [App\Http\Controllers\DosenController::class, 'deleted_jurnal'])->name('jurnal.deleted');
                Route::post('jurnal/edited', [App\Http\Controllers\DosenController::class, 'edited_jurnal'])->name('jurnal.edited');
                Route::post('store', [App\Http\Controllers\DosenController::class, 'store'])->name('dosen.store');
                Route::post('update/{id}', [App\Http\Controllers\DosenController::class, 'update'])->name('dosen.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\DosenController::class, 'destroy'])->name('dosen.destroy');
            }
        );

        Route::prefix('conten/')->group(
            function () {
                Route::get('', [App\Http\Controllers\ContenController::class, 'index'])->name('conten');
                Route::post('store', [App\Http\Controllers\ContenController::class, 'store'])->name('conten.store');
                Route::post('update/{id}', [App\Http\Controllers\ContenController::class, 'update'])->name('conten.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\ContenController::class, 'destroy'])->name('conten.destroy');
            }
        );

        Route::prefix('berita/')->group(
            function () {
                Route::get('', [App\Http\Controllers\BeritaController::class, 'index'])->name('berita');
                Route::post('store', [App\Http\Controllers\BeritaController::class, 'store'])->name('berita.store');
                Route::delete('img_delete/store/{id}', [App\Http\Controllers\BeritaController::class, 'img_delete'])->name('berita.img_delete');
                Route::post('img_add/store/{id}', [App\Http\Controllers\BeritaController::class, 'img_add'])->name('berita.image');
                Route::post('img_edit/store', [App\Http\Controllers\BeritaController::class, 'img_edit'])->name('berita.img_edit');
                Route::post('update/{id}', [App\Http\Controllers\BeritaController::class, 'update'])->name('berita.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\BeritaController::class, 'destroy'])->name('berita.destroy');
            }
        );

        Route::prefix('informasi/')->group(
            function () {
                Route::get('', [App\Http\Controllers\InformasiController::class, 'index'])->name('informasi');
                Route::post('store', [App\Http\Controllers\InformasiController::class, 'store'])->name('informasi.store');
                Route::post('update/{id}', [App\Http\Controllers\InformasiController::class, 'update'])->name('informasi.update');
                Route::delete('destroy/{id}', [App\Http\Controllers\InformasiController::class, 'destroy'])->name('informasi.destroy');
            }
        );
    }
);