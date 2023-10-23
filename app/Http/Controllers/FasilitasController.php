<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use App\Models\File;
use App\Models\Mime;
use Illuminate\Http\Request;

class FasilitasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fasilitas = Fasilitas::with('file')->get();
        $title = "Fasilitas";

        $file = File::with('mime')->whereHas('mime', function ($query) {
            $query->where('mime', 'like', '%image%');
        })->get();

        return view('admin.fasilitas', compact('fasilitas',  'title', 'file'));
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
            'status' => 'required',
            'file_id' => 'max:10240',
            'file' => 'max:10240',
        ]);

        if ($request->file_id) {
            $id_file = $request->file_id;
        } else if ($request->hasFile('file')) {
            $file = $request->file('file');
            $tidaklekangdenganwaktu = time();
            $mime = $file->guessExtension();
            $filenama = "file_" . $tidaklekangdenganwaktu . "_Foto_Fasilitas_" . $request->status . "." . $mime;
            $alamat = 'public/upload/file';
            $records = Mime::where('mime', "image")->first();
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            $file->storeAs($alamat, $namafile);

            $files = new File();
            $files->nama = "Foto Fasilitas" . " " . $request->status;
            $files->file = $namafile;
            $files->mime_id = $records->id;
            $files->save();

            $id_file = $files->id;
        } else {
            $id_file = null;
        }

        $fasilitas = new Fasilitas();
        $fasilitas->status = $request->status;
        $fasilitas->file_id = $id_file;
        $fasilitas->save();
        return redirect()->route('fasilitas')
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

        $validated = $request->validate([
            'status' => 'required',
            'file_id' => 'max:10240',
            'file' => 'max:10240',
        ]);

        if ($request->file_id) {
            $id_file = $request->file_id;
        } else if ($request->hasFile('file')) {
            $file = $request->file('file');
            $tidaklekangdenganwaktu = time();
            $mime = $file->guessExtension();
            $filenama = "file_" . $tidaklekangdenganwaktu . "_Foto_Fasilitas_" . $request->status . "." . $mime;
            $alamat = 'public/upload/file';
            $records = Mime::where('mime', "image")->first();
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            $file->storeAs($alamat, $namafile);

            $files = new File();
            $files->nama = "Foto Fasilitas" . " " . $request->status;
            $files->file = $namafile;
            $files->mime_id = $records->id;
            $files->save();

            $id_file = $files->id;
        } else {
            $id_file = null;
        }

        $fasilitas = Fasilitas::findOrFail($id);
        $fasilitas->status = $request->status;
        if ($request->hasFile('file') || $request->file_id) {
            $fasilitas->file_id = $id_file;
        }
        $fasilitas->save();
        return redirect()->route('fasilitas')
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
        $fasilitas = Fasilitas::findOrFail($id);
        $fasilitas->delete();
        return redirect()->route('fasilitas')
            ->with('success', 'Data berhasil dibuat!');
    }
}
