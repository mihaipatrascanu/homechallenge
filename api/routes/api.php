<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\TokenController;
use App\Http\Controllers\Api\V1\CurrencyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login',[UserController::class,'login']);



Route::group(['middleware' => ['auth:api']], function () 
{
    Route::get('currency', [CurrencyController::class, 'currency']);
    Route::post('convert', [CurrencyController::class, 'convert']);
    Route::post('verify', [TokenController::class, 'verify']);
    Route::post('refresh', [TokenController::class, 'refresh']);
});