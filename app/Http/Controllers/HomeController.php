<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Conten;
use App\Models\Dosen;
use App\Models\prodi;
use Illuminate\Http\Request;
use App\helpers;
use App\Models\Aspek;
use App\Models\Carousel;
use App\Models\Fasilitas;
use App\Models\Informasi;
use App\Models\Kat_tracer;
use App\Models\Kurikulum;
use App\Models\milestone;
use App\Models\Tahun;
use App\Models\Tracer;

class HomeController extends Controller
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
        $visi = Conten::where('judul', '=', 'VISI')->first();
        $misi = Conten::where('judul', '=', 'MISI')->first();
        $sambutan = Conten::where('judul', '=', 'sambutan dekan')->first();
        $kaprodi = Dosen::where('status', 'Kaprodi')->get();
        $hero = "ada";
        $dekan = Dosen::where('status', 'Dekan')->first();
        $title = "HOME";

        return view('welcome', compact('title', 'hero', 'visi', 'misi', 'kaprodi', 'dekan', 'sambutan'));
    }

    public function riset()
    {
        $prodi = prodi::with(['dosen' => function ($query) {
            $query->orderBy('prodi_id');
        }])->get();
        $hero = "kosong";
        $title = "Riset & Publikasi Ilmiah";
        return view('riset', compact('title', 'hero', 'prodi'));
    }

    public function berita()
    {
        $berita = Berita::with('prodi', 'file_berita')->orderBy('tanggal', 'desc')->get();
        $terbaru = Berita::with('prodi', 'file_berita')->latest()->take(3)->get();;
        $title = "Berita";
        $prodi = prodi::get();
        $hero = "kosong";
        $prodi = prodi::get();

        return view('berita', compact('berita', 'title', 'prodi', 'hero', 'terbaru', 'prodi'));
    }
    public function cari_berita(Request $request)
    {
        $search = $request->cari;
        $berita = Berita::with('prodi', 'file_berita')->where('judul', 'LIKE', '%' . $search . '%')
            ->orWhere('isi', 'LIKE', '%' . $search . '%')
            ->orWhereHas('prodi', function ($query) use ($search) {
                $query->where('prodi', 'LIKE', '%' . $search . '%');
            })->orderBy('tanggal', 'desc')->get();
        $terbaru = Berita::with('prodi', 'file_berita')->latest()->take(3)->get();;
        $title = "Berita";
        $prodi = prodi::get();
        $hero = "kosong";
        $prodi = prodi::get();

        return view('berita', compact('berita', 'title', 'prodi', 'hero', 'terbaru'));
    }
    public function berita_full($id)
    {
        $slug = explode("-", $id);
        $secure = denc($slug[0]);
        $replace = str_replace($slug[0] . '-', '', $id);
        $berita = Berita::with('prodi', 'file_berita')->where('id', $secure)->first();
        $terbaru = Berita::with('prodi', 'file_berita')->latest()->take(3)->get();

        $title = "Berita";
        $prodi = prodi::get();
        $hero = "kosong";
        if ($berita) {
            if ($berita->slug == $replace) {
                return view('baca', compact('berita', 'title', 'prodi', 'hero', 'terbaru'));
            } else {
                echo "sebaik nya jangan gegabah";
            }
        } else {
            echo "sebaik nya jangan gegabah oraig";
        }
    }

    public function milestone()
    {
        $milestone = milestone::with('item_milestone')->get();
        $hero = "kosong";
        $title = "Milestone";
        return view('milestone', compact('title', 'hero', 'milestone'));
    }

    public function fasilitas()
    {
        $lab = Conten::where('judul', '=', 'LAB PRAKTIKUM')->first();
        $kelas = Conten::where('judul', '=', 'RUANG KELAS')->first();
        $fasilitas = Fasilitas::get();
        $hero = "kosong";
        $title = "Fasilitas";
        return view('fasilitas', compact('title', 'hero', 'lab', 'kelas', 'fasilitas'));
    }
    public function beasiswa()
    {
        $informasi = Informasi::get();
        $hero = "kosong";
        $title = "Beasiswa";
        return view('beasiswa', compact('title', 'hero', 'informasi'));
    }
    public function beasiswa_full($id)
    {
        $informasi = Informasi::where('id', $id)->first();
        $hero = "kosong";
        $title = "Beasiswa";
        return view('beasiswa-full', compact('title', 'hero', 'informasi'));
    }

    public function monev_dosen(Request $request, $aspek = NULL)
    {
        $hero = "kosong";
        $title = "Kepuasan Dosen";
        if ($aspek) {
            $view = [
                'pengajaran' => 'monev.dosen-pengajaran',
                'penelitian' => 'monev.dosen-penelitian',
                'pengabdian' => 'monev.dosen-pengabdian',
                'suasana' => 'monev.dosen-suasana',
                'pendukung' => 'monev.dosen-pendukung',
                'kesehatan' => 'monev.dosen-kesehatan',
                'penghargaan' => 'monev.dosen-penghargaan',
            ];
            return view($view[$aspek], compact('title', 'hero'));
        }
        return view('monev.dosen', compact('title', 'hero'));
    }

    public function monev_mahasiswa(Request $request, $aspek = NULL)
    {
        $hero = "kosong";
        $title = "Kepuasan Mahasiswa";
        if ($aspek) {
            $view = [
                'identitas' => 'monev.mahasiswa.identitas',
                'tangible' => 'monev.mahasiswa.tangible',
            ];
            return view($view[$aspek], compact('title', 'hero'));
        }
        return view('monev.mahasiswa.index', compact('title', 'hero'));
    }

    public function tracer($prodi = NULL, $tahun = NULL)
    {
        $hero = "kosong";
        $title = "Tracer Studi";
        $prodis = prodi::get();
        $tahuns = Tahun::get();

        if ($tahun && $prodi) {
            $kat_tracer = Kat_tracer::get();
            $sub_tracer = Tracer::whereHas(
                'prodi',
                function ($query) use ($prodi) {
                    $query->where('prodi', $prodi);
                }
            )->whereHas(
                'tahun',
                function ($query) use ($tahun) {
                    $query->where('tahun', $tahun);
                }
            )->get();
            return view('tracer_all', compact('title', 'hero', 'tahuns', 'prodis', 'kat_tracer', 'sub_tracer'));
        }
        return view("tracer", compact('title', 'hero', 'tahuns', 'prodis'));
    }


    public function alumni(Request $request)
    {
        $hero = "kosong";
        $title = "Alumni";
        return view('alumni', compact('title', 'hero'));
    }

    public function prodi($prodi)
    {
        $prodi = str_replace('-', ' ', $prodi);
        $slider_prodi = Carousel::whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })
            ->where('jenis', 1)
            ->where('deleted_at', NULL)
            ->get();



        $slider = Carousel::where('deleted_at', NULL)->orderBy('urutan', 'ASC')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->whereNot('jenis', 1)
            ->where('deleted_at', NULL)
            ->get();


        $visi = Conten::where('judul', '=', 'visi')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->first();
        $misi = Conten::where('judul', '=', 'misi')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->first();
        $struktur = Conten::where('judul', '=', 'struktur')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->first();
        $sambutan = Conten::where('judul', '=', 'sambutan')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->first();
        $akreditasi = Conten::where('judul', '=', 'akreditasi')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->first();
        $capaian = Conten::where('judul', '=', 'capaian')->whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->first();
        $kap = Dosen::where('status', 'Kaprodi')
            ->whereHas('prodi', function ($query) use ($prodi) {
                $query->where('prodi', $prodi);
            })->first();
        $aspek = Aspek::whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->get();
        $dosen = Dosen::whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->get();
        $kurikulum = Kurikulum::whereHas('prodi', function ($query) use ($prodi) {
            $query->where('prodi', $prodi);
        })->get();
        $hero = "prodi";
        $title = "HOME";
        return view('prodi', compact('prodi', 'title', 'hero', 'visi', 'misi', 'dosen', 'akreditasi', 'capaian', 'aspek', 'kurikulum', 'struktur', 'sambutan', 'kap', 'slider', 'slider_prodi'));
    }
}