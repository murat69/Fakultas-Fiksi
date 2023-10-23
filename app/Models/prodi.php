<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class prodi extends Model
{
    use HasFactory;

    protected $table = 'prodi';

    public function dosen()
    {
        return $this->hasMany(Dosen::class, 'prodi_id');
    }
}
