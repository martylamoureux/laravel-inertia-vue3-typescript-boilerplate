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

    /**
     * @throws UnknownProperties
     */
    public static function make(Model|array $model) : static
    {
        if ($model instanceof Model) {

            $dtoHasAuthorizationsTrait = array_key_exists(HasAuthorizations::class, (new \ReflectionClass(static::class))->getTraits());
            $modelHasAuthorizationsTrait = array_key_exists(\App\Models\HasAuthorizations::class, (new \ReflectionClass($model))->getTraits());
            if ($dtoHasAuthorizationsTrait && $modelHasAuthorizationsTrait) {
                $model->append("authorizations_representations");
            }

            $data = array_merge($model->toArray(), [
                "__exists" => $model->exists
            ]);
        } else {
            $data = $model;
        }


        return new static($data);
    }

    public static function collection(Collection|array $collection)
    {
        return collect($collection)->map(fn (Model $model) => static::make($model))->toArray();
    }

    /**
     * @throws UnknownProperties
     */
    final public static function paginated(LengthAwarePaginator $paginator)
    {
        $data = collect($paginator->getCollection()->map(fn (Model $model) => static::make($model)->toArray()));
        $paginator->setCollection($data);
        return new PaginatorDTO($paginator->toArray());
    }

    public function toResponse($request)
    {
        return response()->json($this->toArray());
    }


}
