<?php

use App\Http\Controllers\{AuthController, ProductController, OrderController};
use Illuminate\Support\Facades\Route;

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

// Authentication Routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Product Routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::get('/search/{search}', [ProductController::class, 'search']);
    Route::get('/sort/asc', [ProductController::class, 'sortAsc']);
    Route::get('/sort/desc', [ProductController::class, 'sortDesc']);
    Route::post('/create', [ProductController::class, 'create'])->middleware('auth:sanctum');
    Route::put('/update/{product}', [ProductController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [ProductController::class, 'delete'])->middleware('auth:sanctum');
});

// Order Routes
Route::prefix('orders')->group(function () {
    Route::post('/create', [OrderController::class, 'create'])->middleware('auth:sanctum');
});

