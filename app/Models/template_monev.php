<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class template_monev extends Model
{
    use HasFactory;

    protected $table = 'template_monev';

    public function aspek_monev()
    {
        return $this->hasOne(Aspek_monev::class, 'id', 'tahun_id');
    }
    public function monev()
    {
        return $this->hasOne(monev::class, 'id', 'monev_id');
    }
}