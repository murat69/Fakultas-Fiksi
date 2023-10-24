<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Conten;
use App\Models\Dosen;
use App\Models\prodi;
use Illuminate\Http\Request;
use App\helpers;
use App\Models\Aspek_monev;
use App\Models\Fasilitas;
use App\Models\Informasi;
use App\Models\milestone;
use App\Models\monev;
use App\Models\Sub_aspek;
use App\Models\Tahun;
use App\Models\template_monev;
use Illuminate\Support\Facades\DB;

class MonevController extends Controller
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
        $monev = Aspek_monev::orderBy('id', 'DESC')->get();
        $title = "Template Monev";
        $tahun = Tahun::get();
        $monevs = monev::get();
        return view('admin.monev', compact('monev', 'title', 'tahun', 'monevs'));
    }
    public function monev()
    {
        $monev = monev::orderBy('id', 'DESC')->get();
        $title = "Monev";
        return view('admin.monev_master', compact('monev', 'title'));
    }
    public function test()
    {
        $subAspekData = Sub_aspek::select('nama', 'isi', 'monev_id', 'tahun_id')
            ->where('tahun_id', 2)
            ->where('monev_id', 1)
            ->limit(1)
            ->get();

        $templateMonevData = template_monev::select('nama', 'isi', 'monev_id', DB::raw('null as tahun_id'))
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('sub_aspek')
                    ->whereColumn('sub_aspek.nama', '=', 'template_monev.nama')
                    ->where('sub_aspek.tahun_id', '=', 2);
            })
            ->where('monev_id', 1)
            ->orderBy('monev_id', 'ASC')
            ->get();

        $result = $subAspekData->union($templateMonevData);

        foreach ($result as $item) {
            echo "nama : " . $item->nama;
            echo '<br>';
            echo "isi : " . $item->isi;
            echo '<br>';
        }
    }


    public function mengisi($tahuns = null, $monevs = null, $prodis = null)
    {
        $status = "tambah";
        $aspek = Aspek_monev::orderBy('id', 'ASC')->get();

        $form = template_monev::whereHas('monev', function ($query) use ($monevs) {
            $query->where('nama', $monevs);
        })->get();
        if ($tahuns && $monevs && $prodis) {
            $aspek = Aspek_monev::whereHas('template_monev', function ($query) use ($monevs) {
                $query->whereHas('monev', function ($query) use ($monevs) {
                    $query->where('nama', $monevs);
                });
            })->get();

            $tahun_select = Tahun::where('tahun', $tahuns)->first();
            $prodi_select = prodi::where('prodi', $prodis)->first();
            $form = template_monev::leftJoinSub(
                function ($query) use ($tahun_select, $prodi_select) {
                    $query->select('id as id_sub', 'template_id', 'isi as isi_sub', 'total as total_sub', 'flag as flag_sub', 'monev_id as monev_id_sub', 'tahun_id as tahun_id_sub', 'aspek_monev_id as aspek_monev_id_sub')
                        ->from('sub_aspek')
                        ->where('tahun_id', $tahun_select->id)
                        ->where('prodi_id', $prodi_select->id);
                },
                'aspek',
                function ($join) {
                    $join->on('aspek.template_id', '=', 'template_monev.id');
                }
            )

                ->get();
        }
        $template = template_monev::get();
        $title = "Monev";
        $tahun = Tahun::get();
        $monev = monev::get();
        $prodi = prodi::get();
        return view('admin.mengisi', compact('prodi', 'aspek', 'monev', 'title', 'tahun', 'monevs', 'tahuns', 'form', 'prodis'));
    }
    public function ajax_mengisi(Request $request)
    {
        $requestData = $request->all();
        try {
            if ($requestData['total'] >= $requestData['totalvalue']) {
                $subAspek = Sub_aspek::where('id', $request->id_sub)->first();
                if (!isset($subAspek)) {
                    $subAspek = new Sub_aspek();
                }
                $subAspek->tahun_id = $requestData['tahun_id'];
                $subAspek->flag = $requestData['flag'];
                $subAspek->total = $requestData['total'];
                $subAspek->template_id = $requestData['id_template'];
                $subAspek->monev_id = $requestData['monev_id'];
                $subAspek->prodi_id = $requestData['prodi_id'];
                $subAspek->aspek_monev_id = $requestData['id'];
                $subAspek->nama = $requestData['nama_aspek'];
                $subAspek->isi = json_encode($requestData['json_data']);
                $subAspek->save();
                $success = true;
            } else {
                $success = $request->all();
            }
        } catch (\Exception $e) {
            $success = $request->all();
        }

        // Lakukan operasi yang diperlukan di sini, seperti menyimpan data ke dalam database

        return response()->json(['success' => $success]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'aspek' => 'required',
        ]);
        $monev = new Aspek_monev();
        $monev->aspek = $request->aspek;
        $monev->save();
        return redirect()->route('admin.monev')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function monev_store(Request $request)
    {
        $validated = $request->validate([
            'monev' => 'required',
        ]);
        $monev = new monev();
        $monev->nama = $request->monev;
        $monev->save();
        return redirect()->route('monev.master')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function monev_update(Request $request, $id)
    {
        $validated = $request->validate([
            'monev' => 'required',
        ]);
        $monev = monev::findOrFail($id);
        $monev->nama = $request->monev;
        $monev->save();
        return redirect()->route('monev.master')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'aspek' => 'required',
        ]);
        $monev = Aspek_monev::findOrFail($id);
        $monev->aspek = $request->aspek;
        $monev->save();
        return redirect()->route('admin.monev')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function monev_destroy($id)
    {

        $monev = monev::findOrFail($id);
        $monev->delete();
        return redirect()->route('monev.master')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function sub_store(Request $request)
    {

        $validated = $request->validate([
            'item' => 'required',
            'monev' => 'required',
            'value' => 'required',
            'nama' => 'required',
        ]);

        $jsonData = [];
        for ($i = 0; $i < count($request->item); $i++) {
            $jsonData[$request->item[$i]] = $request->value[$i];
        }
        $result = json_encode($jsonData);
        $sub_aspek = new template_monev();
        $sub_aspek->nama = $request->nama;
        $sub_aspek->aspek_monev_id = $request->id_sub;
        $sub_aspek->monev_id = $request->monev;
        $sub_aspek->isi = $result;
        $sub_aspek->save();
        return redirect()->route('admin.monev')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function sub_update(Request $request, $id)
    {
        $validated = $request->validate([
            'item' => 'required',
            'monev' => 'required',
            'value' => 'required',
            'nama' => 'required',

        ]);
        $jsonData = [];
        for ($i = 0; $i < count($request->item); $i++) {
            $jsonData[$request->item[$i]] = $request->value[$i];
        }
        $result = json_encode($jsonData);
        $sub_aspek = template_monev::findOrFail($id);
        $sub_aspek->nama = $request->nama;
        $sub_aspek->monev_id = $request->monev;
        $sub_aspek->isi = $result;
        $sub_aspek->save();
        return redirect()->route('admin.monev')
            ->with('success', 'Data berhasil dibuat!');
    }

    public function sub_destroy($id)
    {
        $sub_aspek = template_monev::findOrFail($id);
        $sub_aspek->delete();
        return redirect()->route('admin.monev')
            ->with('success', 'Data berhasil dihapus!');
    }
    public function destroy($id)
    {
        $temp_aspek = template_monev::where('aspek_monev_id', $id)->first();
        if ($temp_aspek) {
            $temp_aspek->delete();
        }

        $sub_aspek = Aspek_monev::findOrFail($id);
        $sub_aspek->delete();
        return redirect()->route('admin.monev')
            ->with('success', 'Data berhasil dihapus!');
    }




    public function monev_all(Request $request, $aspek = NULL, $tahun = NULL, $prodi = null)
    {
        $hero = "kosong";
        $title = $aspek;
        $monevs = Monev::get();
        $tahunData = Tahun::whereIn('id', function ($query) {
            $query->select('tahun_id')->from('sub_aspek');
        })->get();
        $prodiData = prodi::get();
        if ($tahun && $aspek && $prodi) {
            $monev = Aspek_monev::whereHas('sub_aspek', function ($query) use ($aspek) {
                $query->whereHas('monev', function ($query) use ($aspek) {
                    $query->where('nama', $aspek);
                });
            })->get();
            $sub_aspek = Sub_aspek::whereHas(
                'monev',
                function ($query) use ($aspek) {
                    $query->where('nama', $aspek);
                }
            )->whereHas(
                'tahun',
                function ($query) use ($tahun) {
                    $query->where('tahun', $tahun);
                }
            )->whereHas(
                'prodi',
                function ($query) use ($prodi) {
                    $query->where('prodi', $prodi);
                }
            )->get();

            return view('monev.dosen', compact('title', 'hero', 'sub_aspek', 'monev', 'monevs', 'tahun', 'tahunData', 'prodiData', 'prodi'));
        }
        return view('monev.index', compact('title', 'hero', 'tahunData', 'prodiData', 'aspek', 'monevs'));
    }

    public function monev_mahasiswa(Request $request, $aspek = NULL)
    {
        $hero = "kosong";
        $title = "Kepuasan Mahasiswa";
        if ($aspek) {
            $view = [
                'identitas' => 'monev.mahasiswa.identitas',
                'tangible' => 'monev.mahasiswa.tangible',
                'reliability' => 'monev.mahasiswa.reliability',
                'responsive' => 'monev.mahasiswa.responsive',
                'assurance' => 'monev.mahasiswa.assurance',
                'emphathy' => 'monev.mahasiswa.emphathy',
                'kemahasiswaan' => 'monev.mahasiswa.kemahasiswaan',
            ];
            return view($view[$aspek], compact('title', 'hero'));
        }
        return view('monev.mahasiswa.index', compact('title', 'hero'));
    }

    public function monev_tendik(Request $request, $aspek = NULL)
    {
        $hero = "kosong";
        $title = "Kepuasan Tenaga Pendidik";
        if ($aspek) {
            $view = [
                'promosi' => 'monev.tendik.promosi',
                'penghargaan' => 'monev.tendik.penghargaan',
                'supervisi' => 'monev.tendik.supervisi',
                'kompensasi' => 'monev.tendik.kompensasi',
                'formalitas' => 'monev.tendik.formalitas',
                'konflik' => 'monev.tendik.konflik',
                'makna' => 'monev.tendik.makna',
                'komunikasi' => 'monev.tendik.komunikasi',

            ];
            return view($view[$aspek], compact('title', 'hero'));
        }
        return view('monev.tendik.tendik', compact('title', 'hero'));
    }

    public function monev_mitra(Request $request)
    {
        $hero = "kosong";
        $title = "Kepuasan Mitra Kerjasama";
        return view('monev.mitra.index', compact('title', 'hero'));
    }
}
