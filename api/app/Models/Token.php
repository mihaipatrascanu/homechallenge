<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     */
    protected $fillable = [
        'user_id',
        'access_token',
        'expires_in',
        'refresh_token',
        'expires_at'
    ];

    protected $hidden = [
        'user_id',
        'id',
        'updated_at',
        'created_at'
    ];
}
