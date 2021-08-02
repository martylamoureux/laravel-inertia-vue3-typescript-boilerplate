<?php

use App\Domain\Blog\Http\Controllers\PostsController;
use Illuminate\Support\Facades\Route;

Route::prefix("blog")->name("blog.")->group(function () {
    Route::get("/", [ PostsController::class, "index" ])->name("index");
    Route::get("/create", [ PostsController::class, "create" ])->name("create");
    Route::post("/create", [ PostsController::class, "store" ])->name("store");
    Route::get("/{post}", [ PostsController::class, "show" ])->name("show");
    Route::get("/{post}/edit", [ PostsController::class, "edit" ])->name("edit");
    Route::post("/{post}/edit", [ PostsController::class, "update" ])->name("update");
});
