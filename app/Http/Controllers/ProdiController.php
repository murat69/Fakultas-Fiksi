<?php

namespace App\Http\Controllers;

use App\Models\prodi;
use Illuminate\Http\Request;

class ProdiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prodi = prodi::get();
        $title = "Program Studi";
        return view('admin.prodi', compact('prodi', 'title'));
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
            'prodi' => 'required',
        ]);

        $prodi = new Prodi();
        $prodi->prodi = $request->prodi;
        $prodi->save();
        return redirect()->route('prodi')
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
            'prodi' => 'required',
        ]);

        $prodi = Prodi::findOrFail($id);
        $prodi->prodi = $request->prodi;
        $prodi->save();
        return redirect()->route('prodi')
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
        $prodi = Prodi::findOrFail($id);
        $prodi->delete();
        return redirect()->route('prodi')
            ->with('success', 'Data berhasil dihapus!');
    }
}
