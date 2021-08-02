<?php

namespace App\Http;

use Illuminate\Support\Facades\Route;

class ModuleRouter
{
    protected string $routerType;

    public function __construct(string $routerType)
    {
        $this->routerType = $routerType;
    }

    protected function resolvePath(string ...$path) : string
    {
        return implode(DIRECTORY_SEPARATOR, $path);
    }

    public static function register(string $routerType) : void
    {
        with(new self($routerType))->registerRoutes();
    }

    public function registerRoutes() : void
    {
        $modules = array_diff(scandir(app_path("Domain")), [".", ".."]);

        foreach ($modules as $module) {
            if (is_dir($this->resolvePath(app_path("Domain"), $module))) {
                $routesFile = $this->resolvePath(app_path("Domain"), $module, "Http", "Routes", "{$this->routerType}.php");
                if (file_exists($routesFile)) {
                    Route::group([], $routesFile);
                }
            }
        }
    }
}
