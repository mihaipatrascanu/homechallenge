<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Currency;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CurrencyController extends Controller
{
      /**
     * Get all Currencies
     * 
     * @header Authorization: Bearer knasa9r4yVgaYgU0lLu1crVamroKhwAxfSDGHzFHvdcwDxzyQU59RjosXRnw
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function currency(Request $request)
    {
        $user = Auth::guard('api')->user();

        if ($user) 
        {
            $currency =  Currency::get();

            //creating random rates for currency
            // foreach ($currency as $key => $val) 
            // {
            //     if($val['code'] != "GBP")
            //         $currency[$key]['rate'] = round( $val['rate'] + rand(1,50)/100 ,2);
            // }
            
            return $currency;
        }

        return response()->json(['Error' => 'No Data'], 200);
    }

     /**
     * Convert Currencies
     * 
     * @header Authorization: Bearer knasa9r4yVgaYgU0lLu1crVamroKhwAxfSDGHzFHvdcwDxzyQU59RjosXRnw
     * 
     * @bodyParam from currency_id  Example: 1
     * @bodyParam to  currency_id Example: 3
     * @bodyParam value  value_for_conversion Example: 100
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function convert(Request $request)
    {
        $user = Auth::guard('api')->user();

        if ($user) 
        {
            $validated = $this->validate($request, [
                "from" => "integer",
                "to" => "integer",
                "value" => "integer"
            ]);

            if($validated) 
            {
                //main currecny is GBP wiyth id 1 in database
                
                $from = Currency::where('id',$validated['from'])->get()->first();
                $to = Currency::where('id',$validated['to'])->get()->first();
                $value = $validated['value'];
                

                if($from['id'] == 1 && $to['id'] != 1)
                {
                    return round(($to['rate'] / $from['rate']) * $value, 2);
                }

                if($from['id'] != 1 && $to['id'] == 1)
                {
                    return round(($to['rate'] / $from['rate']) * $value, 2);
                }

                if($from['id'] != 1 && $to['id'] != 1)
                {
                    $from_in_gbp = $this->round_value($value, $from['rate'], "/");
    
                    return $this->round_value($from_in_gbp, $to['rate'], '*');
                }

                return $value;
 
            } else 
            {
                return response()->json(['Error' => 'Only Numbers Allowed'], 200);
            }
            
        }

        return response()->json(['Error' => 'No Data'], 500);
    }

    //small function for rounding values
    private function round_value($val_one, $val_two, $operator, $decimal = 2)
    {
        if($operator == "*")  
            return round(($val_one * $val_two), $decimal);

        if($operator == "/")  
            return round(($val_one / $val_two), $decimal);
    }

}
