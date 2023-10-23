<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aspek_monev extends Model
{
    use HasFactory;

    protected $table = 'aspek_monev';


    public function sub_aspek()
    {
        return $this->hasMany(Sub_aspek::class, 'aspek_monev_id', 'id');
    }
    public function template_monev()
    {
        return $this->hasMany(template_monev::class, 'aspek_monev_id', 'id');
    }
}
