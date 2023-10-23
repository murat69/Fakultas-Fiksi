<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conten;
use App\Models\Dosen;
use App\Models\Aspek;
use App\Models\Kurikulum;

class LingkunganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $visi = Conten::where('judul', '=', 'visi lingkungan')->first();
        $misi = Conten::where('judul', '=', 'misi lingkungan')->first();
        $akreditasi = Conten::where('judul', '=', 'akreditasi lingkungan')->first();
        $capaian = Conten::where('judul', '=', 'capaian lingkungan')->first();
        $aspek = Aspek::whereHas('prodi', function ($query) {
            $query->where('prodi', 'Teknik Lingkungan');
        })->get();
        $dosen = Dosen::whereHas('prodi', function ($query) {
            $query->where('prodi', 'Teknik Lingkungan');
        })->get();
        $kurikulum = Kurikulum::whereHas('prodi', function ($query) {
            $query->where('prodi', 'Teknik Lingkungan');
        })->get();
        $hero = "ada";
        $title = "HOME";
        $sambutan = Conten::where('judul', '=', 'sambutan ling')->first();
        $kap_ling = Dosen::where('status', 'Kaprodi')
            ->whereHas('prodi', function ($query) {
                $query->where('prodi', 'Teknik Lingkungan');
            })->first();
        $hero = "ada";
        return view('ling.welcome', compact('title', 'hero', 'visi', 'misi', 'dosen', 'akreditasi', 'capaian', 'aspek', 'kurikulum', 'sambutan', 'kap_ling'));
    }
}
