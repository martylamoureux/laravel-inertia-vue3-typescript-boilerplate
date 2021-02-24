<?php

use Illuminate\Support\Facades\Route;

Route::get("/", [\App\Domain\Home\Http\Controllers\HomeController::class, "index"]);
