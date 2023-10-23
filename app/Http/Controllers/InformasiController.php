<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use App\Models\prodi;
use Illuminate\Http\Request;

class InformasiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $informasi = Informasi::get();
        $title = "Informasi Besiswa dan Karir";

        return view('admin.informasi', compact('informasi', 'title'));
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
        //validasi
        $validated = $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'status' => 'required',
            'header' => 'required',
        ]);

        $informasi = new Informasi();
        $informasi->judul = $request->judul;
        $informasi->isi = $request->isi;
        $informasi->status = $request->status;
        $informasi->header = $request->header;
        $informasi->save();
        return redirect()->route('informasi')
            ->with('success', 'Data berhasil dibuat!');
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
        //validasi
        $validated = $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'status' => 'required',
            'header' => 'required',
        ]);

        $informasi = Informasi::findOrFail($id);
        $informasi->judul = $request->judul;
        $informasi->isi = $request->isi;
        $informasi->status = $request->status;
        $informasi->header = $request->header;
        $informasi->save();
        return redirect()->route('informasi')
            ->with('success', 'Data berhasil di edit!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $informasi = Informasi::findOrFail($id);
        $informasi->delete();
        return redirect()->route('informasi')
            ->with('success', 'Data berhasil di edit!');
    }
}
