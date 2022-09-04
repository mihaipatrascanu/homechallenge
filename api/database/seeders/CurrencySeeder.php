<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('currencies')->insert([
            'name' => 'Pounds',
            'code' => 'GBP',
            'rate' => 1.00,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
 
        ]);

        DB::table('currencies')->insert([
            'name' => 'Euro',
            'code' => 'EUR',
            'rate' => 1.14,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
 
        ]);


        DB::table('currencies')->insert([
            'name' => 'Dolars',
            'code' => 'USD',
            'rate' => 1.21,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
 
        ]);

        DB::beginTransaction();
        DB::commit();

        
    }
}