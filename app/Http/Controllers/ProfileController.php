<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\File;
use App\Models\Jurnal_link;
use App\Models\Mime;
use App\Models\prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dosen = Dosen::with('prodi', 'file', 'jurnal_link')->where('user_id', auth()->user()->id)->first();
        $title = "Profile";
        $prodi = prodi::get();

        return view('admin.profile', compact('dosen', 'title', 'prodi'));
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
    public function store(Request $request, $id)
    {

        //validasi
        $validated = $request->validate([
            'judul' => 'required',
            'jurnal' => 'required',
        ]);



        if ($judul = $request->input('judul') &&  $link = $request->input('jurnal')) {
            $judul = $request->input('judul');
            $link = $request->input('jurnal');

            foreach ($judul as $key => $item) {
                $links = $link[$key];
                $jurnal = new Jurnal_link();
                $jurnal->judul = $item;
                $jurnal->link = $links;
                $jurnal->dosen_id = $id;
                $jurnal->save();

                echo $item . ' ' . $links;
            }
        }

        return redirect()->route('profile')
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
            'nama' => 'required',
            'file' => 'max:10240',
            'prodi' => 'required',
            'status' => 'required',
        ]);



        if ($request->hasFile('file')) {
            $dosen = Dosen::with('prodi', 'file')->where('id', $id)->first();
            $file = $request->file('file');
            $tidaklekangdenganwaktu = time();
            $mime = $file->guessExtension();
            $filenama = "file_" . $tidaklekangdenganwaktu . "_" . $request->nama . "_Foto_profile_" . "." . $mime;
            $alamat = 'public/upload/file';
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            if ($dosen->file_id !== null) {
                Storage::delete($alamat . "/" . $dosen->file->file);
            }
            $file->storeAs($alamat, $namafile);

            if ($dosen->file_id !== null) {
                $files = File::findOrFail($dosen->file_id);
            } else {
                $records = Mime::where('mime', "image")->first();
                $files = new File();
                $files->nama = $request->nama;
                $files->mime_id = $records->id;
            }
            $files->file = $namafile;
            $files->save();
            $lastInsertedId = $files->id;
        }

        $dosen = Dosen::findOrFail($id);
        $dosen->nama = $request->nama;
        $dosen->status = $request->status;
        $dosen->schoolar = $request->schoolar;
        $dosen->pddikti = $request->pddikti;
        $dosen->linkedin = $request->linkedin;
        if ($dosen->file_id == null) {
            $dosen->file_id = $lastInsertedId;
        }
        $dosen->prodi_id = $request->prodi;
        $dosen->save();

        if ($judul = $request->input('judul') &&  $link = $request->input('jurnal')) {
            $judul = $request->input('judul');
            $link = $request->input('jurnal');

            $lastInserteddosenId = $dosen->id;

            foreach ($judul as $key => $item) {
                $links = $link[$key];
                $jurnal = new Jurnal_link();
                $jurnal->judul = $item;
                $jurnal->link = $links;
                $jurnal->dosen_id = $lastInserteddosenId;
                $jurnal->save();

                echo $item . ' ' . $links;
            }
        }
        return redirect()->route('profile')
            ->with('success', 'Data berhasil dibuat!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edited_jurnal(Request $request)
    {
        $data_id_jurnal = $request->input('id');

        $jurnal = Jurnal_link::findOrFail($data_id_jurnal);
        if ($request->input('jenis') == "link") {
            $jurnal->link = $request->input('input');
        }
        if ($request->input('jenis') == "judul") {
            $jurnal->judul = $request->input('input');
        }
        $jurnal->save();
    }
    public function deleted_jurnal($id)
    {
        $jurnal = Jurnal_link::findOrFail($id);
        $jurnal->delete();
        return redirect()->route('profile')
            ->with('success', 'Data berhasil dihapus!');
    }
    public function destroy($id)
    {
        $dosen = Dosen::with('prodi', 'file')->where('id', $id)->first();
        if ($dosen->file_id !== null) {
            $alamat = 'public/upload/file';
            Storage::delete($alamat . "/" . $dosen->file->file);
            $file = File::findOrFail($dosen->file_id);
            $file->delete();
        }

        Jurnal_link::where('dosen_id', '=', $id)->delete();

        $dosens = Dosen::findOrFail($id);
        $dosens->delete();
        return redirect()->route('profile')
            ->with('success', 'Data berhasil dihapus!');
    }
}
