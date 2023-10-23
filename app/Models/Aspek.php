<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aspek extends Model
{
    use HasFactory;

    protected $table = 'aspek';

    public function prodi()
    {
        return $this->hasOne(prodi::class, 'id', 'prodi_id');
    }

}