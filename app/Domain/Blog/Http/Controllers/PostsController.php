<?php

namespace App\Domain\Blog\Http\Controllers;

use App\Domain\Blog\DTO\PostDTO;
use App\Domain\Blog\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\DataTransferObject\DataTransferObject;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::all();

        return Inertia::render("Blog::Index")
                      ->with("posts", PostDTO::collection($posts));
    }

    public function create()
    {
        $post = new Post();
        return Inertia::render("Blog::Form")
                      ->with("post", PostDTO::make($post));
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            "title"   => [ "required" ],
            "content" => [ "required" ],
        ]);

        Post::create($data);

        return redirect()->route("blog.index");
    }


    public function show(Post $post)
    {
        //
    }

    public function edit(Post $post)
    {
        return Inertia::render("Blog::Form")
                      ->with("post", PostDTO::make($post));
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            "title"   => [ "required" ],
            "content" => [ "required" ],
        ]);

        $post->fill($data);
        $post->save();

        return redirect()->route("blog.index");
    }


    public function destroy(Post $post)
    {
        //
    }
}
