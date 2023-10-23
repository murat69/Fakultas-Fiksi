<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $table = 'file';

    public function mime()
    {
        return $this->hasOne(Mime::class, 'id', 'mime_id');
    }
}
