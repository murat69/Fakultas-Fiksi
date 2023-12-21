<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\File;
use App\Models\File_berita;
use App\Models\Mime;
use App\Models\prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $berita = Berita::with('prodi', 'file_berita')->get();
        $title = "Berita";
        $prodi = prodi::get();

        return view('admin.berita', compact('berita', 'title', 'prodi'));
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
            'thumbnail' => 'required|max:10240',
            'tanggal' => 'required',
            'header' => 'required',
        ]);

        $thumbnail = $request->file('thumbnail');
        $tidaklekangdenganwaktu = time();
        $mime = $thumbnail->guessExtension();
        $filenama = "file_" . $tidaklekangdenganwaktu . "_" . $request->judul . "." . $mime;
        $slug = str::slug($request->judul, '-');

        $alamat = 'public/upload/file/berita/thumbnail';
        $namafile = strtolower(str_replace(' ', '_', $filenama));
        $thumbnail->storeAs($alamat, $namafile);

        $berita = new Berita();
        $berita->thumbnail = $namafile;
        $berita->judul = $request->judul;
        $berita->isi = $request->isi;
        $berita->slug = $slug;
        $berita->tanggal = $request->tanggal;
        $berita->header = $request->header;
        $berita->prodi_id = $request->prodi;
        $berita->save();

        $lastInsertberitaId = $berita->id;

        if ($request->hasFile('file')) {
            $images = $request->file('file');
            $tidaklekangdenganwaktu = time();
            foreach ($images as $image) {
                $alamat = 'public/upload/file/berita/gallery';
                $filenama = "berita" .  "_" . $tidaklekangdenganwaktu . $image->getClientOriginalName();
                $namafile = str_replace(' ', '_', $filenama);
                $image->storeAs($alamat, $namafile);

                $image = new File_berita();
                $image->file = $namafile;
                $image->berita_id = $lastInsertberitaId;
                $image->save();
            }
        }
        return redirect()->route('berita')
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
            'thumbnail' => 'max:10240',
            'prodi' => 'required',
            'header' => 'required',
            'tanggal' => 'required',
        ]);

        if ($request->hasFile('thumbnail')) {
            $img_oldfile = Berita::where('id', '=', $id)->first();
            $thumbnail = $request->file('thumbnail');
            $tidaklekangdenganwaktu = time();
            $mime = $thumbnail->guessExtension();
            $filenama = "file_" . $tidaklekangdenganwaktu . "_" . "." . $mime;

            $alamat = 'public/upload/file/berita/thumbnail';
            Storage::delete($alamat . "/" . $img_oldfile->thumbnail);
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            $thumbnail->storeAs($alamat, $namafile);
        }

        $slug = str::slug($request->judul, '-');
        $berita = Berita::findOrFail($id);
        if ($request->hasFile('thumbnail')) {
            $berita->thumbnail = $namafile;
        }
        $berita->judul = $request->judul;
        $berita->isi = $request->isi;
        $berita->header = $request->header;
        $berita->slug = $slug;
        $berita->prodi_id = $request->prodi;
        $berita->tanggal = $request->tanggal;
        $berita->save();
        return redirect()->route('berita')
            ->with('success', 'Data berhasil dibuat!');
    }

    public function img_add(Request $request, $id)
    {
        $file_img_berita = Berita::where('id', '=', $id)->first();
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            $tidaklekangdenganwaktu = time();
            foreach ($images as $image) {
                $alamat = 'public/upload/file/berita/gallery';
                $filenama = "berita" . "_"  . $tidaklekangdenganwaktu . $image->getClientOriginalName();
                $namafile = str_replace(' ', '_', $filenama);
                $image->storeAs($alamat, $namafile);

                $image = new File_berita();
                $image->file = $namafile;
                $image->berita_id = $id;
                $image->save();
            }
            return redirect()->route('berita')
                ->with('success', 'Data berhasil dibuat!');
        }
        return redirect()->route('berita')
            ->with('failed', 'Data gagal dibuat!');
    }

    public function img_edit(Request $request)
    {
        $images = $request->file('file');
        $alamat = 'public/upload/file/berita/gallery';
        $tidaklekangdenganwaktu = time();
        $filenama = "berita" . "_" .  $tidaklekangdenganwaktu . "_" .  $images->getClientOriginalName();
        $namafile = str_replace(' ', '_', $filenama);
        Storage::delete($alamat . "/" . $request->old_file);
        $images->storeAs($alamat, $namafile);

        $img = File_berita::findOrFail($request->id_img);
        $img->file = $namafile;
        $img->save();

        // kirimkan response sukses
        return response()->json([
            'success' => true,
            'message' => 'File berhasil diupload',
            'foto' =>  $namafile,
            'id_img' => '.img_gallery_' . $request->id_img,
        ]);
    }

    public function img_delete($id)
    {
        $file_img_berita = File_berita::where('id', '=', $id)->get();
        foreach ($file_img_berita as $img) {
            $alamat = 'public/upload/file/berita/gallery';
            Storage::delete($alamat . "/" . $img->file);
        }

        $file_img_berita = File_berita::where('id', '=', $id)->delete();
        return redirect()->route('berita')
            ->with('success', 'Data berhasil Di hapus!');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $file_img_berita = File_berita::where('berita_id', '=', $id)->delete();
        $berita = Berita::findOrFail($id);
        $berita->delete();
        return redirect()->route('berita')
            ->with('success', 'Data berhasil Di hapus!');
    }

    public function update_tampilkan(Request $request)
    {
        $berita = Berita::findOrFail($request->no);
        $berita->status = $request->status;
        $berita->save();
    }
    public function update_pesan(Request $request)
    {
        $berita = Berita::findOrFail($request->id);
        $berita->pesan = $request->pesan;
        $berita->save();
    }
}