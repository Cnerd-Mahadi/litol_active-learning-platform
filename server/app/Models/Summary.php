<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Summary extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function keywordInfo()
    {
        return $this->hasMany(Keyword::class, 'summary_id', 'summary_id');
    }
    public function userInfo()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
