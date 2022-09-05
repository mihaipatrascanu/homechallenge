<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use App\Models\Token;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    /**
     * Login User
     *
     * @bodyParam email string required User Email address.Example: mihai@mihai.com
     * @bodyParam password string required Users Password. Example: password
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {

        // $validated = $request->validate([
        //     'email' =>'required|string',
        //     'password'=>'required|string'
        // ]);

        $validator = Validator::make($request->all(), [
            'email' =>'required|string',
            'password'=>'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid login credetials','erros'=> $validator->Errors()], 401);

        }
        
        $validated = $validator->validated();

        if ( !Auth::attempt($validated)) {
            return response()->json(['message' => 'Invalid login credetials'], 401);
        } 
        else 
        {

            $user = Auth::guard('web')
                    ->user()
                    ->generateAndSaveToken();

            $token = Token::create(
                [
                    'user_id'=> $user->id,
                    'access_token'=> $user->api_token,
                    'expires_in' => 60,
                    'refresh_token'=> Str::random(60),
                    'expires_at' => Now()->addSeconds(60),
                ]);
                    
            return response()->json(['email' => $user->email,'access_token' => $user->api_token,'refresh_token' => $token->refresh_token], 200);
        }

        return response()->json(['message' => 'Error.....'], 401);
    }
}
