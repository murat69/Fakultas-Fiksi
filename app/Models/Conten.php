<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conten extends Model
{
    use HasFactory;

    protected $table = 'content';

    public function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

    public function prodi()
    {
        return $this->hasOne(prodi::class, 'id', 'kategori');
    }
}