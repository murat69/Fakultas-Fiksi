<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracer extends Model
{
    use HasFactory;
    protected $table = 'tracer';

    public function prodi()
    {
        return $this->hasOne(prodi::class, 'id', 'prodi_id');
    }
    public function aspek_tracer()
    {
        return $this->hasOne(Kat_tracer::class, 'id', 'aspek_tracer_id');
    }
    public function tahun()
    {
        return $this->hasOne(Tahun::class, 'id', 'tahun_id');
    }
}
