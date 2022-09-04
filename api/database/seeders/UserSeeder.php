<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
            
            'name' => 'Mihai',
            'email' => 'mihai@mihai.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            //'remember_token' => Str::random(60),
            'api_token' => Str::random(60),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
            
        ]);


        DB::beginTransaction();
        //User::factory()->count(50)->create();
        DB::commit();

        
    }
}
