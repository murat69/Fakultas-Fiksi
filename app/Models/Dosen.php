<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;

    protected $table = 'dosen';

    public function prodi()
    {
        return $this->hasOne(prodi::class, 'id', 'prodi_id');
    }


    public function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

    public function jurnal_link()
    {
        return $this->hasMany(Jurnal_link::class, 'dosen_id', 'id');
    }
}