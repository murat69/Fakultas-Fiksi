<?php

namespace App\Http\Controllers;

use App\Models\Conten;
use App\Models\Dosen;
use App\Models\Aspek;
use App\Models\Kurikulum;

class ArsitekturController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $visi = Conten::where('judul', '=', 'visi arsitektur')->first();
        $misi = Conten::where('judul', '=', 'misi arsitektur')->first();
        $struktur = Conten::where('judul', '=', 'struktur ARS')->first();
        $sambutan = Conten::where('judul', '=', 'sambutan ars')->first();
        $akreditasi = Conten::where('judul', '=', 'akreditasi arsitektur')->first();
        $capaian = Conten::where('judul', '=', 'capaian arsitektur')->first();
        $kap_ars = Dosen::where('status', 'Kaprodi')
            ->whereHas('prodi', function ($query) {
                $query->where('prodi', 'Arsitektur');
            })->first();
        $aspek = Aspek::whereHas('prodi', function ($query) {
            $query->where('prodi', 'Arsitektur');
        })->get();
        $dosen = Dosen::whereHas('prodi', function ($query) {
            $query->where('prodi', 'Arsitektur');
        })->get();
        $kurikulum = Kurikulum::whereHas('prodi', function ($query) {
            $query->where('prodi', 'Arsitektur');
        })->get();
        $hero = "ada";
        $title = "HOME";

        $hero = "ada";
        return view('ars.welcome', compact('title', 'hero', 'visi', 'misi', 'dosen', 'akreditasi', 'capaian', 'aspek', 'kurikulum', 'struktur', 'sambutan', 'kap_ars'));
    }
}
