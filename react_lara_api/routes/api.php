<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'isApiAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'Đã đăng nhập', 'status' => 200], 200);
    });


    // Category
    Route::get('/view-category', [CategoryController::class, 'index']);
    Route::post('/store-category', [CategoryController::class, 'store']);
    Route::get('/edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('/update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('/delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('/all-category', [CategoryController::class, 'allcategory']);

    // Product
    Route::post('/store-product', [ProductController::class, 'store']);
    Route::get('/view-product', [ProductController::class, 'index']);
    Route::get('/edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('/update-product/{id}', [ProductController::class, 'update']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
