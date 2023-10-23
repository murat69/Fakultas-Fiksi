<?php

namespace App\Http\Controllers;

use DataTables;
use App\Models\File;
use App\Models\Mime;
use App\Models\Conten;
use App\Models\Carousel;
use App\Models\prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class ContenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $file = File::with('mime')->whereHas('mime', function ($query) {
            $query->where('mime', 'like', '%image%');
        })->get();
        $conten = Conten::with('file')->get();
        $prodi = prodi::get();
        $title = "Conten";

        return view('admin.conten', compact('conten', 'file', 'title', 'prodi'));
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
        // validasi
        $validated = $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'kategori' => 'required',
            'file_id' => 'max:10240',
            'file' => 'max:10240',
        ]);

        if ($request->file_id) {
            $id_file = $request->file_id;
        } else if ($request->hasFile('file')) {
            $file = $request->file('file');
            $tidaklekangdenganwaktu = time();
            $mime = $file->guessExtension();
            $filenama = "file_" . $tidaklekangdenganwaktu . "_Foto_Conten_" . "." . $mime;
            $alamat = 'public/upload/file';
            $records = Mime::where('mime', "image")->first();
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            $file->storeAs($alamat, $namafile);

            $files = new File();
            $files->nama = "Foto Conten" . " " . $request->judul;
            $files->file = $namafile;
            $files->mime_id = $records->id;
            $files->save();

            $id_file = $files->id;
        } else {
            $id_file = null;
        }

        $Conten = new Conten();
        $Conten->judul = $request->judul;
        $Conten->kategori = $request->kategori;
        $Conten->isi = $request->isi;
        $Conten->file_id = $id_file;
        $Conten->save();
        return redirect()->route('conten')
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
            'judul' => 'required',
            'isi' => 'required',
            'kategori' => 'required',
            'file_id' => 'max:10240',
            'file' => 'max:10240',
        ]);

        if ($request->file_id) {
            $id_file = $request->file_id;
        } else if ($request->hasFile('file')) {
            $file = $request->file('file');
            $tidaklekangdenganwaktu = time();
            $mime = $file->guessExtension();
            $filenama = "file_" . $tidaklekangdenganwaktu . "_Foto_Conten_" . "." . $mime;
            $alamat = 'public/upload/file';
            $records = Mime::where('mime', "image")->first();
            $namafile = strtolower(str_replace(' ', '_', $filenama));
            $file->storeAs($alamat, $namafile);

            $files = new File();
            $files->nama = "Foto profile" . " " . $request->judul;
            $files->file = $namafile;
            $files->mime_id = $records->id;
            $files->save();

            $id_file = $files->id;
        }

        $Conten = Conten::findOrFail($id);
        $Conten->judul = $request->judul;
        $Conten->kategori = $request->kategori;
        if ($request->file_id) {
            $Conten->file_id = $id_file;
        } else if ($request->hasFile('file')) {
            $Conten->file_id = $id_file;
        }
        $Conten->isi = $request->isi;

        $Conten->save();
        return redirect()->route('conten')
            ->with('success', 'Data berhasil Di ubah!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Conten = Conten::findOrFail($id);
        $Conten->delete();
        return redirect()->route('conten')
            ->with('success', 'Data berhasil di hapus!');
    }


    public function prodi_slider()
    {
        $slider = Carousel::where('jenis', 1)->where('deleted_at', NULL)->get();
        $prodi = prodi::get();
        $title = "Slider Prodi";

        return view('admin.slider_jurusan', compact('slider', 'title', 'prodi'));
    }


    public function prodi_slider_store(Request $request)
    {
        // validasi
        $validated = $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'kategori' => 'required',
        ]);

        $Conten = new Carousel();
        $Conten->judul = $request->judul;
        $Conten->deskription = $request->isi;
        $Conten->jurusan_id = $request->kategori;
        $Conten->jenis = 1;
        $Conten->save();
        return redirect()->route('prodi_slider')
            ->with('success', 'Data berhasil dibuat!');
    }
    public function prodi_slider_update(Request $request, $id)
    {
        // validasi
        $validated = $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'kategori' => 'required',
        ]);

        $Conten = Carousel::findOrFail($id);
        $Conten->judul = $request->judul;
        $Conten->deskription = $request->isi;
        $Conten->jurusan_id = $request->kategori;
        $Conten->jenis = 1;
        $Conten->save();
        return redirect()->route('prodi_slider')
            ->with('success', 'Data berhasil Di ubah!');
    }

    public function prodi_slider_destroy($id)
    {
        $Conten = Carousel::findOrFail($id);
        $Conten->delete();
        return redirect()->route('prodi_slider')
            ->with('success', 'Data berhasil di hapus!');
    }

    public function carousel(Request $request)
    {
        $data['title'] = "Slider";
        if ($request->ajax()) {
            $data = Carousel::whereNot('jenis', 1)->where('deleted_at', NULL)->latest()->with('prodi')->get();

            return Datatables::of($data)
                ->editColumn('file', function ($row) {
                    if ($row->kategori == 'gambar') {
                        return "<img width='150' src= '" . asset('files/' . $row->file) . "'/>";
                    }
                    return '<video width="320" height="240" controls>
                                    <source src="' . asset('files/' . $row->file) . '" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>';
                })
                ->editColumn('prodi', function ($row) {
                    if ($row->jurusan_id == 0) {
                        return "Fakultas";
                    }
                    return $row->prodi->prodi;
                })
                ->addIndexColumn()
                ->addColumn('action', function ($row) {
                    $actionBtn = '<a href="' . route('carousel.form', ['id' => Crypt::encryptString($row->id)]) . '" class="edit btn btn-success btn-sm">Edit</a> <a href="javascript:void(0)" class="delete btn btn-danger btn-sm" data-del="' . Crypt::encryptString($row->id) . '">Delete</a>';
                    return $actionBtn;
                })
                ->rawColumns(['action', 'file'])
                ->make(true);
        }

        return view('admin.carousel', $data);
    }

    public function carouselForm(Request $request, $id = NULL)
    {
        $data['jurusan'] = prodi::get()->pluck('prodi', 'id');
        $data['jurusan']->put(0, 'Fakultas');
        // dd($data['jurusan']);
        $data['title'] = "Slider";
        $data['carousel'] = $carousel = new Carousel();
        $data['jumlah_data'] = $data['carousel']->where('deleted_at', NULL)->count();
        $data['option'] = array();

        for ($i = 0; $i <= $data['jumlah_data']; $i++) {
            $data['option'][$i + 1] = $i + 1;
        }

        $data['id'] = $id;
        if ($id) {
            try {
                $id = Crypt::decryptString($id);
            } catch (DecryptException $e) {
                return abort(400, 'Gagal Mendapat Data');
            }

            $data['carousel'] = $data['carousel']->find($id);
        }

        if ($request->isMethod('post')) {
            $validate_array = [
                'judul' => 'required',
                'deskription' => 'required',
                'file' => 'required|max:50240|mimes:mp4,ogg,jpeg,png,jpg,jpeg,webp',
                'urutan' => 'required',
            ];

            // dd($request);
            // --------------- START UNTUK UPDATE DATA ----------------//
            if ($request->id) {
                if (empty($request->file)) {
                    unset($validate_array['file']);
                }
                $validated = $request->validate($validate_array);



                try {
                    $id = Crypt::decryptString($request->id);
                } catch (DecryptException $e) {
                    return abort(400, 'Gagal Mendapat Data');
                }


                $carousel = Carousel::findOrFail($id);
                $carousel->judul = $request->judul;
                $carousel->deskription = $request->deskription;
                $carousel->urutan = $request->urutan;
                $carousel->jurusan_id = $request->jurusan_id;

                if (!empty($request->file)) {
                    $file = $request->file;
                    $mime = $file->getClientMimeType();
                    $type = 'gambar';
                    if (strstr($mime, "video/")) {
                        // this code for video
                        $type = 'video';
                    }

                    $path = $request->file('file')->store('carousel', ['disk' => 'publication']);
                    $carousel->file = $path;
                    $carousel->kategori = $type;
                }
                $carousel->save();

                return redirect()->route('carousel');
            }
            // --------------- END UNTUK UPDATE DATA ----------------//


            $validated = $request->validate($validate_array);
            $deskription = $request->deskription;
            $file = $request->file;

            $mime = $file->getClientMimeType();
            $type = 'gambar';
            if (strstr($mime, "video/")) {
                // this code for video
                $type = 'video';
            }

            $path = $request->file('file')->store('carousel', ['disk' => 'publication']);

            // $carousel = new Carousel;
            $carousel->judul = $request->judul;
            $carousel->deskription = $deskription;
            $carousel->file = $path;
            $carousel->jurusan_id = $request->jurusan_id;
            $carousel->kategori = $type;
            $carousel->urutan = $request->urutan;
            $carousel->save();
            return redirect()->route('carousel');
        }
        return view('admin.carousel_form', $data);
    }

    public function hapusCarousel(Request $request)
    {
        if (!$request->val) {
            return abort(404);
        }

        try {
            $id = Crypt::decryptString($request->val);
        } catch (DecryptException $e) {
            return abort(400, 'Gagal Dihapus');
        }

        $deleted = Carousel::findOrFail($id)->delete();
    }
}