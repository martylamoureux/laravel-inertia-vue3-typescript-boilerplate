<?php

namespace App;

use Illuminate\Support\Str;
use Spatie\TypeScriptTransformer\Actions\ReplaceSymbolsInCollectionAction;
use Spatie\TypeScriptTransformer\Structures\TransformedType;
use Spatie\TypeScriptTransformer\Structures\TypesCollection;
use Spatie\TypeScriptTransformer\Writers\TypeDefinitionWriter;

class DomainDTOTypeDefinitionWriter extends TypeDefinitionWriter
{
    public function format(TypesCollection $collection): string
    {
        (new ReplaceSymbolsInCollectionAction())->execute($collection);

        [$namespaces, $rootTypes] = $this->groupByNamespace($collection);

        $output = '';

        foreach ($namespaces as $namespace => $types) {
            asort($types);

            [$_, $_, $namespace] = explode(".", $namespace);

            $output .= "export namespace {$namespace} {".PHP_EOL;

            foreach ($types as $type) {
                $type->name = substr(Str::finish($type->name, "DTO"), 0, -3);
            }

            $output .= join(PHP_EOL, array_map(
                fn(TransformedType $type) => "export type {$type->name} = {$type->transformed};",
                $types
            ));


            $output .= PHP_EOL."}".PHP_EOL;
        }

        $output .= join(PHP_EOL, array_map(
            fn (TransformedType $type) => "export type {$type->name} = {$type->transformed};",
            $rootTypes
        ));

        return $output;
    }
}
