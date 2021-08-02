<?php

namespace App\Domain\Blog\DTO;

use App\DTO\DTO;

/** @typescript */
class PostDTO extends DTO
{
    public ?string $title;
    public ?string $content;
}
