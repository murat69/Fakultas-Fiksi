<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class milestone extends Model
{
    use HasFactory;

    protected $table = 'milestone';

    public function item_milestone()
    {
        return $this->hasMany(item_milestone::class, 'milestone_id', 'id');
    }
}
