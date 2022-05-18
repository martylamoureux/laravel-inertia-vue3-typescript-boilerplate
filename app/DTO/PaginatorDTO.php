<?php

namespace App\DTO;

class PaginatorDTO extends DTO
{
    public int $current_page;
    public ?int $from;
    public ?int $to;
    public int $total;
    public int $per_page;
    public int $last_page;
    public ?string $path;
    public string $first_page_url;
    public ?string $prev_page_url;
    public ?string $next_page_url;
    public string $last_page_url;
    public array $links;
    public array $data;
}
