<?php

namespace App\Http\Controllers;

use App\Models\Kat_tracer;
use App\Models\prodi;
use App\Models\Tahun;
use App\Models\Tracer;
use Illuminate\Http\Request;

class TracerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tracer = Tracer::orderBy('id', 'DESC')->get();
        $title = "Tracer";
        $tahun = Tahun::get();
        $kat_tracer = Kat_tracer::get();
        $prodi = prodi::get();
        return view('admin.tracer', compact('tracer', 'title', 'tahun', 'kat_tracer', 'prodi'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'aspek' => 'required',
            'deskripsi' => 'required',
        ]);
        $tracer = new Kat_tracer();
        $tracer->aspek = $request->aspek;
        $tracer->deskripsi = $request->deskripsi;
        $tracer->save();
        return redirect()->route('kat.tracer')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function sub_tracer_store(Request $request)
    {
        $validated = $request->validate([
            'tahun' => 'required',
            'prodi' => 'required',
            'total' => 'required',
            'id_sub' => 'required',
            'item' => 'required',
            'value' => 'required',

        ]);
        $items = $request->input('item');
        $values = $request->input('value');
        $total = array_sum($values);

        if ($total > $request->total) {
            return redirect()->route('kat.tracer')->with('error', 'Jumlah value item melebihi dari data total respondend');
        }

        // Membuat array asosiatif dari pasangan "item" dan "value"
        $result = array();
        foreach ($items as $key => $item) {
            $result[$item] = $values[$key];
        }

        $jsonResult = json_encode($result);


        $tracer = new Tracer();
        $tracer->aspek_tracer_id = $request->id_sub;
        $tracer->total = $request->total;
        $tracer->isi = $jsonResult;
        $tracer->prodi_id = $request->prodi;
        $tracer->tahun_id = $request->tahun;
        $tracer->save();
        return redirect()->route('kat.tracer')
            ->with('success', 'Data berhasil dibuat!');
        // Menampilkan atau melakukan sesuatu dengan JSON
    }
    public function sub_tracer_update(Request $request, $id)
    {
        $validated = $request->validate([
            'tahun' => 'required',
            'prodi' => 'required',
            'total' => 'required',
            'item' => 'required',
            'value' => 'required',

        ]);
        $items = $request->input('item');
        $values = $request->input('value');
        $total = array_sum($values);

        if ($total > $request->total) {
            return redirect()->route('kat.tracer')->with('error', 'Jumlah value item melebihi dari data total respondend');
        }

        // Membuat array asosiatif dari pasangan "item" dan "value"
        $result = array();
        foreach ($items as $key => $item) {
            $result[$item] = $values[$key];
        }

        $jsonResult = json_encode($result);


        $tracer = Tracer::findOrFail($id);
        $tracer->total = $request->total;
        $tracer->isi = $jsonResult;
        $tracer->prodi_id = $request->prodi;
        $tracer->tahun_id = $request->tahun;
        $tracer->save();
        return redirect()->route('kat.tracer')
            ->with('success', 'Data berhasil di ubah!');
        // Menampilkan atau melakukan sesuatu dengan JSON
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'aspek' => 'required',
            'deskripsi' => 'required',
        ]);
        $tracer = Kat_tracer::findOrFail($id);
        $tracer->aspek = $request->aspek;
        $tracer->deskripsi = $request->deskripsi;
        $tracer->save();
        return redirect()->route('kat.tracer')
            ->with('success', 'Data berhasil di ubah!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $isi_tracer = Tracer::where('aspek_tracer_id', $id);
        $isi_tracer->delete();

        $tracer = Kat_tracer::findOrFail($id);
        $tracer->delete();
        return redirect()->route('kat.tracer')
            ->with('success', 'Data berhasil di Hapus!');
    }
    public function sub_tracer_destroy($id)
    {
        $tracer = Tracer::findOrFail($id);
        $tracer->delete();
        return redirect()->route('kat.tracer')
            ->with('success', 'Data berhasil di Hapus!');
    }
}
