<?php

namespace App\Http\Controllers;

use App\Models\Aspek;
use App\Models\prodi;
use Illuminate\Http\Request;

class AspekController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $aspek = Aspek::get();
        $title = "Aspek";
        $prodi = prodi::get();

        return view('admin.aspek', compact('aspek', 'title', 'prodi'));
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
            'aspek' => 'required',
            'range' => 'required',
            'prodi' => 'required',
        ]);

        $aspek = new Aspek();
        $aspek->aspek = $request->aspek;
        $aspek->persenan = $request->range;
        $aspek->prodi_id = $request->prodi;
        $aspek->save();
        return redirect()->route('aspek')
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
            'aspek' => 'required',
            'range' => 'required',
            'prodi' => 'required',
        ]);

        $aspek = Aspek::findOrFail($id);
        $aspek->aspek = $request->aspek;
        $aspek->persenan = $request->range;
        $aspek->prodi_id = $request->prodi;
        $aspek->save();
        return redirect()->route('aspek')
            ->with('success', 'Data berhasil dibuat!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $aspek = Aspek::findOrFail($id);
        $aspek->delete();
        return redirect()->route('aspek')
            ->with('success', 'Data berhasil dibuat!');
    }
}