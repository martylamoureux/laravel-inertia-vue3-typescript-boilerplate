<?php

namespace App\DTO;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\DataTransferObject\DataTransferObject;

class DTO extends DataTransferObject
{
    public ?int $id;
    public bool $__exists = false;

    public final static function make(Model $model)
    {
        return new static(array_merge($model->toArray(), [
            "__exists" => $model->exists
        ]));
    }

    public final static function collection(Collection $collection)
    {
        return $collection->map(fn (Model $model) => static::make($model));
    }

    public final static function paginated(LengthAwarePaginator $paginator)
    {
        return new PaginatorDTO($paginator->toArray());
    }
}
