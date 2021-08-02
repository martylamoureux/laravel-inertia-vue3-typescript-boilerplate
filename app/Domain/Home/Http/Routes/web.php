<?php

use App\Domain\Home\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get("/{name?}", [HomeController::class, "index"])->name("index");
