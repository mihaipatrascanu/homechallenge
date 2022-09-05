<?php
namespace App\Traits;

use Illuminate\Support\Str;

Trait Tokenable 
{
    public function generateAndSaveToken()
    {
        $token = Str::random(60);

        $this->api_token = $token;
        $this->save();

        return $this;
    }
}