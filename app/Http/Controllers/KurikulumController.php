<?php

namespace App\Http\Controllers;

use App\Models\Kurikulum;
use Illuminate\Http\Request;
use App\Models\prodi;


class KurikulumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kurikulum = Kurikulum::get();
        $title = "Kurikulum";
        $prodi = prodi::get();

        return view('admin.kurikulum', compact('prodi', 'title', 'kurikulum'));
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
        $all = $request->all();
        $kurikulum = new Kurikulum();
        $kurikulum->semester = $request->semester;
        $kurikulum->prodi_id = $request->prodi;
        $kurikulum->matkul = $request->tags;
        $kurikulum->save();

        return response()->json([
            'success' => true,
            'message' => 'File berhasil diupload',
            'all' =>  $all,
        ]);
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
    public function update(Request $request)
    {
        $all = $request->all();
        $kurikulum = Kurikulum::findorfail($request->id);
        $kurikulum->semester = $request->semester;
        $kurikulum->prodi_id = $request->prodi;
        $kurikulum->matkul = $request->tags;
        $kurikulum->save();
        return response()->json([
                  'success' => true,
                  'message' => 'File berhasil diupload',
                  'all' =>  $all,
              ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
