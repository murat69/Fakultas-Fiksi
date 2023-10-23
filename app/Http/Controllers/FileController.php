<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Mime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mime = Mime::get();
        $file = File::with('mime')->get();
        $title = "File";
        return view('admin.file', compact('mime', 'file', 'title'));
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
    public function store_file(Request $request)
    {
        //validasi
        $validated = $request->validate([
            'file' => 'required|max:10240',
            'mime' => 'required',
            'nama' => 'required',
        ]);

        $file = $request->file('file');
        $tidaklekangdenganwaktu = time();
        $mime = $file->guessExtension();
        $filenama =  "file_" . $tidaklekangdenganwaktu . "_" . $request->nama . "." . $mime;

        $alamat = 'public/upload/file';
        $namafile = strtolower(str_replace(' ', '_', $filenama));
        $file->storeAs($alamat, $namafile);
        $files = new File();
        $files->nama = $request->nama;
        $files->file = $namafile;
        $files->mime_id = $request->mime;
        $files->save();
        return redirect()->route('file')
            ->with('success', 'Data berhasil dibuat!');
    }

    public function store(Request $request)
    {
        //validasi
        $validated = $request->validate([
            'mime' => 'required',
        ]);

        $mime = new Mime();
        $mime->mime = $request->mime;
        $mime->save();
        return redirect()->route('file')
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
    public function update_file(Request $request, $id)
    {
        //validasi
        $validated = $request->validate([
            'file' => 'max:10240',
            'mime' => 'required',
            'nama' => 'required',
        ]);


        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $tidaklekangdenganwaktu = time();
            $mime = $file->guessExtension();
            $filenama =  "file_" . $tidaklekangdenganwaktu . "_" . $request->nama . "." . $mime;
            $alamat = 'public/upload/file';
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            Storage::delete($alamat . "/" . $request->data_old_file);
            $file->storeAs($alamat, $namafile);
        } else {
            $namafile = $request->data_old_file;
        }

        $files = File::findOrFail($id);
        $files->nama = $request->nama;
        $files->file = $namafile;
        $files->mime_id = $request->mime;
        $files->save();
        return redirect()->route('file')
            ->with('success', 'Data berhasil dibuat!');
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
            'mime' => 'required',
        ]);

        $mime = Mime::findOrFail($id);
        $mime->mime = $request->mime;
        $mime->save();
        return redirect()->route('file')
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
        $Mime = Mime::findOrFail($id);
        $Mime->delete();
        return redirect()->route('file')
            ->with('success', 'Data berhasil dihapus!');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy_file($id)
    {
        $file = File::where('id', '=', $id)->first();

        $alamat = 'public/upload/file';
        Storage::delete($alamat . "/" . $file->file);

        $File = File::findOrFail($id);
        $File->delete();
        return redirect()->route('file')
            ->with('success', 'Data berhasil dihapus!');
    }
}
