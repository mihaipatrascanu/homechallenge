<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Token;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TokenController extends Controller
{
    /**
     * Verify Refresh Token
     * 
     * @header Authorization: Bearer knasa9r4yVgaYgU0lLu1crVamroKhwAxfSDGHzFHvdcwDxzyQU59RjosXRnw
     * @bodyParam refresh_token string required Example: knasa9r4yVgaYgU0lLu1crVamroKhwAxfSDGHzFHvdcwDxzyQU59RjosXRnw
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function verify(Request $request)
    {
        $user = Auth::guard('api')->user();

        if($user){
            $refresh_token = $request->refresh_token;
            $token = Token::where('refresh_token',$refresh_token)->get()->first();
            $servertime = time();
    
            if($token)
            {
                if(strtotime($token['expires_at']) < $servertime)
                {
                    return response()->json(['message' => 'expired'], 403);
                }
            } else 
            {
                return response()->json(['message' => 'token invalid'], 405);
            }
        }
        return response()->json(['message' => 'error'], 403);
    }
 
     /**
     * Refresh Refresh Token
     * 
     * @header Authorization: Bearer knasa9r4yVgaYgU0lLu1crVamroKhwAxfSDGHzFHvdcwDxzyQU59RjosXRnw
     * @bodyParam refresh_token string required Example: knasa9r4yVgaYgU0lLu1crVamroKhwAxfSDGHzFHvdcwDxzyQU59RjosXRnw
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function refresh(Request $request)
    {

        $validated = $this->validate($request, 
                    ["refresh_token" => "string"]);

        $user = Auth::guard('api')->user();

        if($user){
            if($validated)
            {
                $token = Token::where('refresh_token',$validated['refresh_token'])->get()->first();
                
                if(!$token)
                    return response()->json(['message' => 'token invalid'], 405);

                $token->refresh_token = Str::random(60);
                $token->expires_at = Now()->addSeconds(60);
                $token->save();

                return response()->json(['access_token' => $user->api_token,'refresh_token' => $token->refresh_token], 200);
            }                    

        }

    }

}
