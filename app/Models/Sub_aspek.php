<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sub_aspek extends Model
{
    use HasFactory;
    protected $table = 'sub_aspek';

    public function tahun()
    {
        return $this->hasOne(tahun::class, 'id', 'tahun_id');
    }
    public function aspek_monev()
    {
        return $this->hasOne(Aspek_monev::class, 'id', 'aspek_monev_id');
    }
    public function monev()
    {
        return $this->hasOne(monev::class, 'id', 'monev_id');
    }
}