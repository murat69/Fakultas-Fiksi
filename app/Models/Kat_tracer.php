<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kat_tracer extends Model
{
    use HasFactory;

    protected $table = 'aspek_tracer';

    public function tracer()
    {
        return $this->hasMany(Tracer::class, 'aspek_tracer_id', 'id');
    }
}
