<?php

namespace App\Domain\Home\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render("Home::Index")->with("name", "World");
    }
}
