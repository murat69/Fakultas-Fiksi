<?php

namespace App\Http\Controllers;

use App\Models\item_milestone;
use App\Models\milestone;
use Illuminate\Http\Request;

class milestoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $milestone = milestone::with('item_milestone')->get();
        $title = "Milestone";

        return view('admin.milestone', compact('milestone', 'title'));
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
            'aspek' => 'required',
        ]);
        $milestone = new milestone();
        $milestone->judul = $request->judul;
        $milestone->save();


        $aspek = $request->input('aspek');

        $lastInserteddosenId = $milestone->id;

        foreach ($aspek as $key => $item) {
            $item_milestone = new item_milestone();
            $item_milestone->aspek = $item;
            $item_milestone->milestone_id = $lastInserteddosenId;
            $item_milestone->save();
        }

        return redirect()->route('milestone')
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
        ]);
        $milestone = milestone::findorfail($id);
        $milestone->judul = $request->judul;
        $milestone->save();


        if ($request->input('aspek')) {
            $aspek = $request->input('aspek');

            foreach ($aspek as $key => $item) {
                $item_milestone = new item_milestone();
                $item_milestone->aspek = $item;
                $item_milestone->milestone_id = $id;
                $item_milestone->save();
            }
        }

        return redirect()->route('milestone')
            ->with('success', 'Data berhasil dibuat!');
    }

    public function aspek_edit(Request $request, $id)
    {
        $validated = $request->validate([
            'aspek' => 'required',
        ]);

        $item_milestone = item_milestone::findorfail($id);
        $item_milestone->aspek = $request->aspek;
        $item_milestone->list_milestone = $request->item;
        $item_milestone->save();
        return redirect()->route('milestone')
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
        $milestone = milestone::findorfail($id)->delete();
        $item_milestone = item_milestone::where('milestone_id', $id)->delete();
        return redirect()->route('milestone')
            ->with('success', 'Data berhasil dihapus!');
    }
    public function aspek_milstone_destroy($id)
    {
        $item_milestone = item_milestone::findorfail($id)->delete();
        return redirect()->route('milestone')
            ->with('success', 'Data berhasil dihapus!');
    }
}
