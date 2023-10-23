<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'berita';

    public function prodi()
    {
        return $this->hasOne(prodi::class, 'id', 'prodi_id');
    }

    public function file_berita()
    {
        return $this->hasMany(File_berita::class, 'berita_id', 'id');
    }
}
