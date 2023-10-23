<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
 
class AkunController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::get();
        $title = "User";

        return view('admin.akun', compact('title', 'user'));
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required'],
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;
        $user->save();
        $insertid = $user->id;
        if ($request->profile == 1) {

            $dosen = new Dosen();
            $dosen->nama = $request->name;
            $dosen->user_id = $insertid;
            $dosen->save();
        }
        return redirect()->route('akun')
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
    public function update(Request $request)
    {
        $all = $request->all();
        $user = User::findOrFail($request->id);
        if ($request->jenis == "name") {
            $user->name = $request->input;
        } elseif ($request->jenis == "email") {
            $user->email = $request->input;
        } elseif ($request->jenis == "role") {
            $user->role = $request->input;
        }
        $user->save();

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
        $dosen = Dosen::where('user_id', $id)->delete();

        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('akun')
            ->with('success', 'Data berhasil dihapus!');
    }
    public function changePassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::findOrFail($id);
        $user->password = Hash::make($request->password);
        $user->save();
        return redirect()->route($request->redirect)
            ->with('success', 'Passowrd berhasil diubah!');
    }
}
