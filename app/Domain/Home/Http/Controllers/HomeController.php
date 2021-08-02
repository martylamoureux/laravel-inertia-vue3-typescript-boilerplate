<?php

namespace App\Domain\Home\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index($name = "World")
    {
        return Inertia::render("Home::Ui")->with("name", $name);
    }
}
